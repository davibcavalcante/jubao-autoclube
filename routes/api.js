const express = require('express');
const router = express.Router();
const pessoaMiddlewares = require('../api/v1/middlewares/pessoa');
const autorizacao = require('../api/v1/middlewares/autorizacao');
const inscricao = require('../api/v1/middlewares/inscricao');
const youtube = require('../api/v1/middlewares/youtube');
const album = require('../api/v1/middlewares/album')

/* GET home page. */
router.get('/pessoa', pessoaMiddlewares.getPessoa);
router.get("/pessoa/salvar", autorizacao.autorizar, pessoaMiddlewares.salvarPessoa);
router.get('/youtube-videos', youtube.getVideos);
router.get('/photos', async (req, res) => {
    try {
        const photos = await album.getPhotos();
        res.json(photos);
    } catch (error) {
        console.error('Erro ao obter fotos:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});
router.post("/inscricao", inscricao.enviarEmailInscricao);

module.exports = router;