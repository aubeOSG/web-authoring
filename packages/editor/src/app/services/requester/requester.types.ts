export type { JSON_DATA } from '../../../main/utils/json/json.types';

export type JsonArray = Array<any | JsonResult | JsonArray>;

export type JsonResult = {
  [key: string]: any | JsonResult | JsonArray;
};

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

export type Listener = (...args: any[]) => void;