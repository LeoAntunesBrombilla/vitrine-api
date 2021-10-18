import aws, { S3 } from 'aws-sdk';

import {
  AWS_ACCESS_KEY_ID,
  AWS_SECRET_KEY,
  REGION,
} from '../../utils/dotEnvConfig';

export const s3 = new aws.S3({
  apiVersion: '2006-03-01',
  region: REGION,
  credentials: {
    accessKeyId: AWS_ACCESS_KEY_ID,
    secretAccessKey: AWS_SECRET_KEY,
  },
});

export const s3Client = new S3({ region: REGION });
