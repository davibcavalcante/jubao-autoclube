const express = require('express');
const inscricaoMiddlewares = require('./api/v1/middlewares/inscricao');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render("inscricao");
});

router.post('/', inscricaoMiddlewares.enviarEmailInscricao);

module.exports = router;
