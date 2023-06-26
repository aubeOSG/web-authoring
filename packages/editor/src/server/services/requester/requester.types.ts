import type { Handler } from 'express';

export type {
  JSON_DATA,
} from '../../../main/utils/json/json.types';

export type JsonArray = Array<any | JsonResult | JsonArray>;

export type JsonResult = {
  [key: string]: any | JsonResult | JsonArray;
};

export type EventCallback = (event: any, ...args: any[]) => any;

export type RegisterEndpointType = 'send' | 'invoke' | 'on';

export interface RegisterEndpoint {
  name: string;
  type: RegisterEndpointType;
  method?: 'GET' | 'POST';
  fn?: Handler;
}

export interface RegisterEndpoints {
  [key: string]: RegisterEndpoint;
}

export interface ApiResultError extends JsonResult {
  error: true;
  message: string;
}

export interface ApiResultSuccess extends JsonResult {
  error: false;
  message?: string;
  data: JsonResult;
}

export type ApiResult = ApiResultError | ApiResultSuccess;
