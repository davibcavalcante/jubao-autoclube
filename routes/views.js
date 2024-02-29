const express = require('express');
const albumDataMiddlewares = require('../api/v1/middlewares/fotos')
const rallyJubaoData = require('../api/v1/middlewares/dados-rally-jubao')

const router = express.Router();

/* GET users listing. */
router.get('/inscricao', (req, res, next) => {
  res.render("inscricao");
});

router.get('/inscricao/:name', (req, res, next) => {
  try {
    const rallyName = req.params.name
    const arrayRally = rallyJubaoData.getFilterEvents(false, rallyName)
    const rally = arrayRally[0]
    res.render('inscricao-form', { rally })
  } catch (error) {
    console.log('Erro ao obter rally:', error.message);
    res.status(500).json({erro: 'Erro interno do servidor'})
  }
});

router.get('/portal-noticias', (req, res, next) => {
  res.render('portal-noticias')
})

router.get('/albums', (req, res, next) => {
  res.render('albums');
});

router.get('/fotos/:year', (req, res, next) => {
  const albumOfYear = albumDataMiddlewares.getYear(req);
  res.render('fotos', { albumOfYear });
});

router.get('/calendario', (req, res, next) => {
  res.render('calendario')
})

router.get('/quem-somos', (req, res, next) => {
  res.render('quem-somos');
});

router.get('/termos', (req, res, next) => {
  res.render('termos');
});

router.get('/politica-privacidade', (req, res, next) => {
  res.render('politica-privacidade');
});

router.get('/', (req, res, next) => {
  res.render('index', {
    cup: 'RALLY DAY', 
    categories: {
      c1: 'INICIANTE',
      c2: 'LIGHT',
      c3: 'GRADUADO',
      c4: 'TURISTA',
      c5: 'MASTER'
    },
    url: '/inscricao/RALLY DAY'
  });
});

module.exports = router;
