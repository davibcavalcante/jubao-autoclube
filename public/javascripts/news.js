document.addEventListener('DOMContentLoaded', () => {
    const linkNews = document.querySelector('#link-news')

    linkNews.addEventListener('click', (e) => {
        e.preventDefault()
        const targetElement = document.querySelector('#news-container')
        const options = {
            top: targetElement.offsetTop,
            behavior: 'smooth'
        }
        if (targetElement) {
            window.scrollTo(options)
        }
    })
})