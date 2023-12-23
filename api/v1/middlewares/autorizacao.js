module.exports.autorizar = (req, res, next) => {
  if(req.query.senha === "123"){
    next();
  }
  res.status(401).send({error: "não autorizado"});
}