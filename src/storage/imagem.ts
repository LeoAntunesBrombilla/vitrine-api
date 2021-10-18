import { ListObjectsOutput } from 'aws-sdk/clients/s3';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { v4 as uuid } from 'uuid';

import { s3 } from './config';

export const uploadImagem = (): any =>
  multer({
    storage: multerS3({
      s3,
      bucket: 'bucketvitrinevirtual',
      metadata: (_, file, cb) => {
        cb(null, { fieldName: file.fieldname });
      },
      key: (_, file, cb) => {
        cb(null, `${uuid()}-${file.originalname}`);
      },
    }),
  }).single('imagem');

export const listaImagens = async (): Promise<ListObjectsOutput> => {
  const res = await s3
    .listObjectsV2({
      Bucket: 'bucketvitrinevirtual',
    })
    .promise();
  return res;
};

export const deletaImagem = async (key: string): Promise<void> => {
  await s3.deleteObject({ Bucket: 'bucketvitrinevirtual', Key: key }).promise();
};
