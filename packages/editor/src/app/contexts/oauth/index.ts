import oauth from "./oauth";
import api from './oauth-api';

export * from './ouath.types';

export const OAuthProvider = oauth.OAuthProvider;
export const useOAuth = oauth.useOAuth;
export const API = api;

export default oauth;