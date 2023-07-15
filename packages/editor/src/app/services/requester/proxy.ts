import axios, { AxiosRequestConfig } from 'axios';
import type {
  RegisterEndpoint,
  ApiResult,
  JSON_DATA,
  RegisterEndpointType,
  ApiResultError
} from '../../../server/services/requester';
import type { EndpointsApiGet } from '../../../server/api/endpoints/endpoints.types';

type Listener = (...args: unknown[]) => void;
type UpdateResolver = (value: ApiResult | PromiseLike<ApiResult>) => void;
type RequestQueue = Array<{
  endpoint: string;
  method: 'invoke' | 'send' | 'on' | 'removeListener' | 'removeListenerAll';
  params?: JSON_DATA;
  type: 'GET' | 'POST';
  resolve: UpdateResolver;
}>;
type Proxy = {
  timeout: number;
  inProgress: boolean;
  ENDPOINTS: Array<RegisterEndpoint>;
  invoke: (endpoint: string, params?: JSON_DATA, type?: 'GET' | 'POST', options?: EndpointRequestConfig) => Promise<ApiResult>;
  on: (endpoint: string, listener: Listener) => void;
  send: (endpoint: string, ...args: unknown[]) => void;
  removeListener: (endpoint: string, listener: Listener) => void;
  removeListenerAll: (endpoint: string) => void;
};
interface RequestInterceptorsError extends Omit<ApiResultError, 'data'> {
  message: string;
  data: {
    action: string;
  };
};

type RequestInterceptors = {
  '/context-menu': RequestInterceptorsError;
};

interface EndpointRequestConfig extends Omit<
  AxiosRequestConfig,
  'url' |
  'method' |
  'data' |
  'params' |
  'timeout' |
  'cancelToken'
> {};

axios.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

const requestInterceptors:RequestInterceptors = {
  '/context-menu': {
    error: true,
    message: 'Unable to call endpoint: desktop only api',
    data: {
      action: 'use-component',
    },
  },
};

const GET = (endpoint, params?: JSON_DATA, options?: EndpointRequestConfig) => {
  return new Promise<ApiResult>(async (resolve, reject) => {
    try {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      const { data } = await axios({
        url: `${window.location.origin}/api${endpoint}`,
        method: 'GET',
        params,
        timeout: (proxy.timeout * 10),
        cancelToken: source.token,
        ...options,
      });
      
      resolve(data);
    } catch (e) {
      reject(e);
    }
  });
};

const POST = (endpoint, payload?: JSON_DATA, options?: EndpointRequestConfig) => {
  return new Promise<ApiResult>(async (resolve, reject) => {
    try {
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      const query = {
        url: `${window.location.origin}/api${endpoint}`,
        method: 'POST',
        data: payload,
        timeout: (proxy.timeout * 10),
        cancelToken: source.token,
        ...options,
      };
      console.log('POST::query', query);
      const res = await axios(query);
      console.log('POST::res', res);
      resolve(res.data);
    } catch (e) {
      reject(e);
    }
  });
};

const requestQueue: RequestQueue = [];

const checkEndpoint = (endpoint: string, type?: RegisterEndpointType) => {
  const endpoints = proxy.ENDPOINTS
    .filter((config) => {
      return !type || type === config.type;
    })
    .map((config) => {
      return config.name;
    });

  return endpoints.indexOf(endpoint) !== -1;
};

const proxy: Proxy = {
  timeout: 1000,
  inProgress: true,
  ENDPOINTS: [],
  invoke: (endpoint: string, params?: JSON_DATA, type = 'GET', options?: EndpointRequestConfig) => {
    return new Promise<ApiResult>((resolve) => {
      const method = 'invoke';

      if (proxy.inProgress) {
        console.log('queueing request', endpoint, params);
        requestQueue.push({
          endpoint,
          method,
          params,
          type,
          resolve,
        });
        return;
      }

      if (requestInterceptors.hasOwnProperty(endpoint)) {
        resolve(requestInterceptors[endpoint]);
        return;
      }

      const isValid = checkEndpoint(endpoint, method);
      
      if (!isValid) {
        const inValidMessage = `Unable to complete request: not a valid endpoint - ${endpoint}`;
        console.warn(inValidMessage);
        resolve({
          error: true,
          message: inValidMessage,
          data: {
            endpoint,
            params,
          },
        });
        return;
      }

      const handleRejection = (e) => {
        console.error(e);
          resolve({
            error: true,
            message: `Failed to invoke: ${endpoint}`,
            data: {
              trace: e,
            },
          });
      };

      switch (type) {
        case 'POST':
          POST(endpoint, params, options).then(resolve).catch(handleRejection);
          break;
        case 'GET':
        default:
          GET(endpoint, params, options).then(resolve).catch(handleRejection);
          break;
      }
    });
  },
  on: (endpoint: string, listener: Listener) => {
    console.warn(`Unable to set on listener for ${endpoint}: method not ready`);
  },
  send: (endpoint: string, ...args: unknown[]) => {
    console.warn(`Unable to send ${endpoint}: method not ready`);
  },
  removeListener: (endpoint: string, listener: Listener) => {
    // console.warn(`Unable to remove listener for ${endpoint}: method not ready`);
  },
  removeListenerAll: (endpoint: string) => {
    // console.warn(`Unable to remove listeners: method not ready`);
  },
};

proxy.inProgress = true;

const getEndpoints: EndpointsApiGet = {
  name: '/endpoints',
  type: 'invoke',
};

GET(getEndpoints.name)
  .then((res) => {
    proxy.inProgress = false;

    if (res.error) {
      console.error(res);
      return;
    }

    proxy.ENDPOINTS = res.data.endpoints;

    if (!requestQueue.length) {
      return;
    }

    requestQueue.forEach((req) => {
      console.log('draining queue', req.endpoint);

      switch (req.method) {
        case 'invoke':
          proxy.invoke(req.endpoint, req.params, req.type).then(req.resolve);
          break;
      }
    });
  })
  .catch((e) => {
    console.error('Getting endpoints failed', e);
  });

export {
  proxy,
};

export default proxy;