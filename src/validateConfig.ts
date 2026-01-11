import {
    ConfigSchema,
    InferConfig,
    ValidateOptions
  } from "./types.js";
  import { ConfigValidationError } from "./errors.js";
  import { isBoolean, isNumber, isUrl, parseValue } from "./utils.js";
  
  export function validateConfig<T extends ConfigSchema>(
    schema: T,
    options: ValidateOptions
  ): InferConfig<T> {
  
    if (!options?.source) {
      throw new Error(
        "secure-config-validator: `source` is required. " +
        "Pass process.env, import.meta.env, or a custom object."
      );
    }
  
    const source = options.source;
    const issues: string[] = [];
    const output: Record<string, unknown> = {};
  
    for (const key of Object.keys(schema)) {
      const type = schema[key];
      const raw = source[key];
  
      if (raw == null) {
        issues.push(`${key} is missing`);
        continue;
      }
  
      if (type === "number" && !isNumber(raw)) {
        issues.push(`${key} must be a number`);
        continue;
      }
  
      if (type === "boolean" && !isBoolean(raw)) {
        issues.push(`${key} must be boolean (true | false)`);
        continue;
      }
  
      if (type === "url" && !isUrl(raw)) {
        issues.push(`${key} must be a valid URL`);
        continue;
      }
  
      output[key] = parseValue(type, raw);
    }
  
    if (options.strict) {
      const allowed = new Set(Object.keys(schema));
      for (const key of Object.keys(source)) {
        if (!allowed.has(key)) {
          issues.push(`Unexpected config key: ${key}`);
        }
      }
    }
  
    if (issues.length > 0) {
      throw new ConfigValidationError(issues);
    }
  
    if (options.expose) {
      for (const key of Object.keys(output)) {
        if (!options.expose.includes(key)) {
          delete output[key];
        }
      }
    }
  
    return Object.freeze(output) as InferConfig<T>;
  }
  