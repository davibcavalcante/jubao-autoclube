const express = require('express');
// AUTH
const authorization = require('../api/v1/middlewares/autorizacao-usuario');

const router = express.Router();

router.get('/gerenciar-noticias', authorization.authorizeUser, (req, res, next) => {
    res.render('gerenciar-noticias');
})

router.get('/', authorization.authorizeUser, (req, res, next) => {
    res.render('index-admin');
});

module.exports = router;