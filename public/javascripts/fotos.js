const backPageButton = () => {
    const backButton = document.querySelector('#back-to-albums-btn')
    backButton.addEventListener('click', () => {
        window.location.href = '/albums'
    })
}

const loadingAnimation = (action) => {
    const loadAnimation = document.querySelector('.loading-animation')
    if (action) {
        loadAnimation.classList.add('active')
    } else {
        loadAnimation.classList.remove('active')
        loadAnimation.classList.add('hidden')
    }
}

const setFocusOut = (e, images) => {
    const imageFocus = e.target
    
    images.forEach((image) => {
        if (image !== imageFocus) {
            image.classList.add('focus-out')
        }
    })
}

const resetFocusOut = (images) => {
    images.forEach(image => image.classList.remove('focus-out'))
}

//

const updatePage = (pages, page, notFound = false, scroll = false) => {
    const photoContainer = document.querySelector('.photo-container')
    const photosPerPage = pages[page]
    let images

    photoContainer.innerHTML = ''

    if (notFound) {
        photoContainer.innerHTML = `
        <img src="/imagens/albums/not-found-error.png">`
        photoContainer.classList.add('error')
        loadingAnimation(false)
        return
    }

    photosPerPage.forEach((photo) => {
        const photoServer = photo.server
        const photoId = photo.id
        const photoSecret = photo.secret

        photoContainer.innerHTML += `
        <img src="https://live.staticflickr.com/${photoServer}/${photoId}_${photoSecret}.jpg">`
        loadingAnimation(false)

        images = photoContainer.querySelectorAll('img')
        images.forEach(image => image.addEventListener('mouseenter', (e) => {
            setFocusOut(e, images)
        }))
        images.forEach(image => image.addEventListener('mouseout', (e) => {
            resetFocusOut(images)
        }))
    })

    if (scroll) {
        setTimeout(() => {
            const containerTop = photoContainer.getBoundingClientRect().top + window.scrollY
            window.scrollTo({ top: containerTop - 15, behavior: "smooth" })
        }, 300)
    }
}

const filterPhotos = (dataPhotos) => {
    if (dataPhotos.stat === 'fail') {
        return updatePage({}, 0, true, false)
    }
    const nextPageButton = document.querySelector('#next-page-btn')
    const prevPageButton = document.querySelector('#prev-page-btn')
    const pageScreen = document.querySelector('.page')

    const photos = dataPhotos.photoset.photo
    const pages = {}
    let page = 1
    let maxPages = Math.ceil(photos.length / 21)

    photos.forEach((photo, index) => {
        const pageNumber = Math.floor(index / 21) + 1

        if (!pages[pageNumber]) {
            pages[pageNumber] = []
        }

        pages[pageNumber].push(photo)
    })

    nextPageButton.addEventListener('click', () => {
        if (page === maxPages) return
        page++
        pageScreen.innerText = page
        updatePage(pages, page, false, true)
    })

    prevPageButton.addEventListener('click', () => {
        if (page === 1) return
        page--
        pageScreen.innerText = page
        updatePage(pages, page, false, true)
    })

    return updatePage(pages, page)
}

const getPhotos = async() => {
    const useYear = document.querySelector('#album-of-year').innerText
    const response = await fetch(`/api/v1/fotos/${useYear}`)
    const data = await response.json()
    return filterPhotos(data)
}

backPageButton()
getPhotos()
loadingAnimation(true)