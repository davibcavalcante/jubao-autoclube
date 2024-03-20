// FUNCTION THAT GET ELEMENTS BY DOM
const getElements = () => {
    return {
        titleInput: document.querySelector('#title-input'),
        imageButton: document.querySelector('#image-check-btn'),
        dayInput: document.querySelector('#day-input'),
        monthSelect: document.querySelector('#month-select'),
        yearInput: document.querySelector('#year-input'),
        externalSelect: document.querySelector('#external-select'),
        linkInput: document.querySelector('#link-input'),
    }
}

// FUNCTION THAT CENTEALIZES VERTICALLY
const centerVertically = (element) => {
    const windowHeight = window.innerHeight
    const scrollY = window.scrollY || window.pageYOffset
    const elementHeight = element.offsetHeight
    const topOffset = (windowHeight - elementHeight) / 2 + scrollY
    element.style.top = `${topOffset}px`
    element.classList.remove('hidden')
}

// FUNCTION THAT CONTROLS ON MESSAGE STATE
const showsMessageStateOn = () => {
    document.querySelector('body').classList.add('opacity')
    document.querySelector('#form-wrapper').classList.add('hidden')
    document.querySelector('#preview-wrapper').classList.add('hidden')
    document.querySelector('#message-wrapper').classList.remove('hidden')
}

// FUNCTION THAT CONTROLS OFF MESSAGE STATE
const showsMessageStateOff = (e) => {
    e.preventDefault()
    document.querySelector('body').classList.remove('opacity')
    document.querySelector('#form-wrapper').classList.remove('hidden')
    document.querySelector('#preview-wrapper').classList.remove('hidden')
    document.querySelector('#message-wrapper').classList.add('hidden')
}

// FUNCTION THAT SHOWS STATUS MESSAGE
const showsStatusMessage = (results) => {
    showsMessageStateOn()
    const icon = document.querySelector('#icon-img')
    const status = document.querySelector('#status-msg')
    const link = document.querySelector('#link-msg')

    if (link.classList.contains('listening-click')) {
        link.classList.remove('listening-click')
        link.removeEventListener('click', showsMessageStateOff)
    }

    if (results.ok) {
        icon.src = '/imagens/mobile/checked.png'
        link.href = '/atualizar-noticias'
        link.innerText = 'OK'
    } else {
        icon.src = '/imagens/mobile/cancel.png'
        link.href = '#'
        link.addEventListener('click', showsMessageStateOff)
        link.classList.add('listening-click')
        link.innerText = 'Voltar'
    }
    status.innerText = results.message

    const messageContainer = document.querySelector('#message-wrapper')
    centerVertically(messageContainer)
}

// FUNCTION THAT UPDATES PREVIEW SCREEN
const updatePreview = (e) => {
    let target = e.target

    if (target.classList.contains('fa-check')) {
        target = target.parentNode 
    }

    const elementId = target.id.split('-')[0]
    const elementPreview = document.querySelector(`#${elementId}-preview`)

    if (elementId === 'image') {
        elementPreview.src = document.querySelector('#image-input').value
    } else if (elementId === 'title') {
        elementPreview.innerText = target.value
    } else if (elementId === 'day' || elementId === 'month' || elementId === 'year') {
        const dateContent = `<i class="fa-regular fa-clock"></i> ${document.querySelector('#day-input').value} ${document.querySelector('#month-select').value} ${document.querySelector('#year-input').value}`

        document.querySelector('#date-preview').innerHTML = dateContent
    }
}

// FUNCTION THAT FORMATTES NUMBERS LESS THAN 10
const formatNumber = (number) => {
    if (number < 10) return `0${number}`

    return number
}

// FUNCTION THAT FORMAT INPUTS
const formatInputNumbersOnly = (e) => {
    const input = e.target
    input.value = input.value.replace(/\D/g, '')
    updatePreview(e)
}

// FUNCTION THAT VALIDATES FORM DATA
const validateForm = () => {
    const elements = getElements()
    const externalValue = elements.externalSelect.value
    const monthValue = elements.monthSelect.value
    const linkValue = elements.linkInput.value

    if (Number(elements.dayInput.value) > 31 || Number(elements.dayInput.value) < 1) {
        return {
            ok: false, message: 'Dia inválido, tente um valor entre 01 e 31.'
        }
    } 

    if (elements.yearInput.value.length !== 4) {
        return {
            ok: false, message: 'O ano da notícia deve conter exatamente 4 caractéres. Exemplo: 2024'
        }
    }

    if (externalValue === '') {
        return {
            ok: false, message: 'Não é possível atualizar a notícia sem especificar se é ou não uma notícia externa'
        }
    }

    if (monthValue === '') {
        return {
            ok: false, message: 'Não é possível atualizar a notícia sem o mês!'
        }
    }

    if (externalValue === 'y' && linkValue === '') {
        return {
            ok: false, message: 'Notícias externas devem conter seu link de origem!'
        }
    }

    if (externalValue === 'n' && linkValue.length > 0) {
        return {
            ok: false, message: 'Notícias locais não devem conter links!'
        }
    }

    return { ok: true, message: 'Notícia enviada com sucesso!' }
}

// FUNCTION THAT SEND FORM DATA
const sendData = async (formData, checkDataResults) => {
    const result = await fetch('/api/v1/database/noticias', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        credentials: 'include',
        body: JSON.stringify(formData)
    })

    if (!result.status === 200) {
        return showsMessageStateOff({ ok: false, message: 'Não foi possível enviar a sua notícia, tente novamente mais tarde!'})
    }

    showsStatusMessage(checkDataResults)
}

// FUNCTION THAT SUBMIT THE FORM
const submitForm = (e, form) => {
    e.preventDefault()

    const formIsValid = validateForm()

    if (!formIsValid.ok) {
        return showsStatusMessage(formIsValid)
    }

    const date = `${formatNumber(form.day.value)} ${form.month.value} ${form.year.value}`

    const formData = {
        id: '',
        titulo: form.title.value,
        data: date,
        imagem: form.image.value,
        link: form.link.value,
        externa: form.external.value,
    }

    sendData(formData, formIsValid)
}

// FUNCTION THAT SET EVENTS
const setEvents = () => {
    // PREVIEW EVENTS
    const elements = getElements()
    elements.titleInput.addEventListener('input', updatePreview)
    elements.dayInput.addEventListener('input', formatInputNumbersOnly)
    elements.yearInput.addEventListener('input', formatInputNumbersOnly)
    elements.imageButton.addEventListener('click', updatePreview)
    elements.monthSelect.addEventListener('change', updatePreview)

    document.querySelector('.fa-check').addEventListener('click', updatePreview)

    // FORM EVENTS
    const form = document.querySelector('#form')
    form.addEventListener('submit', (e) => {
        submitForm(e, form)
    })
}

window.addEventListener('load', () => {
    setEvents()
})