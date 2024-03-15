// FUNCTION THAT SENDS THE FORM DATA
const sendData = async (formData) => {
    const result = await fetch('/api/v1/login', {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        }
    })

    const data = await result.json()
    const token = data.token

    localStorage.setItem('token', token)
}

const goToUpdateNews = async () => {
    const token = localStorage.getItem('token')
    const result = await fetch('/atualizar-noticias/1', {
        method: 'GET',
        headers: {
            Authorization: token,
        }
    })

    console.log(result)
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

    // UPDATE NEW BUTTON EVENTS
    const updateNewsButton = document.querySelector('#update-news-btn')
    updateNewsButton.addEventListener('click', goToUpdateNews)
}

// CODE INICIALIZATION EVENT
window.addEventListener('load', () => {
    setEvents()
})