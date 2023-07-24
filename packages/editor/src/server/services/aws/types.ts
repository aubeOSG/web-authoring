export type AWSConfig = {
  region: string;
  bucket: string;
  bucketFolder: string;
};

export type PutOptions = {
  name: string;
  size: number;
  type: string;
  buffer: Buffer;
};