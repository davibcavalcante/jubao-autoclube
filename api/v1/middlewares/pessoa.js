const fs = require('fs');

module.exports.getPessoa = (req, res) => {
  res.send({id: 1, nome: "anderson"});
}

module.exports.salvarPessoa = (req, res) => {
  fs.appendFileSync("/temp/pessoas.txt", `\r\n${req.query.nome}`);
  res.status(201).send("salvou");
}


