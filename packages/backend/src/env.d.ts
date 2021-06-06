declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: string;
    APP_PORT: string;
    SESSION_SECRET: string;
  }
}
