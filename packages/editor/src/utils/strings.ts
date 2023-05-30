import { JSON_DATA } from './json/json.types';

export const toCamelCase = (str: string) => {
  let replacedStr = str.replace(/[-_]+(.)?/g, (_, letter) => {
    return letter ? letter.toUpperCase() : '';
  });

  return replacedStr.substring(0, 1).toLowerCase() + replacedStr.substring(1);
};

export const prettyJson = (obj: JSON_DATA) => {
  return JSON.stringify(obj, null, 4);
};

export const toLower = (str: string) => {
  return str.trim().toLowerCase();
};

export const toCapitalize = (str: string) => {
  return str.replace(/^[A-Z|a-z]/g, letter => letter.toUpperCase());
};

export const toPascalCase = (str: string) => {
  return toCapitalize(str).replace(/[-_]+(.)?/g, (_, letter) => {
    return letter ? letter.toUpperCase() : '';
  });
};

export const toKebabCase = (str: string) => {
  return str
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();
};

export const toScormCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^\p{L}0-9]+/gu, '')
    .replace(/\s/g, '');
};

export const toSnakeCase = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^\p{L}0-9]+/gu, '_')
    .replace(/\s/g, '');
};

export const hasLettersOnly = (str: string) => {
  return /^[a-zA-Z]+$/.test(str);
};

export const isValidComponentInputName = (str: string) => {
  return /^([a-zA-Z]+(-|_)*)+/g.test(str);
};

export const isValidOptionInputName = (str: string) => {
  return /^([a-zA-Z\d\D]+(-|_)*)+/g.test(str);
};

export const isValidPackageName = (str: string) => {
  const maxLn = 214;
  const scope = '@owlui/';
  const scopedMaxLn = maxLn - scope.length;
  const ln = str.length;
  const valid = ln <= scopedMaxLn;
  const remain = scopedMaxLn - ln;
  const over = remain * -1;

  return {
    valid,
    maxLn: scopedMaxLn,
    ln,
    remain,
    over,
  };
};

export default {
  toCamelCase,
  toPascalCase,
  toKebabCase,
  toScormCase,
  prettyJson,
  toLower,
  toCapitalize,
  hasLettersOnly,
  isValidComponentInputName,
  isValidPackageName,
  isValidOptionInputName,
};
