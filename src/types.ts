export type ConfigType =
  | "string"
  | "number"
  | "boolean"
  | "url"
  | "secret";

export type ConfigSchema = Record<string, ConfigType>;

export type InferType<T extends ConfigType> =
  T extends "number" ? number :
  T extends "boolean" ? boolean :
  string;

export type InferConfig<T extends ConfigSchema> = {
  readonly [K in keyof T]: InferType<T[K]>;
};

export interface ValidateOptions {
  /**
   * Explicit configuration source
   * (process.env, import.meta.env, custom object)
   */
  source?: Record<string, string | undefined>;

  /**
   * Explicitly allowed keys for frontend exposure
   */
  expose?: readonly string[];

  /**
   * Disallow unknown keys
   */
  strict?: boolean;
}
