const mailClient = require('../../../lib/sendMail');
const config = require('../../../config.json');

// FUNCTION THAT SEND EMAILS
module.exports.enviarEmailInscricao = (req, res) => {
  const data = req.body
  let body = `
              <h1>DADOS DA INSCRIÇÃO <span class="highlight">${data.team.name}</span></h1>
            `
  
  // EMAIL HTML
  const html = () => {
    return `
            <html>
              <head>
                <style>
                  * {
                    margin: 0;
                    padding: 0;
                    box-sizing: border-box;
                  }

                  body {
                    font-family: Arial, Helvetica, sans-serif;
                    font-weight: normal;
                  }

                  h1 {
                    color: black;
                    font-size: 3em;
                    text-align: center;
                    margin-bottom: 15px;
                  }

                  h2 {
                    font-size: 2.3em;
                    color: #f25c05;
                    margin-top: 20px;
                  }

                  p {
                    color: black;
                    font-size: 1.4em;
                    margin: 5px 0;
                  }

                  strong {
                    font-weight: bold;
                  }

                  .highlight {
                    color: #f25c05 !important;
                  }

                </style>
            </head>

            <body>
              ${body} 
            </body>
            </html>
          `
  }

  // FUNCTION THAT TRANSLATES THE SUBTITLES
  function translateNameParticipant(nome) {
    const translate = {
        'cup': 'COMPETIÇÃO:',
        'team': 'EQUIPE:',
        'car': 'VEÍCULO:',
        'pilot': 'PILOTO:',
        'navigator': 'NAVEGADOR:',
        'aux1': 'AUXILIAR 1:',
        'aux2': 'AUXILIAR 2:'
    };
    return translate[nome] || nome;
  }

  // FUNCTION THAT TRANSLATES THE INFORMATIONS
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
        'email': 'E-MAIL',
        'cba': 'CÉDULA-CBA',
        'nationality': 'NACIONALIDADE',
        'marital': 'ESTADO CIVIL',
        'cnh': 'CATEGORIA DA CNH',
        'sex': 'SEXO:',
        'birthplace': 'NATURALIDADE',
        'cupName': 'NOME'
    };
    return translateInput[nome] || nome;
}

  // LOOP THAT TAKES THE KEY AND VALUES OF THE OBJECT ABD PUTS IT IN THE HTML
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

  // USE THE NODEMAILER LIB
  mailClient.sendMail(config.inscricoes.emailDestino, `NOVA INSCRIÇÃO: ${data.team.name}`, html(), true).then(result => {
    res.status(200).send({status: "success", message: "Dados enviados com sucesso!"});
  }).catch(error => {
    console.log(error);
    res.status(500).send({status: "error", message: "Houve uma falha na inscrição!"});
  });
}