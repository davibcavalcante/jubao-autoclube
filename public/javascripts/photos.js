const getPhotos = async() => {
    const response = await fetch('/api/v1/photos')
    const data = await response.json()
    return filterPhotos(data)
}

const filterPhotos = (photos) => {
    const photoContainer = document.querySelector('.photo-container')
    const useYear = document.querySelector('#album-of-year').innerText
    const usePhotos = photos.filter(photo => photo.title.includes(useYear))
    usePhotos.forEach((photo) => {
        const photoServer = photo.server
        const photoId = photo.id
        const photoSecret = photo.secret

        const img = document.createElement('img')
        img.setAttribute('src', `https://live.staticflickr.com/${photoServer}/${photoId}_${photoSecret}.jpg`)

        photoContainer.appendChild(img)
    })
}

getPhotos()