import * as dotenv from 'dotenv';
dotenv.config();

export const schema = 'public';
export const api = '/api';
export const port = process.env.SRPORT;
export const timeout = 1000;

export default {
  schema,
  api,
  port,
  timeout,
};