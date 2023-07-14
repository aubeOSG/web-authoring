import type { Router } from 'express';
import { urlencoded } from 'body-parser';
import type {
  RegisterEndpoint,
  RegisterEndpoints,
} from './requester.types';

export const ENDPOINTS: Array<RegisterEndpoint> = [];

export const add = (router: Router, endpoint: RegisterEndpoint) => {

  switch (endpoint.type) {
    case 'invoke':
      if (!endpoint.fn || typeof endpoint.fn !== 'function') {
        console.warn(
          `Unable to register endpoint: ${endpoint.name} - ${endpoint.type} requires a callback function`
        );
        return;
      }

      ENDPOINTS.push(endpoint);
      let routerAction;

      switch (endpoint.method) {
        case 'POST':
          routerAction = router.post;
          break;
        case 'GET':
        default:
          routerAction = router.get;
          break;
      }

      if (endpoint.urlencoded) {
        routerAction(endpoint.name, urlencoded(endpoint.urlencoded), endpoint.fn);
      } else {
        routerAction(endpoint.name, endpoint.fn);
      }
      break;
    case 'on':

      if (!endpoint.fn || typeof endpoint.fn !== 'function') {
        console.warn(
          `Unable to register endpoint: ${endpoint.name} - ${endpoint.type} requires a callback function`
        );
        return;
      }

      ENDPOINTS.push(endpoint);
      // this will be a socket event
      break;
    case 'send':
      ENDPOINTS.push(endpoint);
      // this will be a socket event
      break;
  }
};

export const addAll = (router: Router, endpoints: RegisterEndpoints) => {
  for (const key in endpoints) {
    add(router, endpoints[key]);
  }
};

export default {
  ENDPOINTS,
  add,
  addAll,
};