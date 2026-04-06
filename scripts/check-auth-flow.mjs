import { writeFileSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://localhost:3000";
const jar = new Map();
const userJar = new Map();

const cookieHeader = (targetJar) =>
  Array.from(targetJar.entries())
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");

const storeSetCookie = (res, targetJar) => {
  const setCookies = typeof res.headers.getSetCookie === "function"
    ? res.headers.getSetCookie()
    : [];

  for (const raw of setCookies) {
    const first = raw.split(";")[0];
    const eq = first.indexOf("=");
    if (eq <= 0) continue;
    const name = first.slice(0, eq).trim();
    const value = first.slice(eq + 1).trim();
    targetJar.set(name, value);
  }
};

const req = async (path, options = {}, targetJar = jar) => {
  const headers = new Headers(options.headers || {});
  const cookies = cookieHeader(targetJar);
  if (cookies) headers.set("cookie", cookies);

  const res = await fetch(`${base}${path}`, {
    redirect: "manual",
    ...options,
    headers,
  });

  storeSetCookie(res, targetJar);

  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }

  return {
    status: res.status,
    location: res.headers.get("location"),
    text,
    json,
  };
};

const encodeForm = (data) =>
  new URLSearchParams(data).toString();

const run = async () => {
  const output = {};

  output.unauthAdmin = await req("/admin/dashboard");

  const randomEmail = `user${Math.floor(Math.random() * 100000)}@example.com`;
  output.register = await req(
    "/api/auth/register",
    {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        name: "Test User",
        email: randomEmail,
        password: "User12345",
      }),
    },
    userJar
  );

  const csrfAdmin = await req("/api/auth/csrf");
  const adminCsrfToken = csrfAdmin.json?.csrfToken;
  output.adminCsrf = csrfAdmin;

  output.adminLogin = await req(
    "/api/auth/callback/credentials",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: encodeForm({
        email: "admin@arunika.local",
        password: "Admin12345",
        csrfToken: adminCsrfToken,
        callbackUrl: `${base}/admin/dashboard`,
        json: "true",
      }),
    }
  );

  output.adminSession = await req("/api/auth/session");
  output.authAdmin = await req("/admin/dashboard");

  const csrfLogout = await req("/api/auth/csrf");
  output.logout = await req(
    "/api/auth/signout",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: encodeForm({
        csrfToken: csrfLogout.json?.csrfToken,
        callbackUrl: `${base}/auth`,
        json: "true",
      }),
    }
  );

  output.sessionAfterLogout = await req("/api/auth/session");

  const csrfUser = await req("/api/auth/csrf", {}, userJar);
  output.userLogin = await req(
    "/api/auth/callback/credentials",
    {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: encodeForm({
        email: randomEmail,
        password: "User12345",
        csrfToken: csrfUser.json?.csrfToken,
        callbackUrl: `${base}/user/dashboard`,
        json: "true",
      }),
    },
    userJar
  );

  output.userSession = await req("/api/auth/session", {}, userJar);
  output.userToAdmin = await req("/admin/dashboard", {}, userJar);
  output.userDashboard = await req("/user/dashboard", {}, userJar);

  const compact = {
    randomEmail,
    unauthAdmin: {
      status: output.unauthAdmin.status,
      location: output.unauthAdmin.location,
    },
    register: {
      status: output.register.status,
      body: output.register.json ?? output.register.text,
    },
    adminLogin: {
      status: output.adminLogin.status,
      body: output.adminLogin.json ?? output.adminLogin.text,
    },
    adminSession: output.adminSession.json,
    authAdmin: {
      status: output.authAdmin.status,
      location: output.authAdmin.location,
    },
    logout: {
      status: output.logout.status,
      body: output.logout.json ?? output.logout.text,
    },
    sessionAfterLogout: output.sessionAfterLogout.json,
    userLogin: {
      status: output.userLogin.status,
      body: output.userLogin.json ?? output.userLogin.text,
    },
    userSession: output.userSession.json,
    userToAdmin: {
      status: output.userToAdmin.status,
      location: output.userToAdmin.location,
    },
    userDashboard: {
      status: output.userDashboard.status,
      location: output.userDashboard.location,
    },
  };

  writeFileSync("auth-flow-result.json", JSON.stringify(compact, null, 2));
  console.log("Auth flow result written to auth-flow-result.json");
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
