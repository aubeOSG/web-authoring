import { AssetsApiPut } from '../assets.types';

export const put: AssetsApiPut = {
  name: '/assets',
  type: 'invoke',
  method: 'POST',
  fn: (req, res) => {
    console.debug('asset-api::put', req.body, req.params, req.query);
  },
};

export default put;