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
    res.render('inscricao-form', { rally, obs: `Proveniente da inscrição na qualidade de piloto, para a participação na 2a. etapa do Campeonato
    Goiano de Rally que será disputado no dia 05 de Setembro de 2025 em Rio Verde/Go.` })
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

router.get('/downloads', (req, res, next) => {
  res.render('downloads');
});

router.get('/pdf', (req, res, next) => {
  res.render('pdf');
});

// ROUTE OF INDEX
router.get('/', (req, res, next) => {
  res.render('index', {
    cup: 'Camepeonato Goiano de Rally Etapa Rio Verde', 
    categories: {
      c0: 'GRADUADO',
      c1: 'TURISMO',
      c2: 'NOVATOS 4x4',
      c3: 'NOVATOS 4x2'
    },
    url: '/inscricao/Campeonato Goiano de Rally Etapa Rio Verde'
  });
});

module.exports = router;
