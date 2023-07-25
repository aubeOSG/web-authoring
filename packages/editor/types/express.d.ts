import { Express, Request } from "express";
import { Session } from 'express-session';
import type { Knex } from 'knex';
import { User } from '../src/server/api/users/users.types';

declare module 'express-session' {
  interface Session {
    user: User | null;
  };
};

declare global {
  namespace Express {
    export interface Request {
      db: Knex;
    };
  };
};