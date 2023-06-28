import aws from 'aws-sdk';
import { config } from './connection';

aws.config.update({
  region: config.region,
});

export default class BucketFactory {
  private _s3: aws.S3;
  private _params: aws.S3.Types.ListObjectsV2Request;

  constructor () {
    this._s3 = new aws.S3();
    this._params = {
      Bucket: config.bucket,
      Prefix: `${config.bucketFolder}/`,
    };
  }

  public list () {
    return new Promise((resolve, reject) => {
      console.log('params', this._params);
      this._s3.listObjectsV2(this._params, (err, data) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(data);
      });
    })
  }

  public get() {}

  public put() {}
};