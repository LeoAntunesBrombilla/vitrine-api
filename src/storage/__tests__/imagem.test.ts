import { s3 } from '../config';
import { listaImagens, deletaImagem, uploadImagem } from '../imagem';
import { mockListaObjetosS3 } from '../__mocks__';
import * as multer from 'multer';
import * as multerS3 from 'multer-s3';

jest.mock('multer');
jest.mock('multer-s3');
jest.mock('uuid', () => ({ v4: jest.fn().mockReturnValue('uuidCode') }));

describe('storage-imagem', () => {
  const promise = jest.fn();
  describe('função de listar imagens', () => {
    const listObjectsV2Spy = jest.spyOn(s3, 'listObjectsV2');
    it('deve retornar um array de objetos que estão no bucket', async () => {
      listObjectsV2Spy.mockReturnValue({
        promise: promise.mockResolvedValue(mockListaObjetosS3),
      } as never);
      const response = await listaImagens();
      expect(listObjectsV2Spy).toHaveBeenCalledWith({
        Bucket: 'bucketvitrinevirtual',
      });
      expect(promise).toBeCalledWith();
      expect(response).toEqual(mockListaObjetosS3);
    });
  });

  describe('função de deletar imagem', () => {
    const deleteObjectSpy = jest.spyOn(s3, 'deleteObject');
    it('deve deletar uma imagem de acordo com a key', async () => {
      deleteObjectSpy.mockReturnValue({ promise } as never);
      await deletaImagem('imagem.jpg');
      expect(deleteObjectSpy).toBeCalledWith({
        Bucket: 'bucketvitrinevirtual',
        Key: 'imagem.jpg',
      });
      expect(promise).toBeCalledWith();
    });
  });

  describe('função de upload de imagem', () => {
    const single = jest.fn();
    const multerSpy = jest
      .spyOn(multer, 'default')
      .mockReturnValue({ single } as never);
    const multerS3Spy = jest.spyOn(multerS3, 'default');

    it('deve realizar o upload de imagem', () => {
      uploadImagem();
      expect(multerSpy).toHaveBeenCalledWith({ storage: undefined });
      expect(multerS3Spy).toHaveBeenCalledWith({
        s3,
        bucket: 'bucketvitrinevirtual',
        metadata: expect.any(Function),
        key: expect.any(Function),
      });
      expect(single).toBeCalledWith('imagem');
    });

    it('multer s3 metadata', () => {
      multerS3Spy.mockImplementation((params): any => {
        const _ = {};
        const file = { fieldname: 'imagem' } as any;
        const cb = jest.fn();

        if (params && params.metadata) {
          params.metadata(_, file, cb);
        }
        expect(cb).toHaveBeenCalledWith(null, { fieldName: file.fieldname });
      });
      uploadImagem();
    });

    it('multer s3 key', () => {
      multerS3Spy.mockImplementation((params): any => {
        const _ = {};
        const file = { originalname: 'imagem' } as any;
        const cb = jest.fn();

        if (params && params.key) {
          params.key(_, file, cb);
        }
        expect(cb).toHaveBeenCalledWith(null, `uuidCode-${file.originalname}`);
      });
      uploadImagem();
    });
  });
});
