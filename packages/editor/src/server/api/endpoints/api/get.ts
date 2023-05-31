import { rq } from '../../../services';
import { EndpointsApiGet } from '../endpoints.types';

export const get: EndpointsApiGet = {
  name: '/endpoints',
  type: 'invoke',
  fn: (req, res) => {
    res.send({
      error: false,
      data: {
        endpoints: rq.register.ENDPOINTS,
      },
    });
  },
};

export default get;