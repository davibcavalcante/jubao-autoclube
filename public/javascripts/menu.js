const initMenuElements = () => {
    const button = document.querySelector('.menu-hamburguer')
    const menu = document.querySelector('.pages-list')

    button.addEventListener('click', () => {
        menu.classList.toggle('active')
    })
}

initMenuElements()