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
    email: 'jubaofe@gmail.com',
    cnpj: '29.482.407/0001-84'
  }

  return [
    {
      name: 'Campeonato Goiano de Rally',
      stage: '',
      description: {
        p1: `Com reestreia marcada para os dias 06 e 07 de junho próximo, as cidades de Jataí e Serranópolis serão palco da abertura do Campeonato Goiano de Rally que na temporada 2025, receberá participantes em 04 categorias: Graduados, Turismo, Novatos 4x4 e 4x2.`,
        p2: `As inscrições terão início no dia 22 de maio e serão oferecidas 60 vagas para equipes que deverão ser formadas de piloto, navegador e de seus acompanhantes.`,
        p3: `O valor para a participação no evento recolhido a título de inscrição será de R$ 250,00 para o piloto e de R$ 250,00 para o navegador, constituindo o valor total de R$ 500,00 por equipe inscrita. Caso seja possível a participação de acompanhantes na categoria como tripulação, para os auxiliares denominados zequinhas ou docinhos o valor da inscrição individual será de R$ 180,00.`
      },
      date: '07/06/2025',
      month: '06',
      local: 'JATAÍ, GO',
      ok: true,
      duration: "7:00h às 15:00h",
      categories: categories,
      values: {
        c1: {
          l1: 'R$ 250,00 (PILOTO) e R$ 250,00 (NAVEGADOR)',
          l2: 'ZEQUINHA ou DOCINHO ADICIONAL: R$ 180,00',
          l3: 'DATA LIMITE: 05/06/2025'
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