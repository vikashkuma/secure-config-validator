ß# 🔐 secure-config-validator

**Fail-fast, type-safe, security-first configuration validation for Node.js, frontend, and edge runtimes.**

> Configuration bugs are silent production killers.  
> `secure-config-validator` makes them impossible to ignore.

---

## ✨ Why This Library Exists

Almost every application relies on environment variables, yet most projects suffer from:

- ❌ Missing environment variables
- ❌ Wrong types (`PORT="abc"`)
- ❌ Runtime crashes after deployment
- ❌ Accidental secret exposure to frontend
- ❌ No standard validation across teams
- ❌ CI/CD pipelines missing config issues

**`secure-config-validator` validates configuration at startup — explicitly, safely, and predictably.**

---

## ✅ What This Library Guarantees

✔ Fails fast before app startup  
✔ Strong TypeScript type inference  
✔ Secrets are never logged or exposed  
✔ Works in Node.js, Vite, React, Next.js, Edge runtimes  
✔ Frontend-safe environment exposure  
✔ CI/CD friendly  
✔ Zero global assumptions  

---

## 🧠 Core Design Principles

### 1️⃣ Explicit Source (No Globals)
This library **never accesses `process.env` internally**.

You must explicitly provide the configuration source:
- `process.env`
- `import.meta.env`
- Edge runtime `env`
- Any custom object

This avoids browser, SSR, and edge-runtime bugs.

---

### 2️⃣ Security by Default
- Secret values are never printed
- Error messages never include raw values
- Safe for CI logs, cloud logs, and monitoring tools

---

### 3️⃣ Fail Fast
If configuration is invalid, the application **must not run**.

---

## 📦 Installation

```bash
npm install secure-config-validator


Basic Usage (Node.js / Backend)
import { validateConfig } from "secure-config-validator";

const config = validateConfig(
  {
    PORT: "number",
    DB_URL: "url",
    JWT_SECRET: "secret",
  },
  {
    source: process.env,
  }
);

config.PORT;   // number
config.DB_URL; // string


✔ Typed output
✔ Fail-fast validation
✔ Secrets protected

Frontend Usage (Vite / React)
import { validateConfig } from "secure-config-validator";

const env = validateConfig(
  {
    VITE_API_URL: "url",
  },
  {
    source: import.meta.env,
    expose: ["VITE_API_URL"],
  }
);

env.VITE_API_URL; // string


✔ Only explicitly exposed keys are returned
❌ Secrets are blocked by default

Testing Example
const mockEnv = {
  PORT: "3000",
  IS_PROD: "true",
};

const config = validateConfig(
  {
    PORT: "number",
    IS_PROD: "boolean",
  },
  {
    source: mockEnv,
  }
);

expect(config.PORT).toBe(3000);
expect(config.IS_PROD).toBe(true);


✔ Deterministic tests
✔ No global mutation

