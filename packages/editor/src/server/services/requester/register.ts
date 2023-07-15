import type { Router } from 'express';
import { urlencoded } from 'body-parser';
import type {
  RegisterEndpoint,
  RegisterEndpoints,
} from './requester.types';

export const ENDPOINTS: Array<RegisterEndpoint> = [];

export const add = (router: Router, endpoint: RegisterEndpoint) => {

  try {
    switch (endpoint.type) {
      case 'invoke':
        if (!endpoint.fn || typeof endpoint.fn !== 'function') {
          console.warn(
            `Unable to register endpoint: ${endpoint.name} - ${endpoint.type} requires a callback function`
          );
          return;
        }
  
        ENDPOINTS.push(endpoint);
        let method;
  
        switch (endpoint.method) {
          case 'POST':
            method = 'post';
            break;
          case 'GET':
          default:
            method = 'get';
            break;
        }
  
        if (endpoint.urlencoded) {
          router[method](endpoint.name, urlencoded(endpoint.urlencoded), endpoint.fn);
        } else {
          router[method](endpoint.name, endpoint.fn);
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
  } catch (e) {
    console.error(e);
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