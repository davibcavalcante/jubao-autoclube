const fetch = require('node-fetch')

module.exports.getYear = (req, res) => {
    return req.params.year
}

module.exports.getPhotos = async () => {
    try {
        const apiKey = '77c742a73b64d1e45e75c6d205973cad'
        const userId = '199814774@N07'
        const req = `https://www.flickr.com/services/rest/?method=flickr.people.getPublicPhotos&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`

        const response = await fetch(req)

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.status}`)
        }

        const data = await response.json()
        const photos = data.photos.photo
        
        return photos
    } catch (error) {
        console.error(`Erro durante a requisição: ${error.message}`)
        throw error
    }
};