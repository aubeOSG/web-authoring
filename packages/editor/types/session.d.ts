import { Session } from 'express-session';
import { User } from '../src/server/api/users/users.types';

declare module 'express-session' {
  interface Session {
    user: User | null;
  };
};