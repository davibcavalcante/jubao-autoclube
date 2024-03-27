// FUNCTION THAT SHOWS ERROR MESSAGE
const errorMessage = (method) => {
    const showsErrorMessageContainer = document.querySelector('.message-error-container')
    if (method === 'remove') {
        showsErrorMessageContainer.classList.remove('hidden')
    } else if (method == 'add' && showsErrorMessageContainer.classList.contains('messa-error-container')){
        showsErrorMessageContainer.classList.add('hidden')
    }
}

// FUNCTION THAT SET NEWS IFRAMES
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

// FUNCTION THAT DEFINES NEWS IMAGE
const setImage = (news) => {
    const image = document.createElement('img')
    image.src = news.imagem
    
    if (news.externa === 'n') {
        image.addEventListener('click', () => {
            setIframe(news)
        })
    }

    return image
}

// FUNCTION THAT DEFINES NEWS LINK
const setLink = (news, type) => {
    const link = document.createElement('a')
    link.classList.add('info')
    if (type === 'external') {
        link.href = news.link
        link.rel = 'external'
        link.target = '_blank'

        link.innerHTML = `
            <p><i class="fa-regular fa-clock"></i> ${news.data}</p>
            <h1>${news.titulo}</h1>
        ` 
        return link
    } else if (type === 'local') {
        link.innerHTML = `
            <p><i class="fa-regular fa-clock"></i> ${news.data}</p>
            <h1>${news.titulo}</h1>
        `

        link.addEventListener('click', () => {
            setIframe(news)
        })
        return link
    }
}

// FUNCTION THAT CREATES NEWS
const createNews = (news) => {
    const newsContainer = document.createElement('section')
    newsContainer.classList.add('news')

    if (news.externa === 'y') {
        newsContainer.appendChild(setImage(news))
        newsContainer.appendChild(setLink(news, 'external'))
    } else {
        newsContainer.appendChild(setImage(news))
        newsContainer.appendChild(setLink(news, 'local'))
        newsContainer.classList.add('jubao-news')
    }

    return newsContainer
}

// FUNCTION THAT CREATES NEWS TEMPLATE
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

// FUNCTION THAT UPDATES PAGES
const updatePage = async (goTo) => {
    const pageScreen = document.querySelector('.page')
    let pageNumber = Number(pageScreen.innerText)

    const currentNewsData = await organizeNewsByPage(pageNumber, 16)
    const totalPages = currentNewsData.totalPages

    if (goTo === 'next') {
        if (pageNumber + 1 > totalPages) return
        pageNumber++
        const data = await organizeNewsByPage(pageNumber, 16)
        pageScreen.innerText = pageNumber
        createTemplate(data.news, true)
    } else if (goTo === 'prev') {
        if (!(pageNumber > 1)) return
        pageNumber--
        const data = await organizeNewsByPage(pageNumber, 16)
        pageScreen.innerText = pageNumber
        createTemplate(data.news, true)
    }
}

// FUNCTION THAT TAKES CURRENT PAGE
const getCurrentPage = () => {
    const pageStr = document.querySelector('.page').innerText
    return pageStr
}

// FUNCTION THAT DEFINES PAGINATION EVENTS
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

const getTotalNews = async () => {
    const result = await fetch('/api/v1/database/noticias/count')
    const data = await result.json()

    return data.results[0].total
}

const getNewsPerPage = async (currentPage, pageSize) => {
    const limit = (currentPage - 1) * pageSize

    const results = await fetch(`/api/v1/database/noticias/index?limit=${limit}&pagesize=${pageSize}`)
    const data = await results.json()

    return data.results
}

const organizeNewsByPage = async (currentPage, pageSize) => {
    const news = await getNewsPerPage(currentPage, pageSize)

    const totalNews = await getTotalNews()

    const totalPages = Math.ceil(totalNews / pageSize)

    return { news, totalPages }
}

// CODE INICIALIZATION EVENT
window.addEventListener('load', async () => {
    const strCurrentPage = getCurrentPage()
    const currentPage = parseInt(strCurrentPage)
    const data = await organizeNewsByPage(currentPage, 16)

    setPaginationEvents()
    createTemplate(data.news)
})