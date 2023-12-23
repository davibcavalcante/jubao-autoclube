const express = require('express');
const router = express.Router();
const pessoaMiddlewares = require('../api/v1/middlewares/pessoa');
const autorizacao = require('../api/v1/middlewares/autorizacao');

/* GET home page. */
router.get('/pessoa', pessoaMiddlewares.getPessoa);
router.get("/pessoa/salvar", autorizacao.autorizar, pessoaMiddlewares.salvarPessoa);

module.exports = router;
