const mailClient = require('../../../../lib/sendMail');
const config = require('../../../../config.json');

module.exports.enviarEmailInscricao = (req, res) => {
  const body = `
    <strong>Nome:</strong> ${req.body.name} <br>
    <strong>Mensagem:</strong> ${req.body.ContactComment} <br>
  `
  mailClient.sendMail(config.inscricoes.emailDestino, "Nova inscrição", body, true).then(result => {
    res.send("inscrição realizada com sucesso");
  }).catch(error => {
    console.log(error);
    res.status(500).send("falha na inscrição");
  });
}