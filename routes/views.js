const express = require('express');
const inscricaoMiddlewares = require('../api/v1/middlewares/inscricao');
const newsDataMiddlewares = require('../api/v1/middlewares/news-data');
const albumDataMiddlewares = require('../api/v1/middlewares/album')
const router = express.Router();


/* GET users listing. */
router.get('/users', (req, res, next) => {
  res.send('respond with a resource');
});

router.get('/inscricao', (req, res, next) => {
  res.render("inscricao");
});

router.get('/quem-somos', (req, res, next) => {
  res.render('quem-somos')
});

router.get('/fotos', (req, res, next) => {
  res.render('fotos')
})

router.get('/album/:year', (req, res, next) => {
  const albumOfYear = albumDataMiddlewares.getYear(req)
  res.render('album', { albumOfYear })
})

router.post('/inscricao', inscricaoMiddlewares.enviarEmailInscricao);


/* home page. (deixar essa rota por último) */
router.get('/', (req, res, next) => {
  res.render('index', newsDataMiddlewares.getNewsData);
});

module.exports = router;
