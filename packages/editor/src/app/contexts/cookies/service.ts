import { CookiesServiceClass } from "./cookies.types";

export default class CookieService implements CookiesServiceClass {
  private _base = '/app';
  private _domain = '';

  constructor() {}

  private _expire (expiry: number | string) {
    let ex: Date;

    switch (typeof expiry) {
      case 'number':
        ex = new Date();
        ex.setTime(ex.getTime() + expiry);
        break;
      case 'string':
        const exValue = Date.parse(expiry);

        ex = new Date(exValue);
        break;
    }

    if (ex) {
      return ex.toUTCString();
    }
  }

  private _findAll () {
    const cookie = document.cookie;
    const fields = cookie.split(';');
    const result: {[key: string]: any} = {};

    if (!fields.length) {
      return;
    }

    let parts: Array<string> = [];

    const formatValue = (value: string) => {
      try {
        return JSON.parse(value.indexOf('%') === -1 ? value : decodeURIComponent(value));
      } catch (e) {
        return value;
      }
    };

    fields.forEach((field: string) => {
      parts = field.trim().split('=');

      if (parts.length) {
        result[parts[0]] = formatValue(parts[1]);
      }
    });

    return Object.keys(result).length ? result : undefined;
  }

  private _find (key?: string) {
    const cookie = document.cookie;

    if (!key) {
      return this._findAll();
    }

    const keyIdx = cookie.indexOf(`${key}=`);

    if (keyIdx === -1) {
      return;
    }

    const valueStart = cookie.indexOf(`=`, keyIdx) + 1;
    let valueEnd = cookie.indexOf(';', keyIdx);

    if (valueEnd === -1) {
      valueEnd = cookie.length;
    }

    const value = cookie.substring(valueStart, valueEnd);

    try {
      return JSON.parse(value.indexOf('%') === -1 ? value : decodeURIComponent(value));
    } catch (e) {
      return value;
    }
  }

  private _update (key: string, value: any, expiry?: string | number) {
    const cookie: {[key: string]: any} = {};

    if (key) {
      cookie[key] = value;
    }

    if (expiry) {
      cookie.expiry = this._expire(expiry);
    }

    cookie.path = this._base;
    cookie.domain = this._domain;

    const cookieKeys = Object.keys(cookie);
    const lastIndex = cookieKeys.length - 1;
    let result = '';

    const formatValue = (key: string, idx: number) => {
      try {
        result += `${key}=${encodeURIComponent(JSON.stringify(cookie[key]))}${idx!==lastIndex ? ';' : ''}`;
      } catch (e) {
        console.error(`unable to format cookie property: ${key}`, cookie[key], e);
      }
    };

    cookieKeys.forEach(formatValue);
    document.cookie = result;
  }

  public put (key: string, value: any, expiry?: string | number) {
    this._update(key, value, expiry);
  }

  public get (key?: string) {
    const value = this._find(key);

    return value;
  }

  public remove (key: string) {
    let cookie = this._find(key);

    if (!cookie) {
      return;
    }

    this._update(key, '', 'Thu, 01-Jan-1970 00:00:01 GMT');
  }
};