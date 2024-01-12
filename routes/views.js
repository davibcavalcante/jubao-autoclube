const express = require('express');
const inscricaoMiddlewares = require('../api/v1/middlewares/inscricao');
const newsDataMiddlewares = require('../api/v1/middlewares/news-data')
const youtubeMiddlewares = require('../api/v1/middlewares/youtube')
const router = express.Router();


/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/inscricao', function(req, res, next) {
  res.render("inscricao");
});

router.get('/quem-somos', function(req, res, next) {
  res.render('quem-somos')
});

router.post('/inscricao', inscricaoMiddlewares.enviarEmailInscricao);


/* home page. (deixar essa rota por último) */
router.get('/', function(req, res, next) {
  res.render('index', newsDataMiddlewares.getNewsData);
});

module.exports = router;
