const setIframe = async(newsData) => {
    const response = await fetch(`/api/v1/local-news-data/${newsData.title}`)
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
                    ${foundNews.date}
                    ${foundNews.title}
                    ${foundNews.subtitle}
                </section>
            
                <section class="news-container">
                    <section class=image-container>
                        ${foundNews.image}
                        ${foundNews.newscaster}
                        ${foundNews.from}
                    </section>
                    <section class="text-container">
                        ${foundNews.text}
                    </section>
                </section>

                <section class="credits-container">
                    ${foundNews.newscaster}
                    ${foundNews.from}
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

const createNewsImage = (newsData) => {
    const image = document.createElement('img')
    image.setAttribute('src', newsData.url)

    return image
}

const createNewsLink = (newsData) => {
    if (newsData.external) {
        const link = document.createElement('a')
        link.setAttribute('href', newsData.external)
        link.setAttribute('rel', 'external')
        link.setAttribute('target', '_blank')

        link.appendChild(createNewsImage(newsData))

        return link
    } else {
        const link = document.createElement('a')
        link.appendChild(createNewsImage(newsData))

        return link
    }
}

const createTitle = (newsData) => {
    const title = document.createElement('h1')
    title.innerText = newsData.title

    return title
}

const createDate = (newsData) => {
    const date = document.createElement('p')
    date.innerText = newsData.date

    return date
}

const createImageContainer = (newsData) => {
    const imageContainer = document.createElement('section')
    imageContainer.classList.add('news-image-container')

    imageContainer.appendChild(createNewsLink(newsData))

    return imageContainer
}

const createInfoContainer = (newsData) => {
    const infoContainer = document.createElement('section')
    infoContainer.classList.add('info')

    infoContainer.appendChild(createDate(newsData))
    infoContainer.appendChild(createTitle(newsData))

    return infoContainer
}

const createNews = (newsData, type) => {
    const imageContainer = createImageContainer(newsData)
    const infoContainer = createInfoContainer(newsData)

    if (type === 'main') {
        const mainNewsContainer = document.createElement('section')
        mainNewsContainer.classList.add('main-news', 'news')

        if (!newsData.external) {
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

        if (!newsData.external) {
            secondaryNewsContainer.addEventListener('click', () => {
                setIframe(newsData)
            })
        }

        secondaryNewsContainer.appendChild(imageContainer)
        secondaryNewsContainer.appendChild(infoContainer)
        return secondaryNewsContainer
    } else if (type === 'normal') {
        const news = document.createElement('section')
        news.classList.add('news')

        if (!newsData.external) {
            news.addEventListener('click', () => {
                setIframe(news, newsData)
            })
        }

        news.appendChild(imageContainer)
        news.appendChild(infoContainer)
        return news
    }
}

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
        } else if (index > 1 && index < 6) {
            const newsEl = createNews(newsData, 'normal')
            otherNewsContainer.appendChild(newsEl)
        }
    })
}

document.addEventListener('DOMContentLoaded', () => {
    const newsApi = async() => {
        const result = await fetch('/api/v1/news-data')
        const news = await result.json()
        updateHtml(news)
    }

    newsApi()
})