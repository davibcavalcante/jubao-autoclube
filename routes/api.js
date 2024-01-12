const express = require('express');
const router = express.Router();
const pessoaMiddlewares = require('../api/v1/middlewares/pessoa');
const autorizacao = require('../api/v1/middlewares/autorizacao');
const inscricao = require('../api/v1/middlewares/inscricao');
const youtube = require('../api/v1/middlewares/youtube')

/* GET home page. */
router.get('/pessoa', pessoaMiddlewares.getPessoa);
router.get("/pessoa/salvar", autorizacao.autorizar, pessoaMiddlewares.salvarPessoa);
router.get('/youtube-videos', youtube.getVideos);
router.post("/inscricao", inscricao.enviarEmailInscricao);

module.exports = router;