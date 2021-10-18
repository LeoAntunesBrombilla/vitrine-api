import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

export const { URL_MONGODB, AWS_ACCESS_KEY_ID, AWS_SECRET_KEY, REGION } = <
  { [key: string]: string }
>process.env;
