export class ConfigValidationError extends Error {
    readonly issues: readonly string[];
  
    constructor(issues: string[]) {
      super("Config validation failed");
      this.issues = issues;
    }
  
    format(): string {
      return [
        "❌ Config validation failed:",
        "",
        ...this.issues.map(i => `- ${i}`),
        ""
      ].join("\n");
    }
  }
  