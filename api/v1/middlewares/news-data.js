const getCupName = () => {
    const cup = 'COPA SOLIDARIEDADE';
    return cup;
};

const createNews = (url, title, date) => {
    return {
        url,
        title,
        date,
    };
};

const getMainNew = () => {
    return createNews(
        'https://images.pexels.com/photos/5660821/pexels-photo-5660821.jpeg?auto=compress&cs=tinysrgb&w=600',
        'Piraquara sedia as etapas do Campeonato Brasileiro e Paranaense de Rally',
        '17 Dezembro 2023'
    );
};

const getSecondaryNew = () => {
    return createNews(
        'https://images.pexels.com/photos/4673204/pexels-photo-4673204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
        'Título da notícia secundária',
        '18 Dezembro 2023'
    );
};

const getOtherNews = () => {
    const newsArray = [
        createNews('https://images.pexels.com/photos/5660832/pexels-photo-5660832.jpeg?auto=compress&cs=tinysrgb&w=600', 'Título da notícia 1', '19 Dezembro 2023'),
        createNews('https://images.pexels.com/photos/3699828/pexels-photo-3699828.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Título da notícia 2', '20 Dezembro 2023'),
        createNews('https://images.pexels.com/photos/13070858/pexels-photo-13070858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Título da notícia 3', '21 Dezembro 2023'),
        createNews('https://images.pexels.com/photos/8593631/pexels-photo-8593631.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 'Título da notícia 4', '22 Dezembro 2023'),
    ];

    return newsArray;
};

const getNewsData = {
    cupName: getCupName(),
    mainNew: getMainNew(),
    secondaryNew: getSecondaryNew(),
    otherNews: getOtherNews(),
};

module.exports = { getNewsData };
