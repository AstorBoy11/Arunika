import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Coffee Co. - Modern Coffee Shop",
  description: "Experience the warmth of premium, ethically sourced beans roasted to perfection. From our farm to your morning cup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <head>
        <link 
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" 
          rel="stylesheet" 
        />
      </head>
      <body
        className={`${inter.variable} bg-[#f5e6d3] text-gray-900 font-display overflow-x-hidden antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
