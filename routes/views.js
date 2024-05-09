// VIEWS ROUTES
const express = require('express');

const albumDataMiddlewares = require('../api/v1/middlewares/fotos');
const rallyJubaoData = require('../api/v1/middlewares/dados-rally-jubao');

const router = express.Router();

// REGISTRATION ROUTES
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

// NEWS PORTAL ROUTES
router.get('/portal-noticias', (req, res, next) => {
  res.render('portal-noticias');
})

// ALBUMS ROUTES
router.get('/albums', (req, res, next) => {
  res.render('albums');
});

// PHOTOS ROUTES
router.get('/fotos/:year', (req, res, next) => {
  const albumOfYear = albumDataMiddlewares.getYear(req);
  res.render('fotos', { albumOfYear });
});

// CALENDAR ROUTES
router.get('/calendario', (req, res, next) => {
  res.render('calendario')
})

// ABOUT US ROUTES
router.get('/quem-somos', (req, res, next) => {
  res.render('quem-somos');
});

// TERMS ROUTES
router.get('/termos', (req, res, next) => {
  res.render('termos');
});

// PRIVATE POLICY ROUTES
router.get('/politica-privacidade', (req, res, next) => {
  res.render('politica-privacidade');
});

// LOGIN
router.get('/login', (req, res, next) => {
  res.set('Cache-Control', 'no-cache')
  res.render('login');
});

// ROUTE OF INDEX
router.get('/', (req, res, next) => {
  res.render('index', {
    cup: '2° Rally das Crianças', 
    categories: {
      c1: 'INICIANTE',
      c2: 'LIGHT',
      c3: 'TURISTA',
      c4: 'GRADUADO',
      c5: 'MASTER'
    },
    url: '/inscricao/2° Rally das Crianças'
  });
});

module.exports = router;
