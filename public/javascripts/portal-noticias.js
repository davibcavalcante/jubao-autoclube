const messageError = (method) => {
    const showsMessageErrorContainer = document.querySelector('.message-error-container')
    if (method === 'remove') {
        showsMessageErrorContainer.classList.remove('hidden')
    } else if (method == 'add' && showsMessageErrorContainer.classList.contains('messa-error-container')){
        showsMessageErrorContainer.classList.add('hidden')
    }
}

const setIframe = async(news) => {
    const response = await fetch(`/api/v1//dados-noticias-locais/${news.title}`)
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

const setImage = (news) => {
    const image = document.createElement('img')
    image.src = news.url
    
    if (!news.external) {
        image.addEventListener('click', () => {
            setIframe(news)
        })
    }

    return image
}

const setLink = (news, type) => {
    const link = document.createElement('a')
    link.classList.add('info')
    if (type === 'external') {
        link.href = news.external
        link.rel = 'external'
        link.target = '_blank'

        link.innerHTML = `
            <p><i class="fa-regular fa-clock"></i> ${news.date}</p>
            <h1>${news.title}</h1>
        ` 
        return link
    } else if (type === 'local') {
        link.innerHTML = `
            <p><i class="fa-regular fa-clock"></i> ${news.date}</p>
            <h1>${news.title}</h1>
        `

        link.addEventListener('click', () => {
            setIframe(news)
        })
        return link
    }
}

const createNews = (news) => {
    const newsContainer = document.createElement('section')
    newsContainer.classList.add('news')

    if (news.external) {
        newsContainer.appendChild(setImage(news))
        newsContainer.appendChild(setLink(news, 'external'))
    } else {
        newsContainer.appendChild(setImage(news))
        newsContainer.appendChild(setLink(news, 'local'))
        newsContainer.classList.add('jubao-news')
    }

    return newsContainer
}

const createTemplate = (allNews, scroll = false) => {
    const allNewsContainer = document.querySelector('#news-container')
    allNewsContainer.innerHTML = ''
    allNews.forEach((news) => {
        allNewsContainer.appendChild(createNews(news))
    })

    if (scroll) {
        setTimeout(() => {
            const containerRect = allNewsContainer.getBoundingClientRect()
            window.scrollTo({ top: (window.scrollY + containerRect.top) - 20, behavior: 'smooth' })
        }, 500)
    }
}

const updatePage = async (method) => {
    const pageScreen = document.querySelector('.page')
    let pageNumber = Number(pageScreen.innerText)

    const data = await getNewsApi(pageNumber)
    const totalPages = data.totalPages

    if (method === 'next') {
        if (pageNumber + 1 > totalPages) return
        pageNumber++
        const newsData = await getNewsApi(pageNumber)
        pageScreen.innerText = pageNumber
        createTemplate(newsData.news, true)
    } else if (method === 'prev') {
        if (!(pageNumber > 1)) return
        pageNumber--
        const newsData = await getNewsApi(pageNumber)
        pageScreen.innerText = pageNumber
        createTemplate(newsData.news, true)
    }
}

const getCurrentPage = () => {
    const pageStr = document.querySelector('.page').innerText
    return pageStr
}

const setPaginationEvents = () => {
    const nextPageButton = document.querySelector('#next-page-btn')
    const prevPageButton = document.querySelector('#prev-page-btn')

    nextPageButton.addEventListener('click', () => {
        updatePage('next')
    })

    prevPageButton.addEventListener('click', () => {
        updatePage('prev')
    })
}

const getNewsApi = async (currentPage) => {
    const pageSize = 16
    const results = await fetch(`/api/v1/noticias/${currentPage}/${pageSize}`)

    if (!results.ok) {
        messageError('remove')
        return
    } else {
        messageError('add')
    }

    const data = await results.json()

    const news = data.newsForPage
    const totalPages = data.totalPages

    return {
        news,
        totalPages
    }
}

document.addEventListener('DOMContentLoaded', async () => {
    const currentPage = getCurrentPage()
    const data = await getNewsApi(currentPage)
    
    setPaginationEvents()
    createTemplate(data.news)
})