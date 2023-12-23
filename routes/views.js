var express = require('express');
const inscricaoMiddlewares = require('../api/v1/middlewares/inscricao');
var router = express.Router();


/* GET users listing. */
router.get('/users', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/inscricao', function(req, res, next) {
  res.render("inscricao");
});

router.post('/inscricao', inscricaoMiddlewares.enviarEmailInscricao);


/* home page. (deixar essa rota por último) */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', user: "Davi" });
});

module.exports = router;
