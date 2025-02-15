import { AuthApiLogin } from '../auth.types';

export const login: AuthApiLogin = {
  name: '/auth/login',
  type: 'invoke',
  method: 'POST',
  fn: async (req, res, next) => {
    req.session.regenerate((err) => {
      if (err) next(err);

      req.session.user = req.body.user;

      req.session.save((err) => {
        if (err) return next(err);

        res.send({
          authenticated: true,
        });
      })
    })
  },
  urlencoded: {
    extended: false,
  },
};

export default login;