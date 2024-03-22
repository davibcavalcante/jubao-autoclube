const disableAdminMode = () => {
    const optionAdmin = document.querySelector('.option-admin')
    if (optionAdmin) optionAdmin.remove()
}

const createNewLink = () => {
    const linkNewsManager = document.createElement('a')
    linkNewsManager.href = '/admin/gerenciar-noticias'
    linkNewsManager.rel = 'next'
    linkNewsManager.target = '_self'
    linkNewsManager.innerText = 'Gerenciar Notícias'

    return linkNewsManager
}

const setAdminMode = () => {
    const pagesList = document.querySelector('.pages-list')
    const items = pagesList.querySelectorAll('li')

    const lastIndex = items.length - 1

    const newLi = document.createElement('li')
    newLi.classList.add('option-admin')

    const newLink = createNewLink()
    newLi.appendChild(newLink)

    items[lastIndex].insertAdjacentElement('afterend', newLi)
}

// FUNCTION THAT CHECK IF SESSION IS VALID
const checkSession = async () => {
    const result = await fetch('/api/v1/autenticacao')
    if (result.status !== 200 && window.location.href.includes('admin')) {
        return window.location.href = '/'
    }
    
    if (result.ok) {
        setAdminMode()
    } else {
        disableAdminMode()
    }
}

// CODE INICIALIZATION EVENT
window.addEventListener('DOMContentLoaded', checkSession)