const fetch = require('node-fetch')

module.exports.getYear = (req, res) => {
    return req.params.year
}

module.exports.getPhotos = async (year) => {
    try {
        const apiKey = 'de13e6aaed4e901c5fd47c31109dbf70'
        const userId = '200025150@N06'

        const reqAlbumId = `https://www.flickr.com/services/rest/?method=flickr.photosets.getList&api_key=${apiKey}&user_id=${userId}&format=json&nojsoncallback=1`

        const getAlbumId = async () => {
            const response = await fetch(reqAlbumId)
            const data = await response.json()
            const albumSelect = data.photosets.photoset.filter(album => album.title._content == year)

            if (albumSelect.length > 0) {
                return albumSelect[0].id
            }
        }

        const albumId =  await getAlbumId()
        const reqAlbum = `https://www.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${apiKey}&photoset_id=${albumId}&user_id=${userId}&format=json&nojsoncallback=1`

        if (reqAlbum) {
            const response = await fetch(reqAlbum)
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`)
            }
    
            const data = await response.json()
            
            return data
        }
           
    } catch (error) {
        console.error(`Erro durante a requisição: ${error.message}`)
        throw error
    }
};