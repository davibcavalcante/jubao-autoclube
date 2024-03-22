const express = require('express');
// AUTH
const authorization = require('../api/v1/middlewares/autenticacao-usuario');

const router = express.Router();

router.get('/gerenciar-noticias', authorization.authorizeUser, (req, res, next) => {
    res.render('gerenciar-noticias');
})

module.exports = router;