import { AuthApiGet } from '../auth.types';

export const get: AuthApiGet = {
  name: '/auth',
  type: 'invoke',
  fn: async (req, res) => {
    res.send({
      error: false,
      data: req.session.user,
    });
  },
};

export default get;