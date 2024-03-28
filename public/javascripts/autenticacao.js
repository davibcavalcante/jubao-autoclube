// FUNCTION THAT TAKES DOM ELEMENTS
const getElements = () => {
    return {
        formWrapper: document.querySelector('#form-wrapper'),
        loggedWrapper: document.querySelector('#logged-wrapper')
    }
}

// FUNCTION THAT SETS LOGGED OUT MODE
const loggedOut = () => {
    const elements = getElements()

    if (!elements.loggedWrapper.classList.contains('hidden')) {
        elements.loggedWrapper.classList.add('hidden')
    }

    if (elements.formWrapper.classList.contains('hidden')) {
        elements.formWrapper.classList.remove('hidden')
    }
}

// FUNCTION THAT SETS LOGGED IN MODE
const loggedIn = () => {
    const elements = getElements()

    if (!elements.formWrapper.classList.contains('hidden')) {
        elements.formWrapper.classList.add('hidden')
    }

    if (elements.loggedWrapper.classList.contains('hidden')) {
        elements.loggedWrapper.classList.remove('hidden')
    }
}

// FUNCTION THAT CHECK IF SESSION IS VALID
const checkSession = async () => {
    const isAdmin = await fetch(`/api/v1/autenticacao`)

    if (isAdmin.ok) {
        loggedIn()
    } else {
        loggedOut()
    }
}

// CODE INICIALIZATION EVENT
window.addEventListener('load', checkSession)