import {
  S3Client,
  ListObjectsCommand,
  ListObjectsCommandInput,
  ListObjectsCommandOutput,
  GetObjectCommand,
  GetObjectCommandOutput,
  UploadPartCommand,
  CreateMultipartUploadCommand,
  CompleteMultipartUploadCommand,
  AbortMultipartUploadCommand,
} from '@aws-sdk/client-s3';
import { config } from './connection';
import { PutOptions } from './types';
import { Writable } from 'node:stream';
import { Buffer } from 'node:buffer';

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

  public put(data: PutOptions): Promise<any> {
    return new Promise(async (resolve, reject) => {
      console.log('bucket::put-start', data);
      
      let uploadId;

      try {
        const streamUpload = await this._client.send(
          new CreateMultipartUploadCommand({
            Key: data.name,
            ...this._command,
          })
        );
        console.log('bucket::put-stream');
        uploadId = streamUpload.UploadId;

        const uploadPromises: Array<any> = [];
        const partSize = Math.ceil(data.buffer.length / 5);

        for (let i = 0; i < 5; i++) {
          console.log('bucket::put-parting');
          const start = i * partSize;
          const end = start + partSize;

          uploadPromises.push(this._client
              .send(
                new UploadPartCommand({
                  Key: data.name,
                  UploadId: uploadId,
                  Body: data.buffer.subarray(start, end),
                  PartNumber: i + 1,
                  ...this._command,
                })
              )
              .then((d) => {
                console.log(`Part: ${i + 1} uploaded`);
                return d;
              })
            );
        }

        const uploadResults = await Promise.all(uploadPromises);
        console.log('bucket::put-upload');
        const streamResult = await this._client.send(
          new CompleteMultipartUploadCommand({
            Key: data.name,
            UploadId: uploadId,
            MultipartUpload: {
              Parts: uploadResults.map(({ ETag }, i) => ({
                ETag,
                PartNumber: i + 1,
              })),
            },
            ...this._command,
          })
        );
        console.log('bucket::put-resolve');
        resolve(streamResult);
      } catch (e) {
        console.log('bucket::put-error', e);

        if (uploadId) {
          console.log('bucket::put-abort');
          const abortCmd = new AbortMultipartUploadCommand({
            Key: data.name,
            UploadId: uploadId,
            ...this._command,
          });
          
          await this._client.send(abortCmd);
        }

        console.log('bucket::put-rejected');
        reject(e);
      }
    });
  }
};