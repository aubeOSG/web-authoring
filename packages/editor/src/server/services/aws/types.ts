export type AWSConfig = {
  region: string;
  bucket: string;
  bucketFolder: string;
  endpoint: string;
};

export type PutOptions = {
  name: string;
  type: string;
  buffer: Buffer;
};