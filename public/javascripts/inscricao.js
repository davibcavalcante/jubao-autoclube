const showsMessageError = () => {
  const errorMessage = document.querySelector('.error-img')
  errorMessage.classList.remove('hidden')
}

const hideErrorMessage = () => {
  const errorMessage = document.querySelector('.error-img')
  if (!errorMessage.classList.contains('hidden')) {
    errorMessage.classList.add('hidden')
  }
}

const checkEventReleased = (eventData) => {
  if (eventData.ok) {
      return true
  } else {
      return false
  }
}

const clearContainer = (container) => {
  container.innerHTML = ''
}

const appendChildElements = (parentElement, childElement) => {
  parentElement.appendChild(childElement)
}

const getRequest = (month) => {
  if (month !== 'all') {
      return `/api/v1/rally-jubao/${month}`
  } else {
      return '/api/v1/rally-jubao'
  }
}

const filterEvents = async (month) => {
  const req = getRequest(month)
  const results = await fetch(req)

  if (!results.ok) {
      console.log('erro')
      return
  }

  const events = await results.json()
  const useEvents = events.filter((event) => event.ok === true)
  const calendarContainer = document.querySelector('.calendar-container')

  if (useEvents.length > 0) {
      clearContainer(calendarContainer)
      hideErrorMessage()
      useEvents.forEach((event) => {
          const eventReleased = checkEventReleased(event)
          if (!eventReleased) return
          const eventContainer = createEventContainer(event)
          appendChildElements(calendarContainer, eventContainer)
      })
  } else {
      clearContainer(calendarContainer)
      showsMessageError()
  }
}

const toggleSelected = (e) => {
  const target = e.target.parentNode
  const targetTitle = target.querySelector('h1').innerText
  const selectedContainer = document.querySelector('.option-container.selected')

  target.classList.add('selected')
  selectedContainer.classList.remove('selected')

  if (targetTitle !== 'TODOS') {
    const month = target.id.substring(1)
    filterEvents(month)
  } else {
    const id = target.id
    filterEvents(id)
  }
  
}

const setMonthEvents = () => {
  const arrayOptionContainers = document.querySelectorAll('.option-container')

  arrayOptionContainers.forEach((container) => {
      container.addEventListener('click', toggleSelected)
  })
}

const createChildElement = (eventData, element) => {
  const container = document.createElement(element)
  if (element === 'h1') {
      container.innerText = eventData.name
  } else if (element === 'h2') {
      container.innerText = eventData.date
  }

  return container
}

const createInfoContainer = (eventData) => {
  const container = document.createElement('section')
  container.classList.add('rally-info-container')

  const eventTitle = createChildElement(eventData, 'h1')
  const eventeDate = createChildElement(eventData, 'h2')

  appendChildElements(container, eventTitle)
  appendChildElements(container, eventeDate)

  return container
}

const formatNameRally = (eventData) => {
  const oldName = eventData.name
  const noSpecialChars = oldName.replace(/[^\w\sáéíóúâêîôûãõàèìòùäëïöüç]/gi, (match) => {
    if (match === 'ç') return 'c'
    return ''
  })
  const normalizedString = noSpecialChars.normalize("NFD").replace(/[\u0300-\u036f]/g, "")
  const noSpaceName = normalizedString.split(' ').join('-')
  return noSpaceName.toLowerCase()
}

const createEventContainer = (eventData) => {
  const container = document.createElement('section')
  container.classList.add('event-container')

  const nameFormatted = formatNameRally(eventData)

  container.style.backgroundImage = `url(/imagens/banner-inscricao/${nameFormatted}.jpg)`

  appendChildElements(container, createInfoContainer(eventData))

  const rallyName = container.querySelector('h1').innerText
  
  container.addEventListener('click', () => {
    window.location.href = `/inscricao/${rallyName}`
  })

  return container
}

const createCalendar = async () => {
  const req = getRequest('all')
  const results = await fetch(req)

  if (!results.ok) {
      console.log('erro')
      return
  }

  const eventsData = await results.json()
  const calendarContainer = document.querySelector('.calendar-container')
  const useEvents = []

  eventsData.forEach((eventData) => {
      const eventReleased = checkEventReleased(eventData)
      if (eventReleased) {
        useEvents.push(eventData)
      } else {
        return
      }
  })

  if (useEvents.length > 0) {
    calendarContainer.innerHTML = ''
    hideErrorMessage()
    useEvents.forEach((eventData) => {
      const eventContainer = createEventContainer(eventData)
      appendChildElements(calendarContainer, eventContainer)
    })
  } else {
    showsMessageError()
  }
}

window.addEventListener('load', () => {
  createCalendar()
  setMonthEvents()
})