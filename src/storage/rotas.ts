import { Router } from 'express';

import { uploadImagem, listaImagens, deletaImagem } from './imagem';

const router = Router();

export const uploadImg = router.post(
  '/uploadImagem',
  uploadImagem(),
  ({ file }, res) => {
    return res.json(file).status(res.statusCode);
  },
);

export const listarImg = router.get('/listarImagens', async (_, res) => {
  try {
    const { Contents } = await listaImagens();
    return res.json(Contents).status(res.statusCode);
  } catch (e) {
    return res.json(`Error ${e.statusCode} Message: ${e.message}`);
  }
});

export const deleteImg = router.delete(
  '/deletarImagem/:key',
  async ({ params }, res) => {
    try {
      await deletaImagem(params.key);

      return res.status(200).json(`${params.key} deletada`);
    } catch (e) {
      return res.json(`Error ${e.statusCode} Message: ${e.message}`);
    }
  },
);

export default router;
