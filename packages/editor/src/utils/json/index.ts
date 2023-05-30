import filter from './json-filter';
import pointer from './json-pointer';

export * from './json.types';
export { filter, pointer };

export default {
  ...filter,
  ...pointer,
};
