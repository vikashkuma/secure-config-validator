import { validateConfig } from "./dist/index.js";

const config = validateConfig(
  {
    PORT: "number",
    IS_PROD: "boolean",
    API_URL: "url",
  },
  {
    source: {
      PORT: "3000",
      IS_PROD: "true",
      API_URL: "https://api.example.com",
    },
  }
);

console.log(config);
