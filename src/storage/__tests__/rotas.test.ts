import app from '../../index';
import request from 'supertest';
import * as imagem from '../imagem';
import { mockListaObjetosS3, mockKey } from '../__mocks__';

const listaImagensSpy = jest.spyOn(imagem, 'listaImagens');
const uploadImagemSpy = jest.spyOn(imagem, 'uploadImagem');
const deletaImagemSpy = jest.spyOn(imagem, 'deletaImagem');

describe('POST /upload', () => {
  it('Rota Post Upload de imagem deve retornar statusCode 200', async () => {
    const res = await request(app).post('/uploadImagem');
    expect(res.statusCode).toBe(200);
  });
  it('Rota Post Upload de imagem deve retornar um objeto', async () => {
    uploadImagemSpy.mockRejectedValue({
      file: {},
    });
    const res = await request(app).post('/uploadImagem');
    expect(res.body).toEqual({});
  });
});

describe('GET /listarImagens', () => {
  it('Rota Get Listar imagens deve retornar statusCode 200 e array de objetos no body', async () => {
    listaImagensSpy.mockResolvedValue({
      Contents: mockListaObjetosS3,
    } as never);

    const res = await request(app).get('/listarImagens');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual(mockListaObjetosS3);
  });

  it('Caso o bucket não seja informado, deve retornar erro 404', async () => {
    listaImagensSpy.mockRejectedValue({
      statusCode: 404,
      message: 'Bucket não encontrado',
    });
    const res = await request(app).get('/listarImagens');
    expect(res.body).toEqual('Error 404 Message: Bucket não encontrado');
  });
});

describe('DELETE /deleteImg/:key', () => {
  it('Rota Delete deve retornar statusCode 200', async () => {
    const res = await request(app).delete(`/deletarImagem/${mockKey}`);
    expect(res.statusCode).toBe(200);
  });

  it('Rota Delete deve retornar mensagem com nome da key + deletada', async () => {
    deletaImagemSpy.mockResolvedValue();
    const res = await request(app).delete(`/deletarImagem/${mockKey}`);
    expect(res.text).toEqual(
      '"44a13e70-c411-4566-9415-5604d6d8b990-flor.jpg deletada"',
    );
  });
});
