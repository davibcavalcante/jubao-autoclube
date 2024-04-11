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
const setIframe = async(newsData) => {

    const formatText = () => {
        const separateText = newsData.texto.split('[PARAGRAFO]')
        const textInParagraph = separateText.map(item => `<p>${item}</p>`)

        let texto = ''

        textInParagraph.forEach((item) => {
            if (item !== '<p></p>') texto += item
        })

        return texto
    }

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
                <p><i class="fa-regular fa-clock"></i> ${newsData.data}</p>
                    <h1>${newsData.titulo}</h1>
                    <h2>${newsData.subtitulo}</h2>
                </section>
            
                <section class="news-container">
                    <section class=image-container>
                        <img src="${newsData.imagem}"></img>
                        <p>${newsData.jornalista}</p>
                        <p>${newsData.fonte}</p>
                    </section>
                    <section class="text-container">
                        ${formatText()}
                    </section>
                </section>

                <section class="credits-container">
                    <p>${newsData.jornalista}</p>
                    <p>${newsData.fonte}</p>
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

const loadingAnimation = (start) => {
    const loading = document.querySelector('.loading-animation')
    if (start) {
        loading.classList.remove('hidden')
    } else {
        loading.classList.add('hidden')
    }
}

// FUNCTION THAT CONTROLS NEWS STATE
const newsState = () => {
    let news = []
    let totalPages = []

    const getNewsState = () => {
        return { news, totalPages }
    }

    const setNewsState = (setNews, setTotalPages) => {
        news = setNews
        totalPages = setTotalPages
    }
    
    return { getNewsState, setNewsState }
}

const newsStateManager = newsState()

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
    loadingAnimation(false)
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

    const totalPages = newsStateManager.getNewsState().totalPages

    if ((goTo === 'next' && (pageNumber + 1) > totalPages) || (goTo === 'prev' && pageNumber <= 1)) return

    if (goTo === 'next' && (pageNumber + 1) <= totalPages) pageNumber++

    if (goTo === 'prev' && pageNumber > 1) pageNumber--

    loadingAnimation(true)

    document.querySelector('#news-container').innerHTML = ''
    const iframe = document.querySelector('#news-iframe')

    !iframe.classList.contains('hidden') ? iframe.classList.add('hidden') : null
    pageScreen.innerText = pageNumber
    
    await getNewsPerPage(pageNumber, 16)
    const news = newsStateManager.getNewsState().news

    createTemplate(news, true)
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
    const limitNews = (currentPage - 1) * pageSize

    const results = await fetch(`/api/v1/database/noticias?limit=${limitNews}&pagesize=${pageSize}&cache=cache`)
    const data = await results.json()

    const totalNews = data.totalNews[0].total
    const totalPages = Math.ceil(totalNews / pageSize)

    const news = data.news

    newsStateManager.setNewsState(news, totalPages)
}

// CODE INICIALIZATION EVENT
window.addEventListener('load', async () => {
    const currentPage = parseInt(getCurrentPage())

    await getNewsPerPage(currentPage, 16)

    const news = newsStateManager.getNewsState().news

    setPaginationEvents()
    createTemplate(news)
})