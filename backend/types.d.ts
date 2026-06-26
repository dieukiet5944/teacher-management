declare const process: {
  env: Record<string, string | undefined>;
  exit(code?: number): never;
};

declare const console: {
  log(...args: any[]): void;
  error(...args: any[]): void;
};
