// API V1 ROUTES
const express = require('express');
const router = express.Router();

// MIDDLEWARES
const inscricao = require('../api/v1/middlewares/inscricao');
const youtube = require('../api/v1/middlewares/youtube');
const fotos = require('../api/v1/middlewares/fotos');
const noticias = require('../api/v1/middlewares/noticias');
const noticiasLocais = require('../api/v1/middlewares/dados-noticias-locais');
const rallyJubaoData = require('../api/v1/middlewares/dados-rally-jubao');
const calendarioData = require('../api/v1/middlewares/dados-calendario');
const databaseNoticias = require('../api/v1/middlewares/database-noticias');
const login = require('../api/v1/middlewares/database-usuarios');

// AUTH
const authorization = require('../api/v1/middlewares/autenticacao-usuario');

// YOUTUBE VIDEOS ROUTES
router.get('/youtube-videos', youtube.getVideos);

// PHOTOS ROUTES
router.get('/fotos/:year', async (req, res) => {
    try {
        const photos = await fotos.getPhotos(req.params.year);
        res.status(200).json(photos);
    } catch (error) {
        console.error('Erro ao obter fotos:', error.message);
        res.status(500).json({ error: 'Erro interno do servidor' });
    }
});

// NEWS ROUTES
router.get('/noticias/:page/:size', async (req, res) => {
    try {
        const page = req.params.page;
        const size = req.params.size;
        const data = await noticias.getNews(page, size);
        res.status(200).json(data);
    } catch (error) {
        console.log('Erro ao obter dados:', error.message);
        res.status(500).json({erro: 'Erro interno do servidor'});
    }
});

router.get('/dados-noticias-locais/:title', async (req, res) => {
    try {
        const newsTitle = req.params.title
        const localNewsData = await noticiasLocais.localNews(newsTitle);
        res.status(200).json(localNewsData);
    } catch (error) {
        console.log('Erro ao obter dados:', error.message);
        res.status(500).json({erro: 'Erro interno do servidor'});
    }
});

// EVENTS ROUTES
router.get('/rally-jubao', async (req, res) => {
    try {
        const events = await rallyJubaoData.getEvents()
        res.status(200).json(events)
    } catch (error) {
        console.log('Erro ao obter eventos:', error.message);
        res.status(500).json({erro: 'Erro interno do servidor'})
    }
})

router.get('/rally-jubao/:month', (req, res) => {
    try {
        const month = req.params.month
        const events = rallyJubaoData.getFilterEvents(month, false)
        res.status(200).json(events)
    } catch (error) {
        console.log('Erro ao obter evento:', error.message);
        res.status(500).json({erro: 'Erro interno do servidor'})
    }
})

router.get('/calendario/:data/:method', (req, res) => {
    try {
        const data = req.params.data
        const method = req.params.method
        const events = calendarioData.getEvents(data, method)
        res.status(200).json(events)
    } catch (error) {
        console.log('Erro ao obter eventos:', error.message);
        res.status(500).json({erro: 'Erro interno do servidor'})
    }
})

// NEWS DATABASE ROUTES
router.get('/database/noticias', (req, res) => {
    databaseNoticias.getDatabaseData(req, res);
});

router.post('/database/noticias', authorization.authorizeUser, (req, res) => {
    databaseNoticias.sendDatabaseData(req.body, res);
});

router.put('/database/noticias', authorization.authorizeUser, (req, res) => {
    databaseNoticias.updateDatabaseData(req.body, res)
})

router.delete('/database/noticias/:id', authorization.authorizeUser, (req, res) => {
    databaseNoticias.deleteDatabaseData(req, res);
});

// CHECK PRIVATE ROUTES
router.get('/autenticacao', authorization.authorizeUser, (req, res) => {
    res.status(200);
});

// REGISTRATION ROUTES
router.post("/inscricao", inscricao.enviarEmailInscricao);

// LOGIN
router.post('/login', (req, res) => {
    login.userLogin(req, res);
});

module.exports = router;