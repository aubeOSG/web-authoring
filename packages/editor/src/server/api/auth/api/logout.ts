import { AuthApiLogout } from '../auth.types';

export const logout: AuthApiLogout = {
  name: '/auth/logout',
  type: 'invoke',
  fn: async (req, res, next) => {
    req.session.user = null;

    req.session.save((err) => {
      if (err) next(err);

      req.session.regenerate((err) => {
        if (err) next(err);

        res.send({
          authenticated: false,
        });
      });
    });
  },
};

export default logout;