// FUNCTION THAT GET ELEMENTS BY DOM
const getElements = () => {
    return {
        add: {
            titleInput: document.querySelector('#title-add-input'),
            linkInput: document.querySelector('#link-add-input'),
            dayInput: document.querySelector('#day-add-input'),
            yearInput: document.querySelector('#year-add-input'),
            subtitleInput: document.querySelector('#subtitle-add-input'),
            newscasterInput: document.querySelector('#newscaster-add-input'),
            fromInput: document.querySelector('#from-add-input'),
            externalSelect: document.querySelector('#external-add-select'),
            monthSelect: document.querySelector('#month-add-select'),
            imageButton: document.querySelector('#image-add-check-btn'),
            addParagraphsButton: document.querySelector('#add-paragraphs-btn'),
            removeParagraphsButton: document.querySelector('#remove-paragraphs-btn'),
            pTextareas: document.querySelectorAll('.p-textarea'),
        },

        update: {
            titleInput: document.querySelector('#title-update-input'),
            dayInput: document.querySelector('#day-update-input'),
            yearInput: document.querySelector('#year-update-input'),
            linkInput: document.querySelector('#link-update-input'),
            imageInput: document.querySelector('#image-update-input'),
            subtitleInput: document.querySelector('#subtitle-update-input'),
            newscasterInput: document.querySelector('#newscaster-update-input'),
            fromInput: document.querySelector('#from-update-input'),
            monthSelect: document.querySelector('#month-update-select'),
            externalSelect: document.querySelector('#external-update-select'),
            actionSelect: document.querySelector('#action-select'),
            imageButton: document.querySelector('#image-update-check-btn'),
            refreshNewsButton: document.querySelector('#refresh-news-btn'),
            addParagraphsButton: document.querySelector('#add-up-paragraphs-btn'),
            removeParagraphsButton: document.querySelector('#remove-paragraphs-btn'),
            pTextareas: document.querySelectorAll('.p-update-textarea'),
        },

        delete: {
            confirmRemoveInput: document.querySelector('#confirm-input'),
            newsSelectedImage: document.querySelector('#image-selected-preview'),
            newsSelectedTitle: document.querySelector('#title-selected-preview'),
            newsSelectedDate: document.querySelector('#date-selected-preview'),
            deleteNewsButton: document.querySelector('#delete-news-btn')
        }
    }
}

const scrollYState = () => {
    let scrollY

    const getScrollY = () => {
        return scrollY
    }

    const setScrollY = (newScrollY) => {
        scrollY = newScrollY
    }

    return { getScrollY, setScrollY }
}

const newsUpdateState = () => {
    let savedState = {}

    const getNewsState = (currentState) => {     
        let changedState = { newData: {} }
        for (let key in currentState) {
            if (currentState[key] !== savedState[key]) {
                changedState.newData[key] = currentState[key]
            }
        }
        return changedState
    }

    const setNewsState = (currentState) => {
        for (let key in currentState) {
            savedState[key] = currentState[key]
        }
    }

    return { getNewsState, setNewsState }
}

const currentNewsDataState = () => {
    let savedNewsData = {}

    const getOldData = (id) => {
        if  (savedNewsData.id === id) return savedNewsData.data
    }

    const setCurrentData = (id, data) => {
        savedNewsData.id = id
        savedNewsData.data = data
    }

    return { getOldData, setCurrentData }
}

const newsDataStateManager = currentNewsDataState()
const newsUpdateStateManager = newsUpdateState()
const scrollYManager = scrollYState()

// FUNCTION THAT CONTROLS ON MESSAGE STATE
const showsMessageStateOn = () => {
    document.querySelector('body').classList.add('opacity')
    document.querySelector('.add-news-container').classList.add('hidden')
    document.querySelector('.updel-news-container').classList.add('hidden')
    document.querySelector('#message-wrapper').classList.remove('hidden')
}

// FUNCTION THAT CONTROLS OFF MESSAGE STATE
const showsMessageStateOff = (e) => {
    e.preventDefault()
    const scrollY = scrollYManager.getScrollY()

    document.querySelector('body').classList.remove('opacity')
    document.querySelector('.add-news-container').classList.remove('hidden')
    document.querySelector('.updel-news-container').classList.remove('hidden')
    document.querySelector('#message-wrapper').classList.add('hidden')

    window.scrollTo({ top: scrollY, behavior: 'smooth' })
}

const centerVertically = (element) => {
    const windowHeight = window.innerHeight;
    const elementHeight = element.offsetHeight;
    const topOffset = (windowHeight - elementHeight) / 2;
    element.style.top = `${topOffset}px`;
    window.scrollTo({ top: 0, behavior: 'smooth' })
}

// FUNCTION THAT SHOWS STATUS MESSAGE
const showsStatusMessage = (results) => {
    scrollYManager.setScrollY(window.scrollY)
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
        link.innerText = 'OK'
    } else {
        icon.src = '/imagens/mobile/cancel.png'
        link.innerText = 'Voltar'
    }
    status.innerText = results.message
    link.addEventListener('click', showsMessageStateOff)
    link.classList.add('listening-click')

    const messageContainer = document.querySelector('#message-wrapper')
    centerVertically(messageContainer)
}

const resetAddPreview = () => {
    document.querySelector(`#title-add-preview`).innerText = 'Seu título aqui'
    document.querySelector('#image-add-preview').src = '/imagens/mobile/imagem-noticias-default.png'
    document.querySelector('#date-add-preview').innerHTML = '<i class="fa-regular fa-clock"></i> 20 DEZEMBRO 2024'
}

// FUNCTION THAT UPDATES PREVIEW SCREEN
const updateUpPreview = (e) => {
    const elements = getElements().update

    let target = e.target
    if (target.classList.contains('fa-check')) {
        target = target.parentNode 
    }

    const currentNews = document.querySelector('.news-selected') || undefined

    if (!currentNews) return

    const id = currentNews.id.split('-')[1]
    const elementId = target.id.split('-')[0]
    const elementPreview = document.querySelector(`#${elementId}-preview-${id}`)

    if (elementId === 'image') {
        elementPreview.src = document.querySelector('#image-update-input').value
    } else if (elementId === 'title') {
        elementPreview.innerText = target.value
    } else if (elementId === 'day' || elementId === 'month' || elementId === 'year') {
        const dateContent = `
            <i class="fa-regular fa-clock"></i> 
            ${elements.dayInput.value} ${elements.monthSelect.value} ${elements.yearInput.value}
        `

        document.querySelector(`#date-preview-${id}`).innerHTML = dateContent
    }
}

const updateAddPreview = (e) => {
    const elements = getElements().add

    let target = e.target
    if (target.classList.contains('fa-check')) {
        target = target.parentNode 
    }

    const elementId = target.id.split('-')[0]
    const elementPreview = document.querySelector(`#${elementId}-add-preview`)

    if (elementId === 'image') {
        elementPreview.src = document.querySelector('#image-add-input').value
    } else if (elementId === 'title') {
        elementPreview.innerText = target.value
    } else if (elementId === 'day' || elementId === 'month' || elementId === 'year') {
        const dateContent = `
            <i class="fa-regular fa-clock"></i> 
            ${elements.dayInput.value} ${elements.monthSelect.value} ${elements.yearInput.value}
        `

        document.querySelector('#date-add-preview').innerHTML = dateContent
    }
}

const resetUpdateForm = () => {
    const elements = getElements().update

    elements.titleInput.value = ''
    elements.imageInput.value = ''
    elements.linkInput.value = ''
    elements.dayInput.value = ''
    elements.monthSelect.value = ''
    elements.yearInput.value = ''
    elements.externalSelect.value = ''
}

const resetUpdateParagraphs = () => {
    const elements = getElements().update

    elements.pTextareas.forEach(item => {
        if (item.id !== 'text1-update-textarea') {
            item.parentNode.remove()
        }
    })
}

const createNewParagraph = (id, section, value = false) => {
    const inputContainer = document.createElement('section')
    inputContainer.classList.add('input-container')

    const label = document.createElement('label')
    label.setAttribute('for', `text${id}-${section}-textarea`)
    label.innerText = `Parágrafo ${id}:`

    const textarea = document.createElement('textarea')
    textarea.id = `text${id}-${section}-textarea`
    section === 'add' ? textarea.classList.add('p-textarea') : textarea.classList.add('p-update-textarea')
    textarea.name = `text${id}`
    textarea.rows = 10
    textarea.cols = 30
    textarea.placeholder = 'O seu parágrafo aqui'

    if (value) textarea.value = value

    inputContainer.appendChild(label)
    inputContainer.appendChild(textarea)

    return inputContainer
}

const addNewParagraph = () => {
    const textContainer = document.querySelector('#text-form-add-container')
    const paragraphs = textContainer.querySelectorAll('.input-container')
    const numParagraphs = paragraphs.length

    const id = numParagraphs + 1
    const index = numParagraphs - 1

    const newParagraph = createNewParagraph(id, 'add')

    paragraphs[index].insertAdjacentElement('afterend', newParagraph)
}

const removeParagraph = () => {
    const textContainer = document.querySelector('#text-form-add-container')
    const paragraphs = textContainer.querySelectorAll('.input-container')
    const numParagraphs = paragraphs.length

    if (numParagraphs <= 1) return

    const index = numParagraphs - 1

    paragraphs[index].remove()
}

const setNewsTypeMode = (e) => {
    const localNewsOptions = document.querySelector('#local-options-container')
    const selectValue = e.target.value

    if (selectValue === 'y' && !localNewsOptions.classList.contains('hidden')) {
        localNewsOptions.classList.add('hidden')
    } else if (selectValue === 'n' && localNewsOptions.classList.contains('hidden')) {
        localNewsOptions.classList.remove('hidden')
    }
}

// FUNCTION THAT FORMATTES NUMBERS LESS THAN 10
const formatNumber = (number) => {
    if (number < 10 && number.length < 2) return `0${number}`

    return number
}

// FUNCTION THAT FORMAT INPUTS
const formatInputNumbersOnly = (e) => {
    const input = e.target
    const elementId = input.id.split('-')[1]
    input.value = input.value.replace(/\D/g, '')

    if (elementId === 'add') {
        updateAddPreview(e)
    } else if (elementId === 'update') {
        updateUpPreview(e)
    }
}

const deleteMode = (newsSelected) => {
    const elements = getElements().delete
    if (newsSelected) {
        const elementId = newsSelected.id.split('-')[1]

        const imageElement = document.querySelector(`#image-preview-${elementId}`).src
        const titleElement = document.querySelector(`#title-preview-${elementId}`).innerText
        const dateElement = document.querySelector(`#date-preview-${elementId}`).innerHTML
        
        elements.newsSelectedImage.src = imageElement
        elements.newsSelectedTitle.innerText = titleElement
        elements.newsSelectedDate.innerHTML = dateElement
    } else {
        elements.newsSelectedImage.src = ''
        elements.newsSelectedTitle.innerText = ''
        elements.newsSelectedDate.innerHTML = ''
    }
}

const updateMode = (newsSelected) => {
    resetUpdateParagraphs()
    const elements = getElements().update
    const newsId = newsSelected.id.split('-')[1]

    const newsTitle = document.querySelector(`#title-preview-${newsId}`).innerText
    const newsImage = document.querySelector(`#image-preview-${newsId}`).src
    const newsLink = document.querySelector(`#link-preview-${newsId}`).innerText
    const newsDay = document.querySelector(`#date-preview-${newsId}`).innerText.split(' ')[1]
    const newsMonth = document.querySelector(`#date-preview-${newsId}`).innerText.split(' ')[2]
    const newsYear = document.querySelector(`#date-preview-${newsId}`).innerText.split(' ')[3]

    const newsSubtitle = document.querySelector(`#subtitle-preview-${newsId}`) || ''
    const newsNewscaster = document.querySelector(`#newscaster-preview-${newsId}`) || ''
    const newsFrom = document.querySelector(`#from-preview-${newsId}`) || ''
    const newsText = document.querySelector(`#text-preview-${newsId}`) || ''

    elements.titleInput.value = newsTitle
    elements.imageInput.value = newsImage
    elements.linkInput.value = newsLink
    elements.dayInput.value = newsDay
    elements.monthSelect.value = newsMonth
    elements.yearInput.value = newsYear

    newsLink.length > 0 ? elements.externalSelect.value = 'y' : elements.externalSelect.value = 'n'
    
    const localUpdateOptions = document.querySelector('#local-update-options-container')

    if (elements.externalSelect.value === 'n') {
        if (localUpdateOptions.classList.contains('hidden')) {
            localUpdateOptions.classList.remove('hidden')
        }

        const separateText = newsText.innerText.split('[PARAGRAFO]')
        console.log(separateText)
        const textUpdateContainer = document.querySelector('#text-form-update-container')

        separateText.forEach((item, index) => {
            const inputContainers = textUpdateContainer.querySelectorAll('.input-container')

            if (index !== 0) {
                const lastIndex = inputContainers.length - 1
                const id = index + 1
                const newInputContainer = createNewParagraph(id, 'update', separateText[index])

                inputContainers[lastIndex].insertAdjacentElement('afterend', newInputContainer)
            }

            inputContainers[0].querySelector('#text1-update-textarea').value = separateText[0]
        })

        elements.subtitleInput.value = newsSubtitle.innerText
        elements.newscasterInput.value = newsNewscaster.innerText
        elements.fromInput.value = newsFrom.innerText
        
    } else if (elements.externalSelect.value === 'y') {
        if (!localUpdateOptions.classList.contains('hidden')) {
            localUpdateOptions.classList.add('hidden')
        }
    }

    newsUpdateStateManager.setNewsState({
        titulo: newsTitle, 
        data: `${newsDay} ${newsMonth} ${newsYear}`,  
        imagem: newsImage, 
        link: newsLink, 
        externa: elements.externalSelect.value,
        subtitulo: newsSubtitle.innerText,
        jornalista: newsNewscaster.innerText,
        fonte: newsFrom.innerText,
        texto: newsText.innerText
    })
}

// FUNCTION THAT SETS CURRENT UPDATE OR DELET MODE
const setCurrentMode = (e) => {
    const newsIsSelected = document.querySelector('.news-selected')
    const mode = e.target.value

    const updateContainer = document.querySelector('.update-informations-container')
    const deleteContainer = document.querySelector('.delete-informations-container')

    if (mode === 'put') {
        if (!deleteContainer.classList.contains('hidden')) {
            deleteContainer.classList.add('hidden')
            updateContainer.classList.remove('hidden')
        } else {
            updateContainer.classList.remove('hidden')
        }
        if (newsIsSelected) updateMode(newsIsSelected)
    } else if (mode === 'delete') {
        if (!updateContainer.classList.contains('hidden')) {
            updateContainer.classList.add('hidden')
            deleteContainer.classList.remove('hidden')
        } else {
            deleteContainer.classList.remove('hidden')
        }
        if (newsIsSelected) deleteMode(newsIsSelected)
    }
}

const selectNews = (container)  => {
    const newsSelected = document.querySelector('.news-selected')
    const actionValue = document.querySelector('#action-select').value

    const containerId = container.id.split('-')[1]
    const data = {
        title: document.querySelector(`#title-preview-${containerId}`).innerText,
        image: document.querySelector(`#image-preview-${containerId}`).src,
        date: document.querySelector(`#date-preview-${containerId}`).innerHTML
    }

    if (!newsSelected) {
        container.classList.add('news-selected')
        newsDataStateManager.setCurrentData(containerId, data)

        if (actionValue === 'put') {
            updateMode(container)
        } else if (actionValue === 'delete') {
            deleteMode(container)
        }
    } else if (newsSelected === container) {
        newsSelected.classList.remove('news-selected')
        resetUpdateForm()
    } else {
        newsSelected.classList.remove('news-selected')
        container.classList.add('news-selected')
        const oldNewsId = newsSelected.id.split('-')[1]
        const oldData = newsDataStateManager.getOldData(oldNewsId)

        document.querySelector(`#title-preview-${oldNewsId}`).innerText = oldData.title
        document.querySelector(`#image-preview-${oldNewsId}`).src = oldData.image
        document.querySelector(`#date-preview-${oldNewsId}`).innerHTML = oldData.date

        newsDataStateManager.setCurrentData(containerId, data)

        if (actionValue === 'put') {
            updateMode(container)
        } else if (actionValue === 'delete') {
            deleteMode(container)
        }
    }
}

// FUNCTION THAT VALIDATES FORM DATA
const validateForm = (method) => {
    let elements

    if (method=== 'POST') {
        elements = getElements().add
    } else if (method === 'PUT') {
        elements = getElements().update
    }

    const externalValue = elements.externalSelect.value
    const monthValue = elements.monthSelect.value
    const linkValue = elements.linkInput.value
    const subtitleValue = elements.subtitleInput.value
    const newscastersValue = elements.newscasterInput.value
    const fromValue = elements.fromInput.value
    const textareas = elements.pTextareas

    if (Number(elements.dayInput.value) > 31 || Number(elements.dayInput.value) < 1) {
        return {
            ok: false, message: 'Dia inválido, tente um valor entre 01 e 31.'
        }
    } 

    if (monthValue === '') {
        return {
            ok: false, message: 'Não é possível atualizar a notícia sem o mês!'
        }
    }

    if (elements.yearInput.value.length !== 4) {
        return {
            ok: false, message: 'O ano da notícia deve conter exatamente 4 caractéres. Exemplo: 2024'
        }
    }

    if (externalValue === '') {
        return {
            ok: false, message: 'Não é possível enviar ou atualizar a notícia sem especificar a sua fonte'
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

    if (externalValue === 'n') {
        if (subtitleValue === '') {
            return {
                ok: false, message: 'Não é possível enviar uma notícia local sem subtítulo'
            }
        }

        if (newscastersValue === '') {
            return {
                ok: false, message: 'Não é possível enviar uma notícia local sem noticiadores'
            }
        }

        if (fromValue === '') {
            return {
                ok: false, message: 'Não é possível enviar uma notícia local sem a fonte'
            }
        }


        for (let textarea of textareas) {
            if (textarea.value === '') {
                return {
                    ok: false, message: 'Você não pode enviar um notícia local com parágrafo vazio. Se necessário, exclua-o'
                }
            }
        }
        
    }

    return { ok: true, message: 'Notícia enviada com sucesso!' }
}

const deleteNews = async () => {
    const elements = getElements().delete
    const confirm = elements.confirmRemoveInput.value
    const newsToRemove = document.querySelector('.news-selected') || undefined
    const idToRemove = newsToRemove ? newsToRemove.id.split('-')[1] : undefined

    if (!newsToRemove) {
        return showsStatusMessage({ ok: false, message: 'Para remover, é necessário que tenha uma notícia selecionada!' })
    }

    if (!(confirm.toUpperCase() === 'REMOVER NOTÍCIA')) {
        return showsStatusMessage({ ok: false, message: 'Verifique o campo de confirmação para remover a notícia' })
    }

    const result = await fetch(`/api/v1/database/noticias/${idToRemove}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        credentials: 'include'
    })

    const data = await result.json()
    
    if (!result.ok) {
        return showsStatusMessage({ ok: false, message: data.message })
    }

    setNewsOnUpdelPreview()
    deleteMode()
    elements.confirmRemoveInput.value = ''
    showsStatusMessage({ ok: true, message: data.message })
}

// FUNCTION THAT SEND FORM DATA
const sendData = async (formData, method) => {
    const result = await fetch('/api/v1/database/noticias', {
        method: method,
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        credentials: 'include',
        body: JSON.stringify(formData)
    })

    if (result.status !== 200) {
        return showsStatusMessage({ ok: false, message: 'Não foi possível enviar a sua notícia, tente novamente mais tarde!'})
    }

    const data = await result.json()

    if (method === 'POST') document.querySelector('#add-form').reset()
    if (method === 'PUT') {
        document.querySelector('#update-form').reset()
        resetUpdateParagraphs()
        document.querySelector('#action-select').value = 'put'
    }
    setNewsOnUpdelPreview()
    showsStatusMessage({ ok: true, message: data.message })
}

// FUNCTION THAT SUBMIT THE FORM
const submitForm = (e, form, method) => {
    e.preventDefault()

    const elements = getElements()

    const formIsValid = validateForm(method)

    if (!formIsValid.ok) {
        return showsStatusMessage(formIsValid)
    }

    const date = `${formatNumber(form.day.value)} ${form.month.value} ${form.year.value}`

    let currentData

    if (method === 'PUT') {
        const paramGetNewsState = {
            titulo: form.title.value,
            data: date,
            imagem: form.image.value, 
            link: form.link.value, 
            externa: form.external.value,
            subtitulo: form.subtitle.value,
            jornalista: form.newscasters.value,
            fonte: form.from.value,
            texto: ``
        }

        const updateTextareas = Array.from(elements.add.pTextareas)
        const pUpdateLength = updateTextareas.length
    
        for (let i = 0; i < pUpdateLength; i++) {
            const pText = updateTextareas[i].value
            paramGetNewsState.texto += `${pText}[PARAGRAFO]`
        }

        currentData = newsUpdateStateManager.getNewsState(paramGetNewsState)
        currentData.searchData = {
            id: parseInt(document.querySelector('.news-selected').id.split('-')[1])
        }
    }

    const formData = method === 'POST' ? {
        id: '',
        titulo: form.title.value,
        data: date,
        imagem: form.image.value,
        link: form.link.value,
        externa: form.external.value,
        subtitulo: form.subtitle.value,
        jornalista: form.newscasters.value,
        fonte: form.from.value,
        texto: ``
    } : currentData

    if (method === 'POST') {
        const addTextareas = Array.from(elements.add.pTextareas)
        const pAddLength = addTextareas.length

        for (let i = 0; i < pAddLength; i++) {
            const pText = addTextareas[i].value
            formData.texto += `${pText}[PARAGRAFO]`
        }
    }

    sendData(formData, method)
}

// DOM MANIPULATION
const createLinkNews = ({link, id}) => {
    const pLink = document.createElement('p')
    pLink.innerText = link
    pLink.id = `link-preview-${id}`
    pLink.classList.add('hidden')

    return pLink
}

const createTitleNews = (title, id) => {
    const titleContainer = document.createElement('section')
    titleContainer.classList.add('title-news-updel-container')

    const hTitle = document.createElement('h1')
    hTitle.id = `title-preview-${id}`
    hTitle.innerText = title

    titleContainer.appendChild(hTitle)

    return titleContainer
}

const createDateNews = (date, id) => {
    const dateContainer = document.createElement('section')
    dateContainer.classList.add('date-news-updel-container')

    const pDate = document.createElement('p')
    pDate.id = `date-preview-${id}`
    pDate.innerHTML = `<i class="fa-regular fa-clock"></i> ${date}`

    dateContainer.appendChild(pDate)

    return dateContainer
}

const createInfoNews = ({title, date, id}) => {
    const infoContainer = document.createElement('section')
    infoContainer.classList.add('info-news-updel-container')

    infoContainer.appendChild(createDateNews(date, id))
    infoContainer.appendChild(createTitleNews(title, id))

    return infoContainer
}

const createImageNews = ({image, id}) => {
    const imageContainer = document.createElement('section')
    imageContainer.classList.add('image-news-updel-container')

    const img = document.createElement('img')
    img.id = `image-preview-${id}`
    img.src = image

    imageContainer.appendChild(img)

    return imageContainer
}

const createHiddenInfoNews = ({subtitle, newscaster, from, text, id}) => {
    const sectionHiddenInfo = document.createElement('section')
    sectionHiddenInfo.id = `information-${id}`
    sectionHiddenInfo.classList.add('hidden')

    const pSubtitle = document.createElement('p')
    pSubtitle.innerText = subtitle
    pSubtitle.id = `subtitle-preview-${id}`

    const pNewscaster = document.createElement('p')
    pNewscaster.innerText = newscaster
    pNewscaster.id = `newscaster-preview-${id}`

    const pFrom = document.createElement('p')
    pFrom.innerText = from
    pFrom.id = `from-preview-${id}`

    const pText = document.createElement('p')
    pText.innerText = text
    pText.id = `text-preview-${id}`

    sectionHiddenInfo.appendChild(pSubtitle)
    sectionHiddenInfo.appendChild(pNewscaster)
    sectionHiddenInfo.appendChild(pFrom)
    sectionHiddenInfo.appendChild(pText)

    return sectionHiddenInfo
}

const createNewsUpdelContainer = (news) => {
    const container = document.createElement('section')
    container.classList.add('news-updel-container')
    container.id = `news-${news.id}`

    container.appendChild(createImageNews({ image: news.imagem, id: news.id }))
    container.appendChild(createInfoNews({ title: news.titulo, date: news.data, id: news.id }))
    container.appendChild(createLinkNews({ link: news.link, id: news.id }))

    if (news.externa === 'n') {
        container.appendChild(createHiddenInfoNews({ 
            subtitle: news.subtitulo, 
            newscaster: news.jornalista,
            from: news.fonte,
            text: news.texto,
            id: news.id 
        }))
    }

    container.addEventListener('dblclick', () => {
        selectNews(container)
    })

    return container
}

// FUNCTION THAT GET NEWS FROM DATABASE
const getNews = async () => {
    const results = await fetch('/api/v1/database/noticias')
    const data = await results.json()

    return data.news
}

// FUNCTION THAT SETS LOADING ANIMATION
const setLoadingAnimation = (start) => {
    const loadingAnimation = document.querySelector('#refresh-news-btn')

    if (start) {
        loadingAnimation.classList.add('active')
    } else {
        loadingAnimation.classList.remove('active')
    }
}

const setNewsOnUpdelPreview = async () => {
    setLoadingAnimation(true)
    const updelContainer = document.querySelector('#parent-news-container')
    const news = await getNews()
    setLoadingAnimation(false)
    updelContainer.innerHTML = ''
    news.forEach(newsInfo => {
        updelContainer.appendChild(createNewsUpdelContainer(newsInfo))
    })
}

// FUNCTION THAT SET EVENTS
const setEvents = () => {
    // ADD PREVIEW EVENTS
    const elements = getElements()
    elements.add.titleInput.addEventListener('input', updateAddPreview)
    elements.add.dayInput.addEventListener('input', formatInputNumbersOnly)
    elements.add.yearInput.addEventListener('input', formatInputNumbersOnly)
    elements.add.imageButton.addEventListener('click', updateAddPreview)
    elements.add.monthSelect.addEventListener('change', updateAddPreview)
    elements.add.externalSelect.addEventListener('change', setNewsTypeMode)

    document.querySelector('.fa-check').addEventListener('click', updateAddPreview)

    elements.update.titleInput.addEventListener('input', updateUpPreview)
    elements.update.dayInput.addEventListener('input', formatInputNumbersOnly)
    elements.update.yearInput.addEventListener('input', formatInputNumbersOnly)
    elements.update.imageButton.addEventListener('click', updateUpPreview)
    elements.update.monthSelect.addEventListener('change', updateUpPreview)

    // UPDATE ACTION SELECT EVENTS
    elements.update.actionSelect.addEventListener('change', setCurrentMode)

    // DELETE NEWS EVENTS
    elements.delete.deleteNewsButton.addEventListener('click', deleteNews)

    // REFRESH NEWS EVENTS
    elements.update.refreshNewsButton.addEventListener('click', setNewsOnUpdelPreview)

    // ADD ADN REMOVE PARAGRAPHS EVENTS
    elements.add.addParagraphsButton.addEventListener('click', addNewParagraph)
    elements.add.removeParagraphsButton.addEventListener('click', removeParagraph)

    // FORM EVENTS
    const addForm = document.querySelector('#add-form')
    addForm.addEventListener('submit', (e) => {
        submitForm(e, addForm, 'POST')
    })

    addForm.addEventListener('reset', resetAddPreview)

    const updateForm = document.querySelector('#update-form')
    updateForm.addEventListener('submit', (e) => {
        submitForm(e, updateForm, 'PUT')
    })
}

window.addEventListener('load', () => {
    setEvents()
    setNewsOnUpdelPreview()
})