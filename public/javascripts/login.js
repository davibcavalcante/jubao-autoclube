const showsLoginStatusMessage = () => {
    document.querySelector('body').classList.add('opacity')
    document.querySelector('#form-wrapper').classList.add('hidden')
    document.querySelector('#message-wrapper').classList.remove('hidden')
}

const centerVertically = (element) => {
    const windowHeight = window.innerHeight
    const scrollY = window.scrollY || window.pageYOffset
    const elementHeight = element.offsetHeight
    const topOffset = (windowHeight - elementHeight) / 2 + scrollY
    element.style.top = `${topOffset}px`
    showsLoginStatusMessage()
}

const setStatusMessageItems = (successLogin, message) => {
    const icon = document.querySelector('#icon-img')
    const status = document.querySelector('#status-msg')
    const link = document.querySelector('#link-msg')

    if (successLogin) {
        icon.src = '/imagens/mobile/checked.png'
        link.href = '/admin'
        link.innerText = 'OK'
    } else {
        icon.src = '/imagens/mobile/cancel.png'
        link.href = '/login'
        link.innerText = 'Tentar Novamente!'
    }
    status.innerText = message

    const container = document.querySelector('#message-wrapper')
    centerVertically(container)
}

// FUNCTION THAT SENDS THE FORM DATA
const sendData = async (formData) => {
    document.querySelector('#submit-btn').classList.add('hidden')
    document.querySelector('#loading').classList.remove('hidden')
    
    const result = await fetch('/api/v1/login', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })

    if (result.status !== 200) {
        const data = await result.json()
        return setStatusMessageItems(false, data.message)
    }

    const data = await result.json() // user => data.user
    setStatusMessageItems(true, data.message)
}

// FUNCTION THAT DEFINES EVENTS
const setEvents = () => {
    // FORM EVENTS
    const form = document.querySelector('#form')
    form.addEventListener('submit', (e) => {
        e.preventDefault()

        const formData = {
            user: form.user.value,
            pass: form.password.value
        }
        sendData(formData)
    })
} 

// CODE INICIALIZATION EVENT
window.addEventListener('load', () => {
    setEvents()
})