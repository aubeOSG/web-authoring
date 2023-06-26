import { Listener, JSON_DATA, EndpointRequestConfig } from './requester.types';
import proxy from './proxy';

export const invoke = (endpoint: string, params?: JSON_DATA, type?: 'GET' | 'POST', options?: EndpointRequestConfig) => {
  console.log('invoking', endpoint, params, type, options);
  return proxy.invoke(endpoint, params, type, options);
};

export const on = (endpoint: string, listener: Listener) => {
  proxy.on(endpoint, listener);
};

export const send = (endpoint: string, ...args: unknown[]) => {
  proxy.send(endpoint, ...args);
};

export const off = (endpoint: string, listener: Listener) => {
  proxy.removeListener(endpoint, listener);
};

export const offAll = (endpoint: string) => {
  proxy.removeListenerAll(endpoint);
};