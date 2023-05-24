import engine from 'handlebars';
import { rq } from '../../../server/services';

engine.registerHelper('raw', options => {
  return options.fn();
});

export const compile = (
  contents: string,
  data: rq.JsonResult
): rq.ApiResult => {
  try {
    return {
      error: false,
      data: {
        contents: engine.compile(contents)(data),
      },
    };
  } catch (e) {
    return {
      error: true,
      message: 'Failed to compile',
      data: {
        trace: e,
      },
    };
  }
};

export default {
  compile,
};
