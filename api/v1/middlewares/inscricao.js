const mailClient = require('../../../lib/sendMail');
const config = require('../../../config.json');

module.exports.enviarEmailInscricao = (req, res) => {
  const body = `
    <strong>Nome:</strong> ${req.body.name} <br>
    <strong>Mensagem:</strong> ${req.body.contactComment} <br>
  `
  mailClient.sendMail(config.inscricoes.emailDestino, "Nova inscrição", body, true).then(result => {
    res.status(200).send({status: "success", message: "inscrição realizada com sucesso"});
  }).catch(error => {
    console.log(error);
    res.status(500).send({status: "error", message: "falha na inscrição"});
  });
}