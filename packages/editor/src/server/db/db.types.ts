export type Column = {
  name: string;
  type:
    | 'uuid'
    | 'string'
    | 'integer'
    | 'decimal'
    | 'double'
    | 'foreign'
    | 'datetime'
    | 'json'
    | 'boolean';
  table?: string;
  defaultValue?: any;
};

export type Schema = Array<{
  column: Column
}>;

export type Config = {
  name: string;
  port: string;
  host: string;
  user: string;
  pass: string;
  schema: string;
};