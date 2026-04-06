import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { checkRateLimit, resetRateLimit } from "@/lib/auth/rate-limit";

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.NEXTAUTH_SECRET,
  trustHost: true,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        const normalizedEmail = credentials.email.toString().trim().toLowerCase();
        const normalizedPassword = credentials.password.toString();

        const rateLimit = checkRateLimit(normalizedEmail);
        if (!rateLimit.allowed) {
          throw new Error("Terlalu banyak percobaan login. Coba lagi dalam 15 menit.");
        }

        const bcrypt = (await import("bcryptjs")).default;
        const { default: connectDB } = await import("@/lib/mongodb");
        const { default: User } = await import("@/lib/models/User");

        await connectDB();
        const user = await User.findOne({ email: normalizedEmail })
          .select("+passwordHash +role")
          .lean();

        if (!user || !user.passwordHash) return null;

        const isValid = await bcrypt.compare(normalizedPassword, user.passwordHash);

        if (!isValid) return null;

        resetRateLimit(normalizedEmail);

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as "user" | "admin";
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth",
  },
  session: {
    strategy: "jwt",
  },
});
