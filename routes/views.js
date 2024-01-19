const express = require('express');
const inscricaoMiddlewares = require('../api/v1/middlewares/inscricao');
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
  res.render('quem-somos');
});

router.get('/fotos', (req, res, next) => {
  res.render('fotos');
});

router.get('/album/:year', (req, res, next) => {
  const albumOfYear = albumDataMiddlewares.getYear(req);
  res.render('album', { albumOfYear });
});

router.get('/portal-noticias', (req, res, next) => {
  res.render('portal-noticias')
})

/* home page. (deixar essa rota por último) */
router.get('/', (req, res, next) => {
  res.render('index', {
    cup: 'COPA SOLIDARIEDADE', 
    categories: {
      c1: 'INICIANTE',
      c2: 'LIGHT',
      c3: 'GRADUADO',
      c4: 'TURISTA',
      c5: 'MASTER'
    }
  });
});

module.exports = router;
