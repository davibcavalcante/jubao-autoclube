const express = require('express');
const router = express.Router();
const pessoaMiddlewares = require('../api/v1/middlewares/pessoa');
const autorizacao = require('../api/v1/middlewares/autorizacao');
const inscricao = require('../api/v1/middlewares/inscricao');
const youtube = require('../api/v1/middlewares/youtube');
const album = require('../api/v1/middlewares/album');
const newsData = require('../api/v1/middlewares/news-data')
const localNews = require('../api/v1/middlewares/local-news-data')

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

router.get('/news-data', async (req, res) => {
    try {
        const data = await newsData.getNews();
        res.json(data);
    } catch (error) {
        console.log('Erro ao obter dados:', error.message);
        res.status(500).json({erro: 'Erro interno do servidor'});
    }
});

router.get('/local-news-data/:title', async (req, res) => {
    try {
        const newsTitle = req.params.title
        const localNewsData = await localNews.localNews(newsTitle);
        res.json(localNewsData);
    } catch (error) {
        console.log('Erro ao obter dados:', error.message);
        res.status(500).json({erro: 'Erro interno do servidor'});
    }
});


router.post("/inscricao", inscricao.enviarEmailInscricao);

module.exports = router;