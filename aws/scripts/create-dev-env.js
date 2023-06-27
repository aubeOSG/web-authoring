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
  let envFile = '';
  const secret = JSON.parse(response.SecretString);
  const envFilename = 'development.env';
  const envData = {
    SRPORT: "8000",
    DBIMAGE: "postgres",
    DBPASS: "scrowldevwebapp",
    DBUSER: "scrowldevuser",
    DBNAME: "scrowldevuser",
    DBPORT: "5432",
    DBHOST: "authoring-editor-db",
    DBSCHEMA: "public",
    ...secret,
  };

  for (const [key, value] of Object.entries(envData)) {
    envFile += `${key}=${value}\n`;
  }

  fs.writeFileSync(path.join('./', envFilename), envFile);
} catch (e) {
  throw e;
}