const setIframe = async(news) => {
    const response = await fetch(`/api/v1//local-news-data/${news.title}`)
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
    image.addEventListener('click', () => {
        setIframe(news)
    })

    return image
}

const setLink = (news) => {
    const link = document.createElement('a')
    link.classList.add('info')
    if (news.external) {
        link.href = news.external
        link.rel = 'external'
        link.target = '_blank'

        link.innerHTML = `
            <p><i class="fa-regular fa-clock"></i> ${news.date}</p>
            <h1>${news.title}</h1>
        ` 
        return link
    } else {
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

    newsContainer.appendChild(setImage(news))
    newsContainer.appendChild(setLink(news))

    return newsContainer
}

const updateNewsContainer = (news) => {
    const allNewsContainer = document.querySelector('#news-container')

    allNewsContainer.appendChild(createNews(news))
}

const createTemplate = (allNews) => {
    allNews.forEach((news) => {
        updateNewsContainer(news)
    })
}


const getAllNews = async() => {
    const result = await fetch('/api/v1/news-data')
    const allNews = await result.json()
    createTemplate(allNews)
}

getAllNews()