const express = require('express');
const router = express.Router();
const pessoaMiddlewares = require('./middlewares/pessoa');
const autorizacao = require('./middlewares/autorizacao');

/* GET home page. */
router.get('/pessoa', pessoaMiddlewares.getPessoa);
router.get("/pessoa/salvar", autorizacao.autorizar, pessoaMiddlewares.salvarPessoa);

module.exports = router;
