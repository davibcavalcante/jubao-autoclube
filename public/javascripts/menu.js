// FUNCTION THAT DEFINES MENU EVENTS
const initMenuElements = () => {
    const button = document.querySelector('.menu-hamburguer')
    const menu = document.querySelector('.pages-list')

    button.addEventListener('click', () => {
        menu.classList.toggle('active')
    })
}

// CODE INICIALIZATION EVENT
window.addEventListener('load', () => {
    initMenuElements()
})