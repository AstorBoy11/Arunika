import { writeFileSync } from "node:fs";

const base = process.env.BASE_URL ?? "http://localhost:3000";

const jar = new Map();

const cookieHeader = () =>
  Array.from(jar.entries())
    .map(([k, v]) => `${k}=${v}`)
    .join("; ");

const storeSetCookie = (res) => {
  const setCookies = typeof res.headers.getSetCookie === "function"
    ? res.headers.getSetCookie()
    : [];

  for (const raw of setCookies) {
    const first = raw.split(";")[0];
    const eq = first.indexOf("=");
    if (eq <= 0) continue;
    const name = first.slice(0, eq).trim();
    const value = first.slice(eq + 1).trim();
    jar.set(name, value);
  }
};

const req = async (path, options = {}) => {
  const headers = new Headers(options.headers || {});
  const cookies = cookieHeader();
  if (cookies) headers.set("cookie", cookies);

  const res = await fetch(`${base}${path}`, {
    redirect: "manual",
    ...options,
    headers,
  });

  storeSetCookie(res);

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
    json,
    text,
  };
};

const form = (data) => new URLSearchParams(data).toString();

const run = async () => {
  const output = {};

  const weakRegister = await req("/api/auth/register", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      name: "Weak User",
      email: `weak${Math.floor(Math.random() * 100000)}@example.com`,
      password: "weakpass",
    }),
  });

  output.weakRegister = {
    status: weakRegister.status,
    body: weakRegister.json ?? weakRegister.text,
  };

  const wrongAttempts = [];
  for (let i = 1; i <= 6; i += 1) {
    const csrf = await req("/api/auth/csrf");
    const csrfToken = csrf.json?.csrfToken;

    const attempt = await req("/api/auth/callback/credentials", {
      method: "POST",
      headers: { "content-type": "application/x-www-form-urlencoded" },
      body: form({
        email: "admin@arunika.local",
        password: "WrongPassword123",
        csrfToken,
        callbackUrl: `${base}/auth`,
        json: "true",
      }),
    });

    wrongAttempts.push({
      attempt: i,
      status: attempt.status,
      location: attempt.location,
      body: attempt.json ?? attempt.text,
    });
  }

  output.wrongPasswordAttempts = wrongAttempts;

  const users = await req("/api/users");
  const usersData = users.json?.data;
  const firstUser = Array.isArray(usersData) ? usersData[0] : null;
  const hasPasswordHashInUsersResponse =
    firstUser && typeof firstUser === "object" && "passwordHash" in firstUser;

  output.usersApiCheck = {
    status: users.status,
    hasPasswordHash: Boolean(hasPasswordHashInUsersResponse),
    sampleKeys: firstUser ? Object.keys(firstUser).slice(0, 12) : [],
  };

  if (firstUser?._id) {
    const userDetail = await req(`/api/users/${firstUser._id}`);
    const detailData = userDetail.json?.data;
    output.userDetailApiCheck = {
      status: userDetail.status,
      hasPasswordHash:
        detailData && typeof detailData === "object" && "passwordHash" in detailData,
      sampleKeys: detailData ? Object.keys(detailData).slice(0, 12) : [],
    };
  }

  writeFileSync("auth-hardening-result.json", JSON.stringify(output, null, 2));
  console.log("Auth hardening result written to auth-hardening-result.json");
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
