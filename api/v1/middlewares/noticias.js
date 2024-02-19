const createNews = (url, title, date, external = false) => {
    if (external) {
        return {
            url,
            title,
            date,
            external
        };

    } else {
        return {
            url,
            title,
            date,
        };

    }
};

module.exports.getNews = (pageNumber, pageSize) => {
    const newsArray = [
        createNews(
            'https://cba.org.br/upload/noticias/2024/2682/thumb/automovel-clube-recebe-presidente-da-comissao-nacional-de-circuitos.png',
            'Automóvel Clube Chapecó recebe presidente da Comissão Nacional de Circuitos',
            '17 Fevereiro 2024',
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2681/thumb/fabiana-ecclestone-destaca-papel-fundamental-da-reuniao-da-fia-para-o-esporte-na-america-do-sul.png',
            'Fabiana Ecclestone destaca papel fundamental da reunião da FIA para o Esporte na América do Sul',
            '12 Fevereiro 2024',
            'https://cba.org.br/noticias/noticiasinfo/2681/fabiana-ecclestone-destaca-papel-fundamental-da-reuniao-da-fia-para-o-esporte-na-america-do-sul'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2680/thumb/matheus-morgatto-e-campeao-do-skusa-winter-series.png',
            'Matheus Morgatto é campeão do SKUSA Winter Series',
            '12 Fevereiro 2024',
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2679/thumb/banco-brb-amplia-participacao-na-bwt-alpine-f1-team.png',
            'Banco BRB amplia participação na BWT Alpine F1 Team',
            '08 Fevereiro 2024',
            'https://cba.org.br/campeonato/noticiasinfo/239/2679/banco-brb-amplia-participacao-na-bwt-alpine-f1-team'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2678/thumb/campeao-brasileiro-na-junior-menor-raphael-gebara-e-anunciado-pela-cba-como-o-representante-do-brasil-no-trofeu-academy-da-fia-de-2024.jpg',
            'Campeão Brasileiro na Júnior Menor, Raphael Gebara é anunciado pela CBA como o representante do Brasil no Troféu Academy da FIA de 2024',
            '06 Fevereiro 2024',
            'https://cba.org.br/campeonato/noticiasinfo/82/2678/campeao-brasileiro-na-junior-menor-raphael-gebara-e-anunciado-pela-cba-como-o-representante-do-brasil-no-trofeu-academy-da-fia-de-2024'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2677/thumb/brasileiros-sao-premiados-em-evento-da-fia-no-panama.jpg',
            'Brasileiros são premiados em evento da FIA no Panamá',
            '05 Fevereiro 2024',
            'https://cba.org.br/campeonato/noticiasinfo/82/2678/campeao-brasileiro-na-junior-menor-raphael-gebara-e-anunciado-pela-cba-como-o-representante-do-brasil-no-trofeu-academy-da-fia-de-2024'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2659/thumb/lucas-moraes-vence-pela-primeira-vez-no-dakar.jpg',
            'Lucas Moraes vence pela primeira vez no Dakar',
            '08 Janeiro 2024',
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2023/2637/thumb/gaetano-di-mauro-foi-o-grande-campeao-da-temporada-2023-do-imperio-endurance-brasil-.png',
            'Gaetano Di Mauro foi o grande campeão da temporada 2023 do Imperio Endurance Brasil',
            '11 Dezembro 2023',
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2664/thumb/dakar-2024-ndash-estagio-7-elimina-tres-competidores-brasileiros.jpg',
            'Dakar 2024 - Estágio 7 elimina três competidores brasileiros',
            '15 Janeiro 2024',
            'https://cba.org.br/noticias/noticiasinfo/2664/dakar-2024-estagio-7-elimina-tres-competidores-brasileiros'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2660/thumb/com-trechos-ineditos-rally-cerapio-comeca-dia-23-de-janeiro.png',
            'Com trechos inéditos, Rally Cerapió começa dia 23 de janeiro',
            ' 09 Janeiro 2024',
            'https://cba.org.br/campeonato/noticiasinfo/196/2660/com-trechos-ineditos-rally-cerapio-comeca-dia-23-de-janeiro'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2663/thumb/dakar-2024-marcelo-medeiros-e-o-brasileiro-com-mais-vitorias-ate-aqui.jpg',
            'Dakar 2024 - Marcelo Medeiros é o brasileiro com mais vitórias até aqui',
            '13 Janeiro 2024',
            'https://cba.org.br/noticias/noticiasinfo/2663/dakar-2024-marcelo-medeiros-e-o-brasileiro-com-mais-vitorias-ate-aqui'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2662/thumb/terceira-edicao-do-fia-motorsport-games-contara-com-programa-de-esports-expandido.png',
            'Terceira edição do FIA Motorsport Games contará com programa de eSports expandido',
            '13 Janeiro 2024',
            'https://cba.org.br/campeonato/noticiasinfo/329/2662/terceira-edicao-do-fia-motorsport-games-contara-com-programa-de-esports-expandido'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2661/thumb/-ldquo-cade-o-carro-o-pirata-lsquo-comeu-rsquo-rdquo-a-aventura-do-team-brazil-no-dakar-2024.jpg',
            '“Cadê o carro? O pirata ‘comeu’!” - A aventura do Team Brazil no Dakar 2024',
            '09 Janeiro 2024',
            'https://cba.org.br/noticias/noticiasinfo/2661/-ldquo-cade-o-carro-o-pirata-lsquo-comeu-rsquo-rdquo-a-aventura-do-team-brazil-no-dakar-2024'
        ),

    ];

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const newsForPage = newsArray.slice(startIndex, endIndex);

    const totalPages = Math.ceil(newsArray.length / pageSize);

    return { newsForPage, totalPages };
};