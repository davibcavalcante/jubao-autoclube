const allEvents = () => {
    const description = {
        p1: `Bem-vindo ao mundo onde a coragem encontra a trilha empoeirada, e a busca pela vitória se torna um espetáculo de pura emoção. Imagine-se no volante de um veículo off-road, enfrentando terrenos desafiadores, cada curva uma oportunidade para provar sua destreza, cada reta um desafio para alcançar a velocidade máxima. Este não é apenas um torneio, é uma jornada que transcende os limites do possível.`,
        p2: `O rugir dos motores cria uma sinfonia de audácia, ecoando através das paisagens selvagens como um chamado para os destemidos. Equipes alinham-se, máquinas imponentes prontas para desafiar o desconhecido. Neste palco de resistência, não é para os fracos de coração; é para aqueles que buscam a emoção e anseiam pela glória.`
    }

    const categories = {
        c1: 'INCIANTE | NOVATO',
        c2: 'TURISMO | GRADUADO | MASTER'
    }

    const payments = {
        email: 'jubaofe@gmail.com',
        cnpj: '20.118.143/0001-00'
    }

    return [
        {
            name: 'RALLY DAY',
            stage: '',
            description: description,
            date: '08 e 09/03/2024',
            month: '03',
            local: 'GOIÂNIA',
            ok: false,
            duration: "7:00h às 15:00h",
            categories: categories,
            values: {
            c1: {
                l1: 'R$ 375,00 (ATÉ 3 PARTICIPANTES)',
                l2: 'ZEQUINHA ADICIONAL: R$ 100,00',
                l3: 'DATA LIMITE: D-2 (DIA DO EVENTO)'
            },
            c2: {
                l1: 'R$ 450,00 (SOMENTE PILOTO E NAVEGADOR)',
                l2: 'GRID MÍNIMO: 05 CARROS POR CATEGORIA',
                l3: 'DATA LIMITE: D-2 (DIA DO EVENTO)',
            }
            },
            payments: payments,
        },

        {
            name: 'Rally da APAE',
            stage: '',
            description: description,
            date: '13-04-2024',
            month: '04',
            local: 'Silvânia-GO',
            ok: true,
            duration: "7:00h às 15:00h",
            categories: categories,
            values: {
                c1: {
                    l1: 'R$ 375,00 (ATÉ 3 PARTICIPANTES)',
                    l2: 'ZEQUINHA ADICIONAL: R$ 100,00',
                    l3: 'DATA LIMITE: D-2 (DIA DO EVENTO)'
                },
                c2: {
                    l1: 'R$ 450,00 (SOMENTE PILOTO E NAVEGADOR)',
                    l2: 'GRID MÍNIMO: 05 CARROS POR CATEGORIA',
                    l3: 'DATA LIMITE: D-2 (DIA DO EVENTO)',
                }
            },
            payments: payments,
        },

        {
            name: '12° Rally do Jubão',
            stage: '',
            description: description,
            date: '08-06-2024',
            month: '06',
            local: 'Goiânia',
            ok: true,
            duration: "7:00h às 15:00h",
            categories: categories,
            values: {
                c1: {
                    l1: 'R$ 375,00 (ATÉ 3 PARTICIPANTES)',
                    l2: 'ZEQUINHA ADICIONAL: R$ 100,00',
                    l3: 'DATA LIMITE: D-2 (DIA DO EVENTO)'
                },
                c2: {
                    l1: 'R$ 450,00 (SOMENTE PILOTO E NAVEGADOR)',
                    l2: 'GRID MÍNIMO: 05 CARROS POR CATEGORIA',
                    l3: 'DATA LIMITE: D-2 (DIA DO EVENTO)',
                }
            },
            payments: payments,
        },

        {
            name: '2° Rally das Crianças',
            stage: '',
            description: description,
            date: '12-10-2024',
            month: '10',
            local: 'Goiânia',
            ok: true,
            duration: "7:00h às 15:00h",
            categories: categories,
            values: {
                c1: {
                    l1: 'R$ 375,00 (ATÉ 3 PARTICIPANTES)',
                    l2: 'ZEQUINHA ADICIONAL: R$ 100,00',
                    l3: 'DATA LIMITE: D-2 (DIA DO EVENTO)'
                },
                c2: {
                    l1: 'R$ 450,00 (SOMENTE PILOTO E NAVEGADOR)',
                    l2: 'GRID MÍNIMO: 05 CARROS POR CATEGORIA',
                    l3: 'DATA LIMITE: D-2 (DIA DO EVENTO)',
                }
            },
            payments: payments,
        },

        {
            name: '13° Rally do Jubão',
            stage: '',
            description: description,
            date: '07-12-2024',
            month: '12',
            local: 'Goiânia',
            ok: true,
            duration: "7:00h às 15:00h",
            categories: categories,
            values: {
                c1: {
                    l1: 'R$ 375,00 (ATÉ 3 PARTICIPANTES)',
                    l2: 'ZEQUINHA ADICIONAL: R$ 100,00',
                    l3: 'DATA LIMITE: D-2 (DIA DO EVENTO)'
                },
                c2: {
                    l1: 'R$ 450,00 (SOMENTE PILOTO E NAVEGADOR)',
                    l2: 'GRID MÍNIMO: 05 CARROS POR CATEGORIA',
                    l3: 'DATA LIMITE: D-2 (DIA DO EVENTO)',
                }
            },
            payments: payments,
        }
    ]
}

const searchEvents = (data, method) => {
    const events = allEvents()

    if (method === 'month') {
        const eventsFilter = events.filter((event) => event.month === data)
        return eventsFilter
    } else if (method === 'name') {
        const eventsFilter = events.filter((event) => event.name === data)
        return eventsFilter
    }
}

module.exports.getEvents = () => {
    return allEvents()
}

module.exports.getFilterEvents = (month, name) => {
    if (month) {
        return searchEvents(month, 'month')
    } else if (name) {
        return searchEvents(name, 'name')
    }
}