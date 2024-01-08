const express = require('express');
const router = express.Router();
const pessoaMiddlewares = require('../api/v1/middlewares/pessoa');
const autorizacao = require('../api/v1/middlewares/autorizacao');
const inscricao = require('../api/v1/middlewares/inscricao');
const validacao = require('../api/v1/middlewares/data-validation');

/* GET home page. */
router.get('/pessoa', pessoaMiddlewares.getPessoa);
router.get("/pessoa/salvar", autorizacao.autorizar, pessoaMiddlewares.salvarPessoa);
router.post("/inscricao",validacao.validateInscricao, inscricao.enviarEmailInscricao);

module.exports = router;
