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
  CompleteMultipartUploadCommandOutput,
  AbortMultipartUploadCommand,
  S3ClientConfig,
} from '@aws-sdk/client-s3';
import { env } from '../../config';
import { config } from './connection';
import { PutOptions } from './types';

export default class BucketFactory {
  private _client: S3Client;
  private _command: { Bucket: string, Prefix: string; };

  constructor () {
    const bucketConfig: S3ClientConfig = {};

    bucketConfig.region = config.region;

    if (env === 'development' && config.endpoint) {
      bucketConfig.endpoint = config.endpoint;
      bucketConfig.forcePathStyle = true;
    }

    console.debug('bucket-service::config', bucketConfig);

    this._client = new S3Client(bucketConfig);
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
    //TODO::download-upgrade | convert to download files in chunks
    //https://docs.aws.amazon.com/AmazonS3/latest/userguide/example_s3_Scenario_UsingLargeFiles_section.html
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

  public put(data: PutOptions): Promise<CompleteMultipartUploadCommandOutput> {
    return new Promise(async (resolve, reject) => {
      let UploadId;
      const Key = `${this._command.Prefix}${data.name}`;
      const Bucket = this._command.Bucket;
      const FiveMB = 5 * 1024 * 1024;
      const bufferSize = data.buffer.length;

      try {
        const streamUpload = await this._client.send(
          new CreateMultipartUploadCommand({
            Bucket,
            Key,
            ContentType: data.type,
          })
        );

        UploadId = streamUpload.UploadId;

        const uploadPromises: Array<any> = [];
        const parts = Math.floor(bufferSize / FiveMB) + 1;
        const partsEnd = parts - 1;
        const partSize = parts === 1 ? bufferSize : FiveMB;

        for (let i = 0; i < parts; i++) {
          const start = i * partSize;
          const end = i === partsEnd ? bufferSize : start + partSize;

          uploadPromises.push(this._client
              .send(
                new UploadPartCommand({
                  Bucket,
                  Key,
                  UploadId,
                  Body: data.buffer.subarray(start, end),
                  PartNumber: i + 1,
                })
              )
              .then((d) => {
                return d;
              })
            );
        }

        const uploadResults = await Promise.all(uploadPromises);
        const streamResult = await this._client.send(
          new CompleteMultipartUploadCommand({
            Bucket,
            Key,
            UploadId,
            MultipartUpload: {
              Parts: uploadResults.map(({ ETag }, i) => ({
                ETag,
                PartNumber: i + 1,
              })),
            },
          })
        );

        resolve(streamResult);
      } catch (e) {

        if (UploadId) {
          try {
            const abortCmd = new AbortMultipartUploadCommand({
              Bucket,
              Key: data.name,
              UploadId,
            });
            
            await this._client.send(abortCmd);
          } catch (e) {
            reject(e);
            return;    
          }
        }

        reject(e);
      }
    });
  }
};