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

module.exports.getNews = () => {
    const newsArray = [
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

    return newsArray;
};