// ONLY JUBÃOFE EVENTS
const allEvents = () => {
  const description = {
    p1: `Bem-vindo ao mundo onde a coragem encontra a trilha empoeirada, e a busca pela vitória se torna um espetáculo de pura emoção. Imagine-se no volante de um veículo off-road, enfrentando terrenos desafiadores, cada curva uma oportunidade para provar sua destreza, cada reta um desafio para alcançar a velocidade máxima. Este não é apenas um torneio, é uma jornada que transcende os limites do possível.`,
    p2: `O rugir dos motores cria uma sinfonia de audácia, ecoando através das paisagens selvagens como um chamado para os destemidos. Equipes alinham-se, máquinas imponentes prontas para desafiar o desconhecido. Neste palco de resistência, não é para os fracos de coração; é para aqueles que buscam a emoção e anseiam pela glória.`
  }

  const categories = {
    c1: 'GRADUADO | TURISMO | NOVATOS 4x4 | NOVATOS 4x2',
    c2: ''
  }

  const payments = {
    // email: 'jubaofe@gmail.com',
    cnpj: '29.482.407/0001-84'
  }

  return [
    {
      name: 'Campeonato Goiano de Rally Etapa Colinas do Sul',
      stage: '',
      description,
      date: '22/11/2025',
      month: '11',
      local: 'COLINAS DO SUL, GO',
      ok: true,
      duration: "",
      categories: categories,
      values: {
        c1: {
          l1: 'R$ 250,00 (PILOTO) e R$ 250,00 (NAVEGADOR)',
          l2: 'ZEQUINHA ou DOCINHO ADICIONAL: R$ 180,00',
          l3: 'DATA LIMITE: 03/09/2025'
        },
      },
      payments: payments,
    },
  ]
}

// EVENTS SEARCH FUNCTION
const searchEvents = (data, method) => {
  const events = allEvents()

  if (method === 'month') {
    const eventsFilter = events.filter((event) => event.month === data)
    return eventsFilter
  } else if (method === 'name') {
    console.log(data)
    const eventsFilter = events.filter((event) => event.name === data)
    return eventsFilter
  }
}

// RETURN THE EVENTS
module.exports.getEvents = () => {
  return allEvents()
}

// CHECK WHAT THE FILTER OPTION IS
module.exports.getFilterEvents = (month, name) => {
  if (month) {
    return searchEvents(month, 'month')
  } else if (name) {
    return searchEvents(name, 'name')
  }
}