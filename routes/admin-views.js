const express = require('express');
// AUTH
const authorization = require('../api/v1/middlewares/autorizacao-usuario');

const router = express.Router();

router.get('/gerenciar-noticias', authorization.authorizeUser, (req, res, next) => {
    res.render('gerenciar-noticias');
});

router.get('/gerenciar-arquivos', authorization.authorizeUser, (req, res, next) => {
    res.render('gerenciar-arquivos');
});

router.get('/gerenciar-inscricoes', authorization.authorizeUser, (req, res, next) => {
    res.render('gerenciar-inscricoes');
});

router.get('/', authorization.authorizeUser, (req, res, next) => {
    res.render('index-admin', { user: req.user});
});

module.exports = router;