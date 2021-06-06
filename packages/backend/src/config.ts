import { join } from 'path';

export enum ENodeEnv {
  DEVELOPMENT = 'development',
  TEST = 'test',
  PRODUCTION = 'production',
}

export const Config = {
  env: (process.env.NODE_ENV as ENodeEnv) || ENodeEnv.DEVELOPMENT,
  app: {
    port: Number(process.env.APP_PORT) || 3000,
  },
  bcrypt: {
    saltRounds: 13,
  },
  session: {
    secret: process.env.SESSION_SECRET || 'super-secret',
  },
  files: {
    rootDirectory: join(__dirname, 'uploads'),
  },
};
