const showMessage = (message, buttonText, silvania = false) => {
    const wrapper = document.querySelector('.message-container')
    const formOpacity = document.querySelector('form')
    const title = document.querySelector('.title')
    const confirmButton = document.querySelector('.confirm-btn')
    const figure = document.querySelector('.figure')
    const pInfo = document.querySelector('.p-info')
    const importantMessage = document.querySelector('.important-message')
    const contact = document.querySelector('.contact')
    const qrCode = document.querySelector('.qr-code-img')

    wrapper.classList.remove('hidden')
    title.innerText = message
    confirmButton.innerText = buttonText

    if (buttonText === 'OK') {
        figure.src = '/imagens/mobile/checked.png'
        importantMessage.innerHTML = `Para confirmar a sua inscrição é necessário realizar o pagamento e enviar o comprovante via Email ou WhatsApp!`
        contact.innerHTML = 'Email: jubaofe@gmail.com </br> (62) 9 8459-4447 | (62) 9 9675-1067'
        if (silvania) {
          qrCode.src = '/imagens/mobile/qr-code-silvania.jpeg'
        } else {
          qrCode.src = '/imagens/mobile/qr-code.jpg'
        }
        pInfo.innerText = 'Caso tenha alguma dúvida sobre valores clique em "INFORMAÇÕES" no topo da página!'
    } else {
        figure.src = '/imagens/mobile/cancel.png'
        pInfo.innerText = 'Clique em "Tentar Novamente" para realizar nova tentativa!'
    }

    formOpacity.classList.add('opacity')

    const rectWrapper = wrapper.getBoundingClientRect()
    window.scrollTo({ top: (window.scrollY + rectWrapper.top) - 20, behavior: 'smooth' })

    confirmButton.addEventListener('click', () => {
    window.location.reload()
  })
}

const getFormData = () => {
    const numParticipants = document.getElementById('participants-select').value
    const data = {}
    
    const extractParticipantData = (prefix) => {
        const participantData = {}
        const inputs = document.querySelectorAll(`[name^="${prefix}"]`)
        inputs.forEach((input) => {
            if (input.value.trim() !== "") {
                const fieldName = input.name.replace(`${prefix}-`, "")
                const fieldParts = fieldName.split('-')
                if (fieldParts.length === 1) {
                    participantData[fieldParts[0]] = input.value
                } else {
                    if (!participantData[fieldParts[0]]) {
                        participantData[fieldParts[0]] = {}
                    }
                    participantData[fieldParts[0]][fieldParts[1]] = input.value
                }
            }
        })
        return Object.keys(participantData).length > 0 ? participantData : null
    }

    const cupName = document.querySelector('#rally-name').innerText
    if (cupName) {
      data.cup = { cupName }
    }

    const teamData = extractParticipantData('team')
    if (teamData) {
      data.team = teamData
    }

    const carData = extractParticipantData('car')
    if (carData) {
      data.car = carData
    }

    const pilotData = extractParticipantData('pilot')
    if (pilotData) {
        data.pilot = pilotData;
    }

    const navigatorData = extractParticipantData('nav')
    if (navigatorData) {
        data.navigator = navigatorData;
    }

    if (numParticipants >= 3) {
        const aux1Data = extractParticipantData('aux1')
        if (aux1Data) {
            data.aux1 = aux1Data;
        }
    }

    if (numParticipants == 4) {
        const aux2Data = extractParticipantData('aux2')
        if (aux2Data) {
            data.aux2 = aux2Data;
        }
    }

    return data
}

const clearFormData = () => {
    const inputsForReset = document.querySelectorAll('input.active')
    const placeholdersForReset = document.querySelectorAll('.placeholder.active')

    const resetForm = (element) => {
      element.forEach((item) => item.classList.remove('active'))
      form.reset()
    }
    
    resetForm(inputsForReset)
    resetForm(placeholdersForReset)
}

const sendData = async (formData, silvania) => {
    const result = await fetch("/api/v1/inscricao", {
      method: "POST",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    });

    if (result.status === 200) {
      const data = await result.json();
      showMessage(data.message, 'OK', silvania)
      clearFormData();
    } else {
      const data = await result.json();
      showMessage(data.message, 'Tentar Novamente')
    }
  }

const validateForm = (silvania) => {
    const formData = getFormData();
    return sendData(formData, silvania)
}