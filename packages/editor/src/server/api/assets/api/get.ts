import { AssetsApiGet } from '../assets.types';
import { aws, rq } from '../../../services';

const encoding = 'base64';

export const get: AssetsApiGet = {
  name: '/assets/:workspace/:asset',
  type: 'invoke',
  fn: (req, res) => {
    const { workspace, asset } = req.params;

    if (!workspace || !asset) {
      res.status(rq.status.codes.bad).send({
        error: true,
        message: 'unable to get assets: id required',
      });
      return;
    }

    const Key = `${aws.Connection.config.bucketFolder}/${workspace}/${asset}`;

    req.bucket.get(Key).then((data) => {
      //TODO::download-upgrade | convert to handle return data as writable stream
      data.Body?.transformToString(encoding).then((assetData) => {
        const assetBuffer = Buffer.from(assetData, encoding);

        res.writeHead(200, {
          'Content-Type': data.ContentType,
          'Content-Length': assetBuffer.length,
        });
        res.end(assetBuffer);
      }).catch((e) => {
        res.status(rq.status.codes.internal).send({
          error: true,
          message: 'failed to get asset: unexpected error',
          data: {
            trace: e,
          }
        });
      });
    }).catch((e) => {
      res.status(rq.status.codes.internal).send({
        error: true,
        message: 'failed to get asset: unexpected error',
        data: {
          trace: e,
        }
      });
    });
  },
};

export default get;