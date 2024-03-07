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
}

module.exports.getNews = (pageNumber, pageSize) => {
    const newsArray = [
        createNews(
            'https://cba.org.br/upload/noticias/2024/2689/thumb/kart-cba-abre-licitacao-para-fornecimento-de-motores-4-tempos.png',
            'Kart: CBA abre licitação para fornecimento de motores 4 tempos',
            '06 Março 2024',
            'https://cba.org.br/noticias/noticiasinfo/2689/kart-cba-abre-licitacao-para-fornecimento-de-motores-4-tempos'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2688/thumb/pioneiro-e-visionario-fernando-monteiro-um-dos-principais-responsaveis-pela-pratica-do-automobilismo-no-nordeste-completa-80-anos.png',
            'Pioneiro e visionário, Fernando Monteiro, um dos principais responsáveis pela prática do automobilismo no Nordeste, completa 80 anos',
            '03 Março 2024',
            'https://cba.org.br/noticias/noticiasinfo/2688/pioneiro-e-visionario-fernando-monteiro-um-dos-principais-responsaveis-pela-pratica-do-automobilismo-no-nordeste-completa-80-anos'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2687/thumb/tudo-pronto-para-o-sul-brasileiro-de-kart-em-pato-branco-pr-.png',
            'Tudo pronto para o Sul-Brasileiro de Kart, em Pato Branco (PR)',
            '28 Fevereiro 2024',
            'https://cba.org.br/campeonato/noticiasinfo/309/2687/tudo-pronto-para-o-sul-brasileiro-de-kart-em-pato-branco-pr-'
        ),
        
        createNews(
            'https://cba.org.br/upload/noticias/2024/2686/thumb/cba-e-governo-do-estado-firmam-entendimentos-para-construcao-de-complexo-automobilistico-no-piaui.png',
            'CBA e governo do Estado firmam entendimentos para construção de complexo automobilístico no Piauí',
            '27 Fevereiro 2024',
            'https://cba.org.br/noticias/noticiasinfo/2686/cba-e-governo-do-estado-firmam-entendimentos-para-construcao-de-complexo-automobilistico-no-piaui'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2685/thumb/bwt-alpine-f1-team-renova-parceria-com-o-banco-brb.png',
            'BWT Alpine F1 Team renova parceria com o Banco BRB',
            '27 Fevereiro 2024',
            'https://cba.org.br/campeonato/noticiasinfo/239/2685/bwt-alpine-f1-team-renova-parceria-com-o-banco-brb'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2684/thumb/o-automobilismo-brasileiro-perde-wilson-fittipaldi-jr-.png',
            'O Automobilismo Brasileiro perde Wilson Fittipaldi Jr.',
            '23 Fevereiro 2024',
            'https://cba.org.br/noticias/noticiasinfo/2684/o-automobilismo-brasileiro-perde-wilson-fittipaldi-jr-'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2683/thumb/campeonato-do-nordeste-de-kart-prorroga-desconto-nas-inscricoes-ate-dia-3-de-marco.png',
            'Campeonato do Nordeste de Kart prorroga desconto nas inscrições até dia 3 de março',
            '21 Fevereiro 2024',
            'https://cba.org.br/campeonato/noticiasinfo/310/2683/campeonato-do-nordeste-de-kart-prorroga-desconto-nas-inscricoes-ate-dia-3-de-marco'
        ),

        createNews(
            'https://admin.presskit.com.br/anexos_checkurl.jpg?fd=0&tipoimg=web&newsid=434466&anexoid=1097030&usuid=&usu=',
            'Accert Competições confirma participação nos principais campeonatos de 2024',
            '22 Fevereiro 2024',
            'https://share.presskit.com.br/43446671f9'
        ),
        
        createNews(
            'https://cba.org.br/upload/noticias/2024/2682/thumb/automovel-clube-recebe-presidente-da-comissao-nacional-de-circuitos.png',
            'Automóvel Clube Chapecó recebe presidente da Comissão Nacional de Circuitos',
            '17 Fevereiro 2024',
            'https://cba.org.br/noticias/noticiasinfo/2682/automovel-clube-chapeco-recebe-presidente-da-comissao-nacional-de-circuitos'
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
            'https://cba.org.br/noticias/noticiasinfo/2680/matheus-morgatto-e-campeao-do-skusa-winter-series'
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
            'https://cba.org.br/noticias/noticiasinfo/2677/brasileiros-sao-premiados-em-evento-da-fia-no-panama'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2664/thumb/dakar-2024-ndash-estagio-7-elimina-tres-competidores-brasileiros.jpg',
            'Dakar 2024 - Estágio 7 elimina três competidores brasileiros',
            '15 Janeiro 2024',
            'https://cba.org.br/noticias/noticiasinfo/2664/dakar-2024-estagio-7-elimina-tres-competidores-brasileiros'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2662/thumb/terceira-edicao-do-fia-motorsport-games-contara-com-programa-de-esports-expandido.png',
            'Terceira edição do FIA Motorsport Games contará com programa de eSports expandido',
            '13 Janeiro 2024',
            'https://cba.org.br/campeonato/noticiasinfo/329/2662/terceira-edicao-do-fia-motorsport-games-contara-com-programa-de-esports-expandido'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2663/thumb/dakar-2024-marcelo-medeiros-e-o-brasileiro-com-mais-vitorias-ate-aqui.jpg',
            'Dakar 2024 - Marcelo Medeiros é o brasileiro com mais vitórias até aqui',
            '13 Janeiro 2024',
            'https://cba.org.br/noticias/noticiasinfo/2663/dakar-2024-marcelo-medeiros-e-o-brasileiro-com-mais-vitorias-ate-aqui'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2661/thumb/-ldquo-cade-o-carro-o-pirata-lsquo-comeu-rsquo-rdquo-a-aventura-do-team-brazil-no-dakar-2024.jpg',
            '“Cadê o carro? O pirata ‘comeu’!” - A aventura do Team Brazil no Dakar 2024',
            '09 Janeiro 2024',
            'https://cba.org.br/noticias/noticiasinfo/2661/-ldquo-cade-o-carro-o-pirata-lsquo-comeu-rsquo-rdquo-a-aventura-do-team-brazil-no-dakar-2024'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2660/thumb/com-trechos-ineditos-rally-cerapio-comeca-dia-23-de-janeiro.png',
            'Com trechos inéditos, Rally Cerapió começa dia 23 de janeiro',
            ' 09 Janeiro 2024',
            'https://cba.org.br/campeonato/noticiasinfo/196/2660/com-trechos-ineditos-rally-cerapio-comeca-dia-23-de-janeiro'
        ),

        createNews(
            'https://cba.org.br/upload/noticias/2024/2659/thumb/lucas-moraes-vence-pela-primeira-vez-no-dakar.jpg',
            'Lucas Moraes vence pela primeira vez no Dakar',
            '08 Janeiro 2024',
            'https://cba.org.br/noticias/noticiasinfo/2659/lucas-moraes-vence-pela-primeira-vez-no-dakar'
        ),

    ];

    const startIndex = (pageNumber - 1) * pageSize;
    const endIndex = startIndex + pageSize;

    const newsForPage = newsArray.slice(startIndex, endIndex);

    const totalPages = Math.ceil(newsArray.length / pageSize);

    return { newsForPage, totalPages };
};