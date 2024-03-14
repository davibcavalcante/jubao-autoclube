const messageError = (method) => {
    const showsMessageErrorContainer = document.querySelector('.message-error-container')
    if (method === 'remove') {
        showsMessageErrorContainer.classList.remove('hidden')
    } else if (method == 'add' && showsMessageErrorContainer.classList.contains('messa-error-container')){
        showsMessageErrorContainer.classList.add('hidden')
    }
}

const openCloseOrgsFilter = (containerCaret) => {
    const viewWidth = window.innerWidth
    if (viewWidth >= 768) return
    const absoluteContainer = document.querySelector('.absolute-container')
    absoluteContainer.classList.toggle('active')

    if (absoluteContainer.classList.contains('active')) {
        containerCaret.innerHTML = '<i class="fa-solid fa-caret-up"></i>'
    } else {
        containerCaret.innerHTML = '<i class="fa-solid fa-caret-down"></i>'
    }
}

const filterEvents = async (data, method) => {
    const results = await fetch(`/api/v1/calendario/${data}/${method}`)

    if (!results.ok) {
        messageError('remove')
    } else {
        messageError('add')
    }

    const events = await results.json()

    if (data.length === 2) {
        loopOfEvents(events, 'month')
    } else {
        loopOfEvents(events, 'org')
    }
}

const hiddenAndShow = (hidden, show) => {
    hidden.classList.add('hidden')
    show.classList.remove('hidden')
}

const setOrgSelected = (orgsContainer, e) => {
    const oldOrgSelected = orgsContainer.querySelector('.selected')
    if (oldOrgSelected === null && e === undefined) {
        const defaultOrgSelected = document.querySelector('#jubaofe')
        defaultOrgSelected.classList.add('selected')
        return defaultOrgSelected
    } else if (oldOrgSelected !== null && e === undefined) {
        return oldOrgSelected
    } else if (oldOrgSelected !== null && e !== undefined) {
        oldOrgSelected.classList.remove('selected')
        const newOrgSelected = e.target.parentNode
        newOrgSelected.classList.add('selected')
        return newOrgSelected
    }
}

const setMonthSelected = (monthsContainer, month, e) => {
    const oldMonthSelected = monthsContainer.querySelector('.selected')
    if (oldMonthSelected === null && e === undefined) {
        const defaultMonthSelected = document.querySelector(`#m${month}`)
        defaultMonthSelected.classList.add('selected')
        return defaultMonthSelected
    } else if (oldMonthSelected !== null && e === undefined) {
        return oldMonthSelected
    } else if (oldMonthSelected !== null && e !== undefined) {
        const newOrgSelected = e.target.parentNode
        oldMonthSelected.classList.remove('selected')
        newOrgSelected.classList.add('selected')
        return newOrgSelected
    }
}

const setFilterEvents = (month) => {
    const showOrgsButton = document.querySelector('.show-mobile')
    showOrgsButton.addEventListener('click', () => {
        openCloseOrgsFilter(showOrgsButton)
    })

    const monthsContainer = document.querySelector('.months-container')
    const months = monthsContainer.querySelectorAll('.month-container')
    const filterSelect = document.querySelector('#filter-select')

    if (filterSelect.value === 'month') {
        setMonthSelected(monthsContainer, month)
    }

    months.forEach((month) => {
        month.addEventListener('click', (e) => {
            const container = setMonthSelected(monthsContainer, undefined, e)
            const dataFilter = container.id.substring(1)
            filterEvents(dataFilter, 'month')
        })
    })

    const orgsContainer = document.querySelector('.orgs-container')
    filterSelect.addEventListener('change', () => {
        if (filterSelect.value === 'org') {
            const container = setOrgSelected(orgsContainer)
            const dataFilter = container.querySelector('h1').innerText
            filterEvents(dataFilter, 'org')
            hiddenAndShow(monthsContainer, orgsContainer)
        } else if (filterSelect.value === 'month') {
            hiddenAndShow(orgsContainer, monthsContainer)
            const container = setMonthSelected(monthsContainer, month)
            const dataFilter = container.id.substring(1)
            filterEvents(dataFilter, 'month')
        }
    })

    const orgs = document.querySelectorAll('.org-container')
    orgs.forEach((org) => {
        org.addEventListener('click', (e) => {
            const container = setOrgSelected(orgsContainer, e)
            const dataFilter = container.querySelector('h1').innerText
            openCloseOrgsFilter(showOrgsButton)
            filterEvents(dataFilter, 'org')
        })
    })
}

//

const getCurrentDate = () => {
    const data = new Date()
    const currentMonth = data.getMonth()
    const currentYear = data.getFullYear()

    return { currentMonth, currentYear }
}

const formatNumber = (number) => {
    if (number < 10) {
        return `0${number}`
    } else {
        return number
    }
}

const createEvents = (arrayRallys, dayContainer, c, method) => {
    const title = document.createElement('h1')

    const subTitle = document.createElement('h2')
    subTitle.innerText = ''

    const paragraph = document.createElement('p')
    paragraph.innerText = ''
    
    while (c <= arrayRallys.length) {
        const currentElement = arrayRallys[c - 1]

        subTitle.innerText = `${currentElement.rally} \n ${currentElement.date}`
        title.innerText = `${currentElement.day}/${currentElement.month}`
        paragraph.innerText = currentElement.org

        if (currentElement.org === 'JUBÃOFE') {
            dayContainer.classList.add('jubao')
        } else {
            dayContainer.classList.add('event')
        }
        break
    }

    return { title, subTitle, paragraph }
}

const loopOfEvents = (rallyFilter, method) => {
    const calendar = document.querySelector('.calendar-container')
    const eventsLength = rallyFilter.length
    calendar.innerHTML = ''
    for (let c = 1; c <= eventsLength; c++) {
        const dayContainer = document.createElement('section')
        dayContainer.classList.add('day-container')

        const eventsDay = createEvents(rallyFilter, dayContainer, c, method)

        dayContainer.appendChild(eventsDay.title)
        dayContainer.appendChild(eventsDay.subTitle)
        dayContainer.appendChild(eventsDay.paragraph)
        calendar.appendChild(dayContainer)
    }
}

const createCalendar = async () => {
    const currentMonth = getCurrentDate().currentMonth + 1
    const formattedMonth = formatNumber(currentMonth)
    const results = await fetch(`/api/v1/calendario/${formattedMonth}/month`)

    if (!results.ok) {
        messageError('remove')
    } else {
        messageError('add')
    }

    const rallyOfMonth = await results.json()
    
    setFilterEvents(formattedMonth)
    loopOfEvents(rallyOfMonth, 'month')
}

window.addEventListener('load', () => {
    createCalendar()
})