import { Express, Request } from "express";
import { Session } from 'express-session';
import type { Knex } from 'knex';
import { User } from '../src/server/api/users/users.types';
import BucketFactory from "../src/server/services/aws/bucket";

declare module 'express-session' {
  interface Session {
    user: User | null;
  };
};

declare global {
  namespace Express {
    export interface Request {
      db: Knex;
      bucket: BucketFactory
    };
  };
};