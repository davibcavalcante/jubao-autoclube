module.exports.localNews = (title) => {
    const localNewsArray = [
        {
            title: '<h1>Lucas Moraes vence pela primeira vez no Dakar</h1>',
            subtitle: '<h2>O difícil trecho cronometrado teve 447 km O Toyota GR DKR Hilux EVO T1U #206 percorreu 447 km sob cronômetro</h2>',
            date: '<p><i class="fa-regular fa-clock"></i> 08 Janeiro 2024</p>',
            image: `<img src="https://cba.org.br/upload/noticias/2024/2659/thumb/lucas-moraes-vence-pela-primeira-vez-no-dakar.jpg">`,
            newscaster: '<p>Fran Oliveira (Institucional), Fernanda Gonçalves (CNK), Américo Teixeira Junior</p>',
            from: '<p>Comunicação CBA</p>',
            text: `<p>O brasileiro Lucas Moraes venceu nesta segunda-feira, 8, a terceira especial – de 12 - da edição 2024 do Rally Dakar, disputado na Arábia Saudita, e entrou para a história como o primeiro representante do país a conquistar uma etapa na geral na categoria Carros.</p>

            <p>Navegado pelo espanhol Armand Monleon, o piloto da Toyota Gazoo Racing conquistou a etapa entre Al Duwadimi e Al Salamiya, com 733 km, sendo 447 km de trechos cronometrados.</p>
            
            <p>Em 2023, Moraes já havia conquistado o primeiro pódio brasileiro na geral, fato que lhe rendeu na atual temporada uma vaga na equipe oficial da fábrica japonesa e atual campeã do Dakar.</p>
            
            <p>Apesar do resultou, que permitiu à dupla subir de 8º para 4º na classificação geral - a liderança é de Yazeed Al-Rajhi (Arábia Saudita)/Timo Gottschalk (Alemanha -, Lucas Moraes enfrentou essa primeira perna da “Maratona” com forte grid e muito preocupado com o estado de saúde da filha, de quatro anos, internada devido a um quadro de meningite. A conquista representou alegria dupla, pois recebeu a notícia de previsão de alta para terça-feira, 9.</p>`
        },

        {
            title: '<h1>Gaetano Di Mauro foi o grande campeão da temporada 2023 do Imperio Endurance Brasil</h1>',
            subtitle: '<h2>O piloto venceu as Quatro Horas do Velocittá a bordo de um Ligier</h2>',
            date: '<p><i class="fa-regular fa-clock"></i> 11 Dezembro 2023</p>',
            image: `<img src="https://cba.org.br/upload/noticias/2023/2637/thumb/gaetano-di-mauro-foi-o-grande-campeao-da-temporada-2023-do-imperio-endurance-brasil-.png">`,
            newscaster: '<p>Fran Oliveira (Institucional), Fernanda Gonçalves (CNK), Américo Teixeira Junior</p>',
            from: '<p>Comunicação CBA</p>',
            text: `<p>Di Mauro, que compete na categoria dos carros mais rápidos do Brasil a bordo de um protótipo Ligier, venceu as Quatro Horas do Velocittá, em Mogi Guaçu (SP), ao lado de Guilherme Bottura e Gustavo Kiryla. A conquista do degrau mais alto do pódio, aliada a uma série de tropeços dos seus principais concorrentes ao longo da prova realizada no último sábado, fez o piloto da equipe BTZ saltar da 12ª posição para o topo da tabela classificação, garantindo a ele o título do campeonato.</p>

            <p>Ao sair do carro, Gaetano fez questão de dividir o feito com seus companheiros de equipe. “Este é um momento muito especial para todos da BTZ, todos que acreditaram no sonho de fazer essa equipe. Não chegamos aqui como favoritos, mas nosso trabalho em conjunto fez com que essa conquista se tornasse possível. Dedico esta vitória, principalmente, ao Guilherme Bottura. Matematicamente ele não é campeão junto comigo porque não disputou uma etapa, mas a verdade é que, só vencemos, porque ele fez uma temporada fantástica e nem é justo que, só porque ele não disputou uma única prova, ele não seja também o campeão deste ano”, disse Gaetano. Bottura não disputou a etapa de Cascavel por conta de problemas de saúde.</p>
            
            <p>Já na categoria GT3, Marcel Visconde, Marçal Muller e Ricardo Maurício foram campeões ao cruzar a linha de chegada na segunda colocação da prova. O bicampeonato da Porsche quebrou um jejum de títulos que já durava sete anos e marcou a despedida do modelo 911 utilizado pelo trio da equipe Stuttgart.</p>
            
            <p>Fizemos um campeonato regular. Subimos ao pódio em todas as etapas do calendário. Vencemos duas vezes, uma delas em Goiânia que, tecnicamente falando, não favorecia as características do nosso carro. Tudo isso pavimentou nosso caminho em direção ao bicampeonato. Ano que vem teremos um novo carro e essa conquista foi muito importante para fecharmos um ciclo de forma vitoriosa”, afirmou Marcel Visconde após a prova, que foi vencida pela dupla Marcelo Hahn e Allam Khodair, que compete a bordo de uma McLaren 720s.</p>
            
            <p>A Porsche também foi a grande campeã da GT4, com Jaqcques Quartiero e Danilo Dirani. Assim como na GT3, eles confirmaram o título cruzando a linha de chegada na segunda posição. O topo do pódio ficou com o Mustang de André Moraes Jr - que também estava na briga pelo título - e Leandro Ferrari. A vitória, entretanto, não foi suficiente para tirar o troféu das mãos da dupla da Stuttgart.</p>
            
            <p>“Soubemos construir este título ao longo das etapas. Conquistamos cinco segundos lugares e duas vitórias em oito corridas. Então, foi realmente um ano fantástico. Ano passado ficamos na segunda colocação e seguimos evoluindo. O Jacques evoluiu demais também. Foi um título muito merecido e agora vamos celebrar muito essa conquista e nos preparamos para buscar o bicampeonato ano que vem”, disse Dirani.</p>
            
            <p>A temporada 2024 já tem data para começar. A corrida que abrirá o campeonato está marcada para o dia 16 de março, em Goiânia (GO). O campeonato também passará pelo Velocittá e Interlagos, em São Paulo.</p>`
        },
    ]

    const foundNews = localNewsArray.find(news => news.title.replace(/<\/?[^>]+(>|$)/g, '') === title);

    if (foundNews) {
        return foundNews;
    } else {
        console.log('Notícia não encontrada!');
        return 'Notícia não encontrada!';
    }
}