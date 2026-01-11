import { describe, it, expect } from "vitest";
import { validateConfig } from "../src/validateConfig.js";

describe("validateConfig", () => {
  it("validates and parses values correctly", () => {
    const env = {
      PORT: "3000",
      IS_PROD: "true",
    };

    const config = validateConfig(
      {
        PORT: "number",
        IS_PROD: "boolean",
      },
      { source: env }
    );

    expect(config.PORT).toBe(3000);
    expect(config.IS_PROD).toBe(true);
  });

  it("throws on missing values", () => {
    expect(() =>
      validateConfig(
        { PORT: "number" },
        { source: {} }
      )
    ).toThrow();
  });

  it("blocks unexposed keys", () => {
    const env = { A: "1", B: "2" };

    const config = validateConfig(
      { A: "string", B: "string" },
      { source: env, expose: ["A"] }
    );

    expect(config).toEqual({ A: "1" });
  });
});
