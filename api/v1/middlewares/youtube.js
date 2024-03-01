const fetch = require('node-fetch')
const config = require('../../../config.json').apis;

const checkVideosUploaded = async (videoIds, apiKey) => {
    try {
        const videoIdsString = videoIds.join(',');
        const results = await fetch(`https://youtube.googleapis.com/youtube/v3/videos?part=status&id=${videoIdsString}&key=${apiKey}`);
        const data = await results.json();
        const videoStatusMap = {};
        data.items.forEach(item => {
            const videoId = item.id;
            const uploadStatus = item.status.uploadStatus;
            videoStatusMap[videoId] = uploadStatus;
        });
        return videoStatusMap;
    } catch (error) {
        throw new Error(`Erro ao obter o status dos vídeos: ${error}`);
    }
}

module.exports.getVideos = async (req, res) => {
    const apiKey = config.youtube.key;
    const playlistId = 'UUFgVI_9GrVOp6t7sG7j4UHg';
    const maxResults = 20;
    const order = 'date';

    try {
        const response = await fetch(
            `https://youtube.googleapis.com/youtube/v3/playlistItems?key=${apiKey}&part=snippet&playlistId=${playlistId}&maxResults=${maxResults}&order=${order}`
        );

        if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}\n${errorMessage}`);
        }

        const data = await response.json();
        const videos = data.items.map(item => item.snippet);

        const videoIds = videos.map(video => video.resourceId.videoId);
        const videoStatusMap = await checkVideosUploaded(videoIds, apiKey);

        const useVideos = videos.filter(video => videoStatusMap[video.resourceId.videoId] === 'processed').slice(0, 10);

        res.status(200).json(useVideos);
    } catch (error) {
        console.error('Erro ao obter vídeos:', error.message);
        res.status(500).json({ error: 'Erro interno no servidor' });
    }
};
