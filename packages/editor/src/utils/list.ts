import { AsyncForEachResult } from './utils.types';
import type { JSON_DATA, JSON_VALUE } from './json';
import { pointer } from './json';
import { hasProp } from './obj';

export type OperatorType = 'EQ' | 'NE';

export const filterBy = (list: Array<{}>, prop: string, value: any, op?: OperatorType) => {
  return list.filter((item) => {
    if (!hasProp(item, prop)) {
      return false;
    }

    switch (op) {
      case 'NE':
        return item[prop] !== value;
      default:
        return item[prop] === value;
    }
  })
};

export const indexBy = (
  list: Array<JSON_DATA>,
  field: string,
  val: JSON_VALUE
) => {
  let res;
  let idx = -1;

  for (let i = 0, ii = list.length; i < ii; i++) {
    res = pointer(list[i], field) as JSON_VALUE;

    if (res === null || res === undefined) {
      continue;
    }

    if (res === val) {
      idx = i;
      break;
    }
  }

  return idx;
};

export const sortBy = (
  list: Array<any>,
  fields: Array<string>,
  reverse: boolean = false
) => {
  const fieldsLn = fields.length;

  return list.sort((a, b) => {
    let result = 0;
    let valA: any;
    let valB: any;

    for (let i = 0; i < fieldsLn; i++) {
      result = 0;
      valA = pointer(a, fields[i]);
      valB = pointer(b, fields[i]);

      if (typeof valA === 'string') {
        valA = valA.toLowerCase();
      }

      if (typeof valB === 'string') {
        valB = valB.toLowerCase();
      }

      if (valA === valB) {
        return 0;
      }

      result = valA < valB ? -1 : 1;
      return reverse ? result * -1 : result;
    }

    return result;
  });
};

export const asyncForEach = <T extends unknown>(
  list: Array<T>,
  fn: Function
): Promise<Array<AsyncForEachResult<T>>> => {
  return new Promise(async function (resolve) {
    const promises: Array<AsyncForEachResult<T>> = [];
    let result;

    for (let i = 0, ii = list.length; i < ii; i++) {
      try {
        result = await fn(list[i], i, list);
        promises.push({
          error: false,
          data: list[i],
          result,
        });
      } catch (e) {
        promises.push({
          error: false,
          data: list[i],
          result: e,
        });
      }
    }
  });
};

export default {
  filterBy,
  indexBy,
  sortBy,
  asyncForEach,
};
