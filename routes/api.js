// API V1 ROUTES
const express = require('express');
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// MIDDLEWARES
const inscricao = require('../api/v1/middlewares/inscricao');
const youtube = require('../api/v1/middlewares/youtube');
const fotos = require('../api/v1/middlewares/fotos');
const rallyJubao = require('../api/v1/middlewares/dados-rally-jubao');
const calendario = require('../api/v1/middlewares/dados-calendario');
const noticias = require('../api/v1/middlewares/noticias');
const usuarios = require('../api/v1/middlewares/usuarios');
const arquivos = require('../api/v1/middlewares/arquivos');

// AUTH
const authorization = require('../api/v1/middlewares/autorizacao-usuario');

const router = express.Router();

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

// EVENTS ROUTES
router.get('/rally-jubao', (req, res) => {
    try {
        const events = rallyJubao.getEvents();
        res.status(200).json(events);
    } catch (error) {
        console.log('Erro ao obter eventos:', error.message);
        res.status(500).json({erro: 'Erro interno do servidor'});
    }
})

router.get('/rally-jubao/:month', (req, res) => {
    try {
        const month = req.params.month;
        const events = rallyJubao.getFilterEvents(month, false);
        res.status(200).json(events);
    } catch (error) {
        console.log('Erro ao obter evento:', error.message);
        res.status(500).json({erro: 'Erro interno do servidor'});
    }
})

router.get('/calendario/:data/:method', (req, res) => {
    try {
        const data = req.params.data;
        const method = req.params.method;
        const events = calendario.getEvents(data, method);
        res.status(200).json(events);
    } catch (error) {
        console.log('Erro ao obter eventos:', error.message);
        res.status(500).json({erro: 'Erro interno do servidor'});
    }
})

// NEWS DATABASE ROUTES
router.get('/database/noticias', (req, res) => {
    if (req.query.cache === 'nocache') {
        res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    } else {
        res.setHeader('Cache-Control', 'public, max-age=300');
    }
    noticias.getDatabaseNews(req, res);
});

router.get('/database/noticias/count', (req, res) => {
    noticias.getDatabaseTotalNews(req, res);
});

router.post('/database/noticias', authorization.authorizeUser, (req, res) => {
    noticias.sendDatabaseNews(req.body, res);
});

router.put('/database/noticias', authorization.authorizeUser, (req, res) => {
    noticias.updateDatabaseNews(req.body, res);
})

router.delete('/database/noticias/:id', authorization.authorizeUser, (req, res) => {
    noticias.deleteDatabaseNews(req, res);
});

// CHECK PRIVATE ROUTES
router.get('/autenticacao', authorization.authorizeUser, (req, res) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, private');
    res.status(200).json({ message: 'Usuário autorizado!', noCache: req.params.cache });
});

// REGISTRATION ROUTES
router.post("/inscricao", inscricao.enviarEmailInscricao);

// LOGIN
router.post('/login', (req, res) => {
    usuarios.userLogin(req, res);
});

router.get('/download-arquivos', )

router.post('/upload-arquivos', upload.array('files'), (req, res) => {
    arquivos.upload(req, res);
});

router.get('/download/:fileName', (req, res) => {
    arquivos.download(req, res);
});

router.get('/files', (req, res) => {
    arquivos.getFiles(req, res);
});

module.exports = router;