import fs from 'fs';
import path from 'path';
import {
  SecretsManagerClient,
  GetSecretValueCommand,
} from "@aws-sdk/client-secrets-manager";

const secret_name = "dev/scrowl-web-app";
const client = new SecretsManagerClient({
  region: "ca-central-1",
});

let response;

try {
  response = await client.send(
    new GetSecretValueCommand({
      SecretId: secret_name,
      VersionStage: "AWSCURRENT",
    })
  );
} catch (error) {
  throw error;
}

try {
  const secret = JSON.parse(response.SecretString);
  let envDevFile = '';
  const envDevFilename = 'development.env';
  const envDevData = {
    SRPORT: "8000",
    DBIMAGE: "postgres",
    DBPASS: "scrowldevwebapp",
    DBUSER: "scrowldevuser",
    DBNAME: "scrowldevuser",
    DBPORT: "5432",
    DBHOST: "authoring-editor-db",
    DBSCHEMA: "public",
    ...secret,
    AWS_BUCKET_FOLDER: "development",
  };
  let envProdTestFile = '';
  const envProdTestFilename = 'production.test.env';
  const envProdTestData = {
    ...envDevData,
    SRPORT: "80",
    AWS_BUCKET_FOLDER: "production",
    REGISTRY: "localhost/test",
    REPOSITORY: "scrowl-web-app",
    IMAGE_TAG: "latest",
  };

  for (const [key, value] of Object.entries(envDevData)) {
    envDevFile += `${key}=${value}\n`;
  }

  for (const [key, value] of Object.entries(envProdTestData)) {
    envProdTestFile += `${key}=${value}\n`;
  }

  fs.writeFileSync(path.join('./', envDevFilename), envDevFile);
  fs.writeFileSync(path.join('./', envProdTestFilename), envProdTestFile);
} catch (e) {
  throw e;
}