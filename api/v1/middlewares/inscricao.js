const mailClient = require('../../../lib/sendMail');
const config = require('../../../config.json');

module.exports.enviarEmailInscricao = (req, res) => {
  const data = req.body
  let body = `
    <html>
      <head>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            background-color: black;
            background-color: #ffe8c6;
            font-family: Arial, Helvetica, sans-serif;
            font-weight: normal;
          }

          h1 {
            text-align: center;
            margin-bottom: 15px;
          }

          h2 {
            color: #f25c05;
            margin-top: 20px;
          }

          p {
            margin: 5px 0;
          }

          strong {
            font-weight: bold;
          }

        </style>
      </head>

      <body>
        <h1>DADOS DA SUA INSCRIÇÃO</h1>    
      </body>


  `;

  function translateNameParticipant(nome) {
    const translate = {
        'team': 'EQUIPE',
        'car': 'VEÍCULO',
        'pilot': 'PILOTO',
        'navigator': 'NAVEGADOR',
        'aux1': 'AUXILIAR 1',
        'aux2': 'AUXILIAR 2'
    };
    return translate[nome] || nome;
  }

  function translateInputName(nome) {
    const translateInput = {
        'name': 'NOME',
        'date': 'DATA',
        'cpf': 'CPF',
        'shirt': 'TAMANHO DA CAMISA',
        'blood': 'TIPO SANGUÍNEO',
        'year': 'ANO DO VEÍCULO',
        'brand': 'MARCA DO VEÍCULO',
        'model': 'MODELO DO VEÍCULO',
        'traction': 'TRAÇÃO DO VEÍCULO',
        'cep': 'CEP',
        'city': 'CIDADE',
        'neighborhood': 'BAIRRO',
        'batch': 'LOTE',
        'state': 'ESTADO',
        'street': 'RUA',
        'block': 'QUADRA',
        'number': 'NÚMERO',
        'rg': 'RG',
        'class': 'CATEGORIA',
        'participants': 'NÚMERO DE PARTICIPANTES',
        'email': 'E-MAIL'
    };
    return translateInput[nome] || nome;
}


  for (const participant in data) {
      if (Object.hasOwnProperty.call(data, participant)) {
          body += `<h2>${translateNameParticipant(participant)}</h2>`;

          for (const campo in data[participant]) {
              if (Object.hasOwnProperty.call(data[participant], campo)) {
                  body += `<p><strong>${translateInputName(campo)}:</strong> ${data[participant][campo]}</p>`;
              }
          }
      }
  }

  mailClient.sendMail(config.inscricoes.emailDestino, `NOVA INSCRIÇÃO: ${data.team.name}`, body, true).then(result => {
    res.status(200).send({status: "success", message: "Inscrição realizada com sucesso!"});
  }).catch(error => {
    console.log(error);
    res.status(500).send({status: "error", message: "Houve uma falha na inscrição!"});
  });
}