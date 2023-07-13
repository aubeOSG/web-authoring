import {
  S3Client,
  ListObjectsCommand,
  ListObjectsCommandInput,
  ListObjectsCommandOutput,
  GetObjectCommand,
  GetObjectCommandOutput
} from '@aws-sdk/client-s3';
import { config } from './connection';

export default class BucketFactory {
  private _client: S3Client;
  private _command: { Bucket: string, Prefix: string; };

  constructor () {
    this._client = new S3Client({
      region: config.region,
    });
    this._command = {
      Bucket: config.bucket,
      Prefix: `${config.bucketFolder}/`,
    };
  }

  public list (params?: ListObjectsCommandInput): Promise<ListObjectsCommandOutput> {
    return new Promise((resolve, reject) => {
      const command = new ListObjectsCommand({
        ...params,
        ...this._command,
      });

      this._client.send(command).then((result) => {
        resolve(result);
      }).catch(reject);
    })
  }

  public get(filename: string): Promise<GetObjectCommandOutput> {
    return new Promise((resolve, reject) => {
        const command = new GetObjectCommand({
          Key: filename,
          ...this._command,
        });

        this._client.send(command).then((result) => {
          resolve(result);
        }).catch(reject);
    });
  }

  public put() {}
};