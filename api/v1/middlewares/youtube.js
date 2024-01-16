const fetch = require('node-fetch')

module.exports.getVideos = async (req, res) => {
    const apiKey = 'AIzaSyCv16fX2wWmHIa3pMqEyvOsbDIuSyaqrJ4';
    const playlistId = 'UUFgVI_9GrVOp6t7sG7j4UHg'
    const maxResults = 10
    const order = 'date'

    try {
        const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&order=${order}`
        );

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}\n${errorMessage}`);
        }

        const data = await response.json();
        const videos = await data.items

        res.status(200).json({ videos });
    } catch (error) {
        console.error('Erro ao obter vídeos:', error.message);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
};
