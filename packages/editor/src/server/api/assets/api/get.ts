import { AssetsApiGet } from '../assets.types';
import { aws, rq } from '../../../services';

const encoding = 'base64';

export const get: AssetsApiGet = {
  name: '/assets/:assetName',
  type: 'invoke',
  fn: (req, res) => {
    const { assetName } = req.params;

    if (!assetName) {
      res.status(rq.status.codes.bad).send({
        error: true,
        message: 'unable to get assets: id required',
      });
      return;
    }

    const bucket = new aws.Bucket();
    const Key = `${aws.Connection.config.bucketFolder}/${assetName}`;

    bucket.get(Key).then((data) => {
      data.Body?.transformToString(encoding).then((assetData) => {
        const assetBuffer = Buffer.from(assetData, encoding);

        res.writeHead(200, {
          'Content-Type': data.ContentType,
          'Content-Length': assetBuffer.length,
        });
        res.end(assetBuffer);
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