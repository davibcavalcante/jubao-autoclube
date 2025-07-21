const Database = require('../../../config/db-connect-inscricoes');
const InscricoesRepository = require('../../../repository/inscricoes');

const mapInscricao = (inscricao) => {
  return {
    obs: inscricao.cup_obs,
    cup: {
      cupName: inscricao.cup_name,
    },
    team: {
      name: inscricao.team_name,
      class: inscricao.team_class,
      participants: inscricao.participants,
      num_sub: inscricao.num_sub
    },
    pilot: {
      name: inscricao.pilot_name,
      cpf: inscricao.pilot_cpf,
      rg: inscricao.pilot_rg,
      email: inscricao.pilot_email,
      cnh: inscricao.pilot_cnh,
      cba: inscricao.pilot_cba,
      date: inscricao.pilot_date,
      blood: inscricao.pilot_blood,
      marital: inscricao.pilot_marital,
      sex: inscricao.pilot_sex,
      nationality: inscricao.pilot_nationality,
      birthplace: inscricao.pilot_birthplace,
      shirt: inscricao.pilot_shirt,
      cep: inscricao.pilot_cep,
      street: inscricao.pilot_street,
      number: inscricao.pilot_number,
      neighborhood: inscricao.pilot_neighborhood,
      block: inscricao.pilot_block,
      batch: inscricao.pilot_batch,
      city: inscricao.pilot_city,
      state: inscricao.pilot_state,
    },
    navigator: {
      name: inscricao.navigator_name,
      cpf: inscricao.navigator_cpf,
      rg: inscricao.navigator_rg,
      email: inscricao.navigator_email,
      cnh: inscricao.navigator_cnh,
      cba: inscricao.navigator_cba,
      date: inscricao.navigator_date,
      blood: inscricao.navigator_blood,
      shirt: inscricao.navigator_shirt,
      cep: inscricao.navigator_cep,
      street: inscricao.navigator_street,
      number: inscricao.navigator_number,
      neighborhood: inscricao.navigator_neighborhood,
      block: inscricao.navigator_block,
      batch: inscricao.navigator_batch,
      city: inscricao.navigator_city,
      state: inscricao.navigator_state,
    },
    aux1: inscricao.aux1_name ? {
      name: inscricao.aux1_name,
      cpf: inscricao.aux1_cpf,
      rg: inscricao.aux1_rg,
      email: inscricao.aux1_email,
      date: inscricao.aux1_date,
      shirt: inscricao.aux1_shirt,
      cep: inscricao.aux1_cep,
      street: inscricao.aux1_street,
      number: inscricao.aux1_number,
      neighborhood: inscricao.aux1_neighborhood,
      block: inscricao.aux1_block,
      batch: inscricao.aux1_batch,
      city: inscricao.aux1_city,
      state: inscricao.aux1_state,
    } : null,
    aux2: inscricao.aux2_name ? {
      name: inscricao.aux2_name,
      cpf: inscricao.aux2_cpf,
      rg: inscricao.aux2_rg,
      email: inscricao.aux2_email,
      date: inscricao.aux2_date,
      shirt: inscricao.aux2_shirt,
      cep: inscricao.aux2_cep,
      street: inscricao.aux2_street,
      number: inscricao.aux2_number,
      neighborhood: inscricao.aux2_neighborhood,
      block: inscricao.aux2_block,
      batch: inscricao.aux2_batch,
      city: inscricao.aux2_city,
      state: inscricao.aux2_state,
    } : null,
    car: {
      brand: inscricao.car_brand,
      model: inscricao.car_model,
      color: inscricao.car_color,
      plate: inscricao.car_plate,
      year: inscricao.car_year,
      traction: inscricao.car_traction,
    },
  };
}

module.exports.getInscricoes = async (req, res) => {
  const db = new Database();
  await db.connect();

  const inscricoesRepository = new InscricoesRepository();

  try {
    const rawInscricoes = await inscricoesRepository.getInscricoes(db);
    const inscricoes = rawInscricoes.map(mapInscricao); // <== aqui
    res.status(200).json({ inscricoes });
  } catch (err) {
    console.error('Erro ao buscar inscrições:', err);
    res.status(500).send('Erro ao buscar inscrições');
  }
};