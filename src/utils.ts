export function isNumber(value: string): boolean {
    return Number.isFinite(Number(value));
  }
  
  export function isBoolean(value: string): boolean {
    return value === "true" || value === "false";
  }
  
  export function isUrl(value: string): boolean {
    try {
      new URL(value);
      return true;
    } catch {
      return false;
    }
  }
  
  export function parseValue(type: string, value: string) {
    switch (type) {
      case "number":
        return Number(value);
      case "boolean":
        return value === "true";
      default:
        return value;
    }
  }
  