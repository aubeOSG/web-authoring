import * as dotenv from 'dotenv';
dotenv.config();

export const schema = 'public';
export const api = '/api';
export const port = process.env.SRPORT;
export const timeout = 1000;
export const env = process.env.NODE_ENV;

export default {
  schema,
  api,
  port,
  timeout,
  env,
};