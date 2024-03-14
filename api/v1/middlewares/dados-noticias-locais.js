// LOCAL NEWS DATA
module.exports.localNews = (title) => {
    const localNewsArray = [
        {
            title: '<h1></h1>',
            subtitle: '<h2></h2>',
            date: '<p><i class="fa-regular fa-clock"></i></p>',
            image: `<img src="">`,
            newscaster: '<p></p>',
            from: '<p></p>',
            text: `<p></p>

            <p>

            </p>
            
            <p>
            
            </p>
            
            <p>
            
            </p>`
        },
    ]

    // REMOVE HTML TAGS FROM THE ELEMENT AND SEARCHES FOR NEWS
    const foundNews = localNewsArray.find(news => news.title.replace(/<\/?[^>]+(>|$)/g, '') === title);

    // RETURN THE NEWS
    if (foundNews) {
        return foundNews;
    } else {
        console.log('Notícia não encontrada!');
        return 'Notícia não encontrada!';
    }
}