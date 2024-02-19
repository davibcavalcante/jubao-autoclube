const initInfoElements = () => {
    const infoButton = document.querySelector('#info-btn')
    const moreInfo = document.querySelector('.more-info')

    infoButton.addEventListener('click', () => {
        moreInfo.classList.toggle('active')
        infoButton.classList.toggle('active')
    })
}

initInfoElements()