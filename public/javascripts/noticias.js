// FUNCTION THAT CREATES NEWS IFRAMES
const setIframe = async(newsData) => {
    const response = await fetch(`/api/v1/dados-noticias-locais/${newsData.titulo}`)
    const foundNews = await response.json()

    const newsIframe = document.querySelector('#news-iframe')
    if (newsIframe.classList.contains('hidden')) {
        newsIframe.classList.remove('hidden')
    }
    
    const iframeContent = `
        <html>
            <head>
                <link rel="stylesheet" href="/stylesheets/iframe.css">
                <script src="https://kit.fontawesome.com/3954e72066.js" crossorigin="anonymous"></script>
                <link rel="stylesheet" href="https://use.typekit.net/npq0jlq.css">
            </head>
            <body>
                <section class="header-container">
                    ${foundNews.data}
                    ${foundNews.titulo}
                    ${foundNews.subtitulo}
                </section>
            
                <section class="news-container">
                    <section class=image-container>
                        ${foundNews.imagem}
                        ${foundNews.jornalista}
                        ${foundNews.fonte}
                    </section>
                    <section class="text-container">
                        ${foundNews.texto}
                    </section>
                </section>

                <section class="credits-container">
                    ${foundNews.jornalista}
                    ${foundNews.fonte}
                </section>
            </body>
        </html>
    `

    setTimeout(() => {
        const rect = newsIframe.getBoundingClientRect()

        if (newsIframe) {
            window.scrollTo({ top: (window.scrollY + rect.top) - 20, behavior: 'smooth' })
        }
    }, 100)

    newsIframe.contentDocument.write(iframeContent)
    newsIframe.contentDocument.close()
}

// FUNCTION THAT CREATES NEWS IMAGE
const createNewsImage = (newsData) => {
    const image = document.createElement('img')
    image.setAttribute('src', newsData.imagem)

    return image
}

// FUNCTION THAT CREATES NEWS LINK
const createNewsLink = (newsData) => {
    if (newsData.externa === 'y') {
        const link = document.createElement('a')
        link.setAttribute('href', newsData.link)
        link.setAttribute('rel', 'external')
        link.setAttribute('target', '_blank')

        link.appendChild(createNewsImage(newsData))

        return link
    } else if (newsData.externa === 'n') {
        const link = document.createElement('a')
        link.appendChild(createNewsImage(newsData))

        return link
    }
}

// FUNCTION THAT CREATES NEWS TITLE
const createTitle = (newsData) => {
    const title = document.createElement('h1')
    title.innerText = newsData.titulo

    return title
}

// FUNCTION THAT CREATES NEWS DATE
const createDate = (newsData) => {
    const date = document.createElement('p')
    date.innerHTML = `<i class="fa-regular fa-clock"></i> ${newsData.data}`

    return date
}

// FUNCTION THAT CREATES IMAGES CONTAINER
const createImageContainer = (newsData) => {
    const imageContainer = document.createElement('section')
    imageContainer.classList.add('news-image-container')

    imageContainer.appendChild(createNewsLink(newsData))

    return imageContainer
}

// FUNCTION THAT CREATES INFORMATION CONTAINER
const createInfoContainer = (newsData) => {
    const infoContainer = document.createElement('section')
    infoContainer.classList.add('info')

    infoContainer.appendChild(createDate(newsData))
    infoContainer.appendChild(createTitle(newsData))

    return infoContainer
}

// FUNCTION THAT CREATES NEWS
const createNews = (newsData, type) => {
    const imageContainer = createImageContainer(newsData)
    const infoContainer = createInfoContainer(newsData)

    if (type === 'main') {
        const mainNewsContainer = document.createElement('section')
        mainNewsContainer.classList.add('main-news', 'news')

        if (newsData.externa === 'n') {
            mainNewsContainer.classList.add('jubao-news')
            mainNewsContainer.addEventListener('click', () => {
                setIframe(newsData)
            })
        }

        mainNewsContainer.appendChild(imageContainer)
        mainNewsContainer.appendChild(infoContainer)
        return mainNewsContainer
    } else if (type === 'secondary') {
        const secondaryNewsContainer = document.createElement('section')
        secondaryNewsContainer.classList.add('secondary-news', 'news')

        if (newsData.externa === 'n') {
            secondaryNewsContainer.classList.add('jubao-news')
            secondaryNewsContainer.addEventListener('click', () => {
                setIframe(newsData)
            })
        }

        secondaryNewsContainer.appendChild(imageContainer)
        secondaryNewsContainer.appendChild(infoContainer)
        return secondaryNewsContainer
    } else if (type === 'tertiary') {
        const tertiaryNewsContainer = document.createElement('section')
        tertiaryNewsContainer.classList.add('tertiary-news', 'news')

        if (newsData.externa === 'n') {
            tertiaryNewsContainer.classList.add('jubao-news')
            tertiaryNewsContainer.addEventListener('click', () => {
                setIframe(newsData)
            })
        }

        tertiaryNewsContainer.appendChild(imageContainer)
        tertiaryNewsContainer.appendChild(infoContainer)
        return tertiaryNewsContainer

    } else if (type === 'normal') {
        const news = document.createElement('section')
        news.classList.add('news')

        if (newsData.externa === 'n') {
            news.classList.add('jubao-news')
            news.addEventListener('click', () => {
                setIframe(newsData)
            })
        }

        news.appendChild(imageContainer)
        news.appendChild(infoContainer)
        return news
    }
}

// FUNCTION THAT UPDATES HTML
const updateHtml = (news) => {
    const mainNewsDesktop = document.querySelector('.main-news-desktop')
    const otherNewsContainer = document.querySelector('.other-news')

    news.forEach((newsData, index) => {
        if (index === 0) {
            const main = createNews(newsData, 'main')
            mainNewsDesktop.appendChild(main)
        } else if (index === 1) {
            const secondary = createNews(newsData, 'secondary')
            mainNewsDesktop.appendChild(secondary)
        } else if (index === 2) {
            const tertiary = createNews(newsData, 'tertiary')
            mainNewsDesktop.appendChild(tertiary)
        } else if (index > 2 && index < 7) {
            const newsEl = createNews(newsData, 'normal')
            otherNewsContainer.appendChild(newsEl)
        }
    })
}

// CODE INICIALIZATION EVENT
window.addEventListener('load', () => {
    const newsApi = async() => {
        const start = 0
        const result = await fetch(`/api/v1/database/noticias?limit=${start}&pagesize=7`)
        const data = await result.json()

        const news = data.news

        updateHtml(news)
    }

    newsApi()
})