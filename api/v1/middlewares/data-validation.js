module.exports.validateInscricao = (req, res, next) => {
  if(!req.body.name){
    return res.status(400).send({status: "error", message: "informe o nome"});
  }

  if(!req.body.contactComment){
    return res.status(400).send({status: "error", message: "informe o comentário"});
  }

  if(req.body.contactComment.split(' ').length < 5){
    return res.status(400).send({status: "error", message: "o comentário não pode ter menos que 5 palavras"});
  }


  return next();

}