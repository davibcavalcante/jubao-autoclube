const fs = require('fs');
const path = require('path');
const handlebars = require('handlebars');

handlebars.registerHelper('eq', function (a, b) {
  return a === b;
});

handlebars.registerHelper('and', function () {
  return Array.prototype.every.call(arguments, Boolean);
});

const puppeteer = require('puppeteer');
const InscricoesRepository = require('../../../repository/inscricoes');
const Database = require('../../../config/db-connect-inscricoes');

module.exports.gerarFichaInscricaoPDF = async (data, images) => {
  const inscricoesRepository = new InscricoesRepository();

  const db = new Database();
  await db.connect();

  // 1. Obter o último número de inscrição por categoria
  const categoria = data.team.class;
  const ultimoSub = await inscricoesRepository.getUltimoNumSubPorCategoria(db, categoria);
  const novoNumSub = ultimoSub + 1;
  const value = 500 + (180 * (Number(data.team.participants) - 2))
  // 2. Adicionar num_sub ao objeto de dados
  data.team.num_sub = novoNumSub;
  data.team.value = value.toFixed(2).toLocaleString('pt-br').replace('.', ',')

  // 3. Salvar os dados da inscrição no banco
  try {
    await inscricoesRepository.createInscricao(db, {
      cup_name: data.cup.cupName,
      cup_obs: data.obs,
      team_name: data.team.name,
      team_class: data.team.class,
      participants: data.team.participants,
      num_sub: novoNumSub,

      // PILOTO
      pilot_name: data.pilot.name,
      pilot_cpf: data.pilot.cpf,
      pilot_rg: data.pilot.rg,
      pilot_email: data.pilot.email,
      pilot_cnh: data.pilot.cnh,
      pilot_cba: data.pilot.cba,
      pilot_date: data.pilot.date,
      pilot_blood: data.pilot.blood,
      pilot_marital: data.pilot.marital,
      pilot_sex: data.pilot.sex,
      pilot_nationality: data.pilot.nationality,
      pilot_birthplace: data.pilot.birthplace,
      pilot_shirt: data.pilot.shirt,
      pilot_cep: data.pilot.cep,
      pilot_street: data.pilot.street,
      pilot_number: data.pilot.number,
      pilot_neighborhood: data.pilot.neighborhood,
      pilot_block: data.pilot.block,
      pilot_batch: data.pilot.batch,
      pilot_city: data.pilot.city,
      pilot_state: data.pilot.state,

      // NAVEGADOR
      navigator_name: data.navigator.name,
      navigator_cpf: data.navigator.cpf,
      navigator_rg: data.navigator.rg,
      navigator_email: data.navigator.email,
      navigator_cnh: data.navigator.cnh,
      navigator_cba: data.navigator.cba,
      navigator_date: data.navigator.date,
      navigator_blood: data.navigator.blood,
      navigator_shirt: data.navigator.shirt,
      navigator_cep: data.navigator.cep,
      navigator_street: data.navigator.street,
      navigator_number: data.navigator.number,
      navigator_neighborhood: data.navigator.neighborhood,
      navigator_block: data.navigator.block,
      navigator_batch: data.navigator.batch,
      navigator_city: data.navigator.city,
      navigator_state: data.navigator.state,

      // AUXILIAR 1
      aux1_name: data.aux1?.name || null,
      aux1_cpf: data.aux1?.cpf || null,
      aux1_rg: data.aux1?.rg || null,
      aux1_email: data.aux1?.email || null,
      aux1_date: data.aux1?.date || null,
      aux1_shirt: data.aux1?.shirt || null,
      aux1_cep: data.aux1?.cep || null,
      aux1_street: data.aux1?.street || null,
      aux1_number: data.aux1?.number || null,
      aux1_neighborhood: data.aux1?.neighborhood || null,
      aux1_block: data.aux1?.block || null,
      aux1_batch: data.aux1?.batch || null,
      aux1_city: data.aux1?.city || null,
      aux1_state: data.aux1?.state || null,

      // AUXILIAR 2
      aux2_name: data.aux2?.name || null,
      aux2_cpf: data.aux2?.cpf || null,
      aux2_rg: data.aux2?.rg || null,
      aux2_email: data.aux2?.email || null,
      aux2_date: data.aux2?.date || null,
      aux2_shirt: data.aux2?.shirt || null,
      aux2_cep: data.aux2?.cep || null,
      aux2_street: data.aux2?.street || null,
      aux2_number: data.aux2?.number || null,
      aux2_neighborhood: data.aux2?.neighborhood || null,
      aux2_block: data.aux2?.block || null,
      aux2_batch: data.aux2?.batch || null,
      aux2_city: data.aux2?.city || null,
      aux2_state: data.aux2?.state || null,

      // VEÍCULO
      car_brand: data.car.brand,
      car_model: data.car.model,
      car_color: data.car.color,
      car_plate: data.car.plate,
      car_year: data.car.year,
      car_traction: data.car.traction,
    });
  } catch (err) {
    console.error('Erro ao salvar inscrição:', err);
    throw new Error('Erro ao salvar a inscrição no banco.');
  }

  // 4. Compilar os templates
  const getTemplate = (filename) => {
    const filePath = path.join(__dirname, `../../../templates/${filename}`);
    return handlebars.compile(fs.readFileSync(filePath, 'utf8'));
  };

  const pilotoTemplate = getTemplate('pilot-subscribe.hbs');
  const navegadorTemplate = getTemplate('nav-subscribe.hbs');
  const auxiliarTemplate = getTemplate('aux-subscribe.hbs');

  const pilotoHtml = pilotoTemplate({ ...data, images });
  const navegadorHtml = navegadorTemplate({ ...data, images });

  let fullHtml = `
    ${pilotoHtml}
    <div style="page-break-after: always;"></div>
    ${navegadorHtml}
  `;

  if (Number(data.team.participants) > 2) {
    const auxiliarHtml = auxiliarTemplate({ ...data, images });
    fullHtml += `
      <div style="page-break-after: always;"></div>
      ${auxiliarHtml}
    `;
  }

  // 5. Aplicar CSS
  const cssPath = path.join(__dirname, '../../../public/stylesheets/pdf.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  const htmlWithStyles = `
    <html>
      <head><style>${cssContent}</style></head>
      <body>${fullHtml}</body>
    </html>
  `;

  // 6. Gerar o PDF
  console.log('Lançando navegador...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  console.log('Navegador lançado');

  const page = await browser.newPage();

  console.log('Setando conteúdo HTML');
  await page.setContent(htmlWithStyles, { waitUntil: 'networkidle0', timeout: 60000 });
  console.log('Conteúdo HTML definido');

  console.log('Gerando PDF');
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  console.log('PDF gerado');

  await browser.close();
  console.log('Navegador fechado');

  return Buffer.from(pdfBuffer);
};

module.exports.abrirFichaPDF = async (data, images) => {
  const value = 500 + (180 * (Number(data.team.participants) - 2))
  data.team.value = value.toFixed(2).toLocaleString('pt-br').replace('.', ',')

  // 4. Compilar os templates
  const getTemplate = (filename) => {
    const filePath = path.join(__dirname, `../../../templates/${filename}`);
    return handlebars.compile(fs.readFileSync(filePath, 'utf8'));
  };

  const pilotoTemplate = getTemplate('pilot-subscribe.hbs');
  const navegadorTemplate = getTemplate('nav-subscribe.hbs');
  const auxiliarTemplate = getTemplate('aux-subscribe.hbs');

  const pilotoHtml = pilotoTemplate({ ...data, images });
  const navegadorHtml = navegadorTemplate({ ...data, images });

  let fullHtml = `
    ${pilotoHtml}
    <div style="page-break-after: always;"></div>
    ${navegadorHtml}
  `;

  if (Number(data.team.participants) > 2) {
    const auxiliarHtml = auxiliarTemplate({ ...data, images });
    fullHtml += `
      <div style="page-break-after: always;"></div>
      ${auxiliarHtml}
    `;
  }

  // 5. Aplicar CSS
  const cssPath = path.join(__dirname, '../../../public/stylesheets/pdf.css');
  const cssContent = fs.readFileSync(cssPath, 'utf8');

  const htmlWithStyles = `
    <html>
      <head><style>${cssContent}</style></head>
      <body>${fullHtml}</body>
    </html>
  `;

  // 6. Gerar o PDF
  console.log('Lançando navegador...');
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  console.log('Navegador lançado');

  const page = await browser.newPage();

  console.log('Setando conteúdo HTML');
  await page.setContent(htmlWithStyles, { waitUntil: 'networkidle0', timeout: 60000 });
  console.log('Conteúdo HTML definido');

  console.log('Gerando PDF');
  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  console.log('PDF gerado');

  await browser.close();
  console.log('Navegador fechado');

  return Buffer.from(pdfBuffer);
}