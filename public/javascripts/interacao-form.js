/*updateStep(statementForm, 'enable')
updateStep(pilotForm, 'disable')
updateStep(navigatorForm, 'disable')
updateStep(auxForm1, 'disable')
updateStep(auxForm2, 'disable')*/

// RETORNA OS FORMULÁRIOS E O CONTAINER PAI
const getForms = () => {
    return {
        parent: document.querySelector('.form-container'),
        forms: [
            statementForm = document.querySelector('#statement-form'),
            pilotForm = document.querySelector('#pilot-form'),
            navigatorForm = document.querySelector('#navigator-form'),
            auxForm1 = document.querySelector('#aux1-form'),
            auxForm2 = document.querySelector('#aux2-form')
        ]
    }
}

// HABILITA E DESABILITA ELEMENTOS
const toggleClass = (element, action) => {
    if (action === 'remove') {
        element.classList.remove('hidden')
    } else if (action === 'add') {
        element.classList.add('hidden')
    }
}

// DEVOLVE VALOR DAS SELECTS
const getSelect = (id) => {
    return document.querySelector(`#${id}-select`)
}

//


// FUNÇÕES QUE AJUSTAM O FORMULÁRIO DE ACORDO COM O TAMANHO DA TELA / QUANTIDADE DE PARTICIPANTES

// HABILITA E DESABILITA OS BOTÕES DE SUBMIT DO FORMULÁRIO DE ACORDO COM A QUANTIDADE DE PARTICIPANTES.
const toggleSubmitButtons = (elementsArray, actionArray) => {
    elementsArray.forEach((element, index) => {
        const submitButton = element.querySelector('.submit-btn-container')

        if (actionArray[index] === 'disable') {
            submitButton.classList.add('hidden')
        } else if (actionArray[index] === 'enable') {
            submitButton.classList.remove('hidden')
        }
    })
}

// DEIXA VISÍVEL O FORMULÁRIO NO QUAL O USUÁRIO ESTÁ (MOBILE)
const updateStepTeste = (step, forms) => {
    if (step === 0) {
        forms.forEach((form) => {
            if (form.id === 'statement-form') {
                toggleClass(form, 'remove')
            } else {
                toggleClass(form, 'add')
            }
        })
    }
}

// ARMAZENA E DEFINE VALOR DO TAMANHO DA TELA DO USUÁRIO (RESIZE)
const viewWidthState = () => {
    let viewWidth = window.innerWidth

    const getWidth = () => {
        return viewWidth
    }

    const setWidth = (newWidth) => {
        viewWidth = newWidth
    }

    return { getWidth, setWidth }
}

const viewWidthManager = viewWidthState()

// AJUSTA O FORMULÁRIO PARA O MODO MOBILE E MODO DESKTOP
const enableDisableForms = (e, forms) => {
    const event = e.type
    const oldViewWidth = viewWidthManager.getWidth()
    const viewWidth = window.innerWidth

    if (event === 'load') {
        if (viewWidth >= 992) {
            forms.forEach(form => toggleClass(form, 'remove'))
        } else {
            updateStepTeste(0, forms)
        }
    } else if (event === 'resize') {
        if ((oldViewWidth >= 992 && viewWidth < 992) || (oldViewWidth < 992 && viewWidth >=  992)) {
            if (viewWidth >= 992) {
                forms.forEach(form => toggleClass(form, 'remove'))
            } else {
                updateStepTeste(0, forms)
            }
        }
    }

    viewWidthManager.setWidth(viewWidth)
}

// CALCULA VALOR DA INSCRIÇÃO E A ENVIA PARA VALIDAÇÃO
const submitForm = (e) => {
    e.preventDefault()
    const valueScreen = document.querySelector('.pay-value')

    if (partSel.value <= '3') {
        if (classSelect.value === 'INICIANTE' || classSelect.value === 'NOVATO') {
            valueScreen.innerText = 'VALOR: R$ 375,00'
        } else {
            valueScreen.innerText = 'VALOR: R$ 450,00'
        }
    } else if (partSel.value === '4') {
        if (classSelect.value != 'TURISMO' || classSelect.value != 'GRADUADO' || classSelect.value != 'MASTER') {
            valueScreen.innerText = 'VALOR: R$ 475,00'
        }
    }
    return validateForm()
}

// ATIVA E DESATIVA A ANIMAÇÃO DOS INPUTS
const handleFocus = (e) => {
    const eventType = e.type

    if (eventType === 'focusin' && e !== undefined) {
        if (e.target.tagName.toLowerCase() !== 'select') {
            e.target.classList.add('active')
            if (e.target.nextElementSibling) {
                e.target.nextElementSibling.classList.add('active')
            }
        }
    } else if (eventType === 'focusout' && e !== undefined) {
        if (e.target.tagName.toLowerCase() !== 'select' && e.target.value.length === 0) {
            e.target.classList.remove('active');
            if (e.target.nextElementSibling) {
                e.target.nextElementSibling.classList.remove('active');
            }
        }
    }
}

//
function statementRequired(elements, type) {
    if (elements === 'none') {
        for (let c = 1; c <= 2; c++) {
            const auxRequired = document.querySelector(`#accept-assistant${c}-input`)
            auxRequired.required = false
        }
        return
    } else {
        elements.forEach((element) => {
            document.querySelector(`accept-assistant${element}-input`).required = true
        })
    }
}

// DEFINE COMO VERDADEIRA A PROPRIEDADE "REQUIRED" DOS INPUTS HABILITADOS
const enableInputs = (element, type) => {
    const classForEnable = ['name', 'date', 'cpf', 'shirt']
    if (type === 'element') {
        classForEnable.forEach((className) => {
            element.querySelector(`.${className}-input`).required = true
        })
    } else if (type === 'array') {
        element.forEach((item) => {
            classForEnable.forEach((className) => {
                item.querySelector(`${className}-input`).required = true
            })
        })
    }
}

// DEFINE COMO FALSA A PROPRIEDADE "REQUIRED" DOS INPUTS DESABILITADOS
const resetInputs = (elements) => {   
    elements.forEach((element) => {
        if (element.required) element.required = false
    })
}

// HABILITA E DESABILITA FORMULÁRIOS DE ACORDO COM A QUANTIDADE DE PARTICIPANTES SELECIONADA
const participantsForm = (elementsArray, actionArray) => {
    elementsArray.forEach((element, index) => {
        if (actionArray[index] === 'disable') {
            const inputsForReset = element.querySelectorAll('input, select')
            resetInputss(inputsForReset)
            element.classList.add('hidden-participant')
        } else {
            element.classList.remove('hidden-participant')
        }
    })
}

const changeParticipants = () => {
    const participantsSelect = getSelect('participants')
    const categories = getSelect('categories')

    if (participantsSelect.classList.contains('error')) {
        participantsSelect.classList.remove('error')
    }

    let participantsValue = participantsSelect.value

    if (categories.value === 'TURISMO' || categories.value === 'GRADUADO' || categories.value === 'MASTER') {
        participantsValue = '2'
        participantsSelect.value = participantsValue
    } else {
        participantsValue = participantsSelect.value
    }

    const forms = getForms().forms
    switch (participantsValue) {
        case '2':
            statementRequired('none')
            participantsForm(forms.slice(3), ['disable', 'disable'])
            toggleSubmitButtons(forms.slice(2), ['enable', 'disable', 'disable'])
            break
            
        case '3': 
            statementRequired(['1'])
            participantsForm(forms.slice(3), ['enable', 'disable'])
            enableInputs(forms[4], 'element')
            toggleSubmitButtons(forms.slice(2), ['disable', 'enable', 'disable'])
            break

        case '4':
            statementRequired(['1', '2'])
            participantsForm(forms.slice(3), ['enable', 'enable'])
            enableInputs(forms.slice(3), 'array')
            toggleSubmitButtons(forms.slice(2), ['disable', 'disable', 'enable'])
            break
    }
}

// FUNÇÕES QUE REGISTRAM EVENTOS

// REGISTRA TODOS OS EVENTOS DO FORMULÁRIO
const setFormEvents = () => {
    const form = document.querySelector('#form')

    form.addEventListener('focusin', handleFocus)
    form.addEventListener('focusout', handleFocus)
    form.addEventListener('submit', submitForm)
}

// REGISTRA EVENTO PARA OS PLACEHOLDERS
const setPlaceholderEvents = () => {
    const placeholders = document.querySelectorAll('.placeholder')
    placeholders.forEach((item) => {
        item.addEventListener('click', (e) => {
            const targetEl = e.target.previousElementSibling
            targetEl.focus()
        })
    })
}

// REGISTRA EVENTO PARA OS INPUTS
const setInputEvents = () => {
    const form = getForms().parent
    const inputs = form.querySelectorAll('input')

    inputs.forEach((input) => {    
        input.addEventListener('input', () => {
            if (input.classList.contains('active') && input.classList.contains('error')) {
                input.classList.remove('error')
            }
        })
    })
}

// REGISTRA EVENTO PARA A SELECT DE CATEGORIA
const setEventsCategoriesSelect = () => {
    const categoriesSelect = document.querySelector('#categories-select')

    categoriesSelect.addEventListener('change', () => {
        if (classSelect.classList.contains('error')) {
            classSelect.classList.remove('error')
        }

        const pilotCba = document.querySelector('#pilot-cba-input')
        const categoriesValue = getSelect('categories').value

        if (categoriesValue === 'TURISMO' || categoriesValue === 'GRADUADO' || categoriesValue === 'MASTER') {
            partSel.value = '2'
            changeParticipants()
            pilotCba.required = true
        } else {
            pilotCba.required = false
        }
    })
}

// REGISTRA EVENTO PARA A SELECT DE PARTICIPANTES
const setEventsParticipantsSelect = () => {
    const participantsSelect = getSelect('participants')
    participantsSelect.addEventListener('change', changeParticipants)
}

// PONTO INICIAL
window.addEventListener('load', (e) => {
    const forms = getForms().forms
    enableDisableForms(e, forms)
    toggleSubmitButtons(forms.slice(2), ['disable', 'disable', 'enable'])

    window.addEventListener('resize', (e) => {
        enableDisableForms(e, forms)
    })

    setFormEvents()
    setPlaceholderEvents()
    setEventsCategoriesSelect()
})

/*

const infoContainer = document.querySelector('.info-container') !NÃO UTILIZANDO!!!!
const footer = document.querySelector('footer') !NÃO UTILIZANDO!!!!

const cepInputs = document.querySelectorAll('.cep-input')
const cpfInputs = document.querySelectorAll('.cpf-input')
const numbersInput = document.querySelectorAll('.number-input')




const nationalityInput = document.querySelector('#pilot-nationality-input')
const birthplaceInput = document.querySelector('#pilot-birthplace-input')

const showQrCodeButton = document.querySelector('#show-qr-code-btn')

// INTERACTION WITH ELEMENTS

/*
function handleFocusIn(e) {
    if (e === undefined) return
    if (e.target.tagName.toLowerCase() !== 'select') {
        e.target.classList.add('active');
        if (e.target.nextElementSibling) {
            e.target.nextElementSibling.classList.add('active');
        }
    }
}

function handleFocusOut(e) {
    if (e.target.tagName.toLowerCase() !== 'select' && e.target.value.length === 0) {
        e.target.classList.remove('active');
        if (e.target.nextElementSibling) {
            e.target.nextElementSibling.classList.remove('active');
        }
    }
}

input.addEventListener('input', autoFocus)
function autoFocus(e) {
    const targetInput = e.target
    targetInput.focus()
}

containerForm.addEventListener('click', (e) => {
    const targetClick = e.target
    if (targetClick.classList.contains('next-step-btn')) {

        const selPartIsValid = verifyInput(partSel)
        const selClassIsValid = verifyInput(classSelect)
        let inputsToCheck = []
        let inputIsvalid

        if (!selPartIsValid || !selClassIsValid) return

        if (step === 0) {
            const statementInputs = statementForm.querySelectorAll('input')
            statementInputs.forEach((input) => {
                if (input.required) {
                    inputsToCheck.push(input)
                }
            })

            for (let input of inputsToCheck) {
                inputIsvalid = verifyInput(input)
                if (!inputIsvalid) {
                    break
                }
            }

            if (!inputIsvalid) return

            containerForm.classList.add('second-step')
            step++
            updateStep(pilotForm, 'enable', true)
            updateStep(statementForm, 'disable', true)
            updateStep(navigatorForm, 'disable', true)
            updateStep(auxForm1, 'disable', true)
            updateStep(auxForm2, 'disable', true)
        } else if (step === 1) {
            const pilotInputs = pilotForm.querySelectorAll('input')
            const pilotSelects = pilotForm.querySelectorAll('select')

            pilotSelects.forEach((select) => {
                if (select.required) {
                    inputsToCheck.push(select)
                }
            })

            pilotInputs.forEach((input) => {
                if (input.required) {
                    inputsToCheck.push(input)
                }
            })

            for (let input of inputsToCheck) {
                inputIsvalid = verifyInput(input)
                if (!inputIsvalid) {
                    break
                }
            }

            if (!inputIsvalid) return

            replaceClass('second-step', 'third-step')
            step++
            updateStep(navigatorForm, 'enable', true)
            updateStep(statementForm, 'disable', true)
            updateStep(pilotForm, 'disable', true)
            updateStep(auxForm1, 'disable', true)
            updateStep(auxForm2, 'disable', true)
        } else if (step === 2 && (partSel.value === '3' || partSel.value === '4')) {
            const navigatorInputs = navigatorForm.querySelectorAll('input')
            const navigatorSelects = navigatorForm.querySelectorAll('select')

            navigatorSelects.forEach((select) => {
                if (select.required) {
                    inputsToCheck.push(select)
                }
            })

            navigatorInputs.forEach((input) => {
                if (input.required) {
                    inputsToCheck.push(input)
                }
            })

            for (let input of inputsToCheck) {
                inputIsvalid = verifyInput(input)
                if (!inputIsvalid) {
                    break
                }
            }

            if (!inputIsvalid) return

            replaceClass('third-step', 'fourth-step')
            step++
            updateStep(auxForm1, 'enable', true)
            updateStep(statementForm, 'disable', true)
            updateStep(pilotForm, 'disable', true)
            updateStep(navigatorForm, 'disable', true)
            updateStep(auxForm2, 'disable', true)
        } else if (step === 3 && partSel.value === '4') {
            const aux1Inputs = auxForm1.querySelectorAll('input')
            const aux1Selects = auxForm1.querySelectorAll('select')

            aux1Selects.forEach((select) => {
                if (select.required) {
                    inputsToCheck.push(select)
                }
            })

            aux1Inputs.forEach((input) => {
                if (input.required) {
                    inputsToCheck.push(input)
                }
            })

            for (let input of inputsToCheck) {
                inputIsvalid = verifyInput(input)
                if (!inputIsvalid) {
                    break
                }
            }

            if (!inputIsvalid) return

            replaceClass('fourth-step', 'fifth-step')
            step++
            updateStep(auxForm2, 'enable', true)
            updateStep(statementForm, 'disable', true)
            updateStep(pilotForm, 'disable')
            updateStep(navigatorForm, 'disable', true)
            updateStep(auxForm1, 'disable', true)
        }
    }

    if (targetClick.classList.contains('prev-step-btn')) {
        switch (step) {
        case 1:
            containerForm.classList.remove('second-step')
            step--
            updateStep(statementForm, 'enable', true)
            updateStep(pilotForm, 'disable', true)
            updateStep(navigatorForm, 'disable', true)
            updateStep(auxForm1, 'disable', true)
            updateStep(auxForm2, 'disable', true)
            break

        case 2:
            replaceClass('third-step', 'second-step')
            step--
            updateStep(pilotForm, 'enable', true)
            updateStep(statementForm, 'disable', true)
            updateStep(navigatorForm, 'disable', true)
            updateStep(auxForm1, 'disable', true)
            updateStep(auxForm2, 'disable', true)
            break

        case 3:
            replaceClass('fourth-step', 'third-step')
            step--
            updateStep(navigatorForm, 'enable', true)
            updateStep(statementForm, 'disable', true)
            updateStep(pilotForm, 'disable', true)
            updateStep(auxForm1, 'disable', true)
            updateStep(auxForm2, 'disable', true)
            break

        case 4:
            replaceClass('fifth-step', 'fourth-step')
            step--
            updateStep(auxForm1, 'enable', true)
            updateStep(statementForm, 'disable', true)
            updateStep(pilotForm, 'disable', true)
            updateStep(navigatorForm, 'disable', true)
            updateStep(auxForm2, 'disable', true)
            break
        }
    }
})

showQrCodeButton.addEventListener('click', () => {
    const qrCodeContainer = document.querySelector('.qr-code-container')
    qrCodeContainer.classList.toggle('hidden')
    showQrCodeButton.classList.toggle('active')

    if (showQrCodeButton.classList.contains('active')) {
        showQrCodeButton.innerText = 'LIMPAR QR CODE'
    } else {
        showQrCodeButton.innerText = 'GERAR QR CODE'
    }
})

function updateStep(form, action, scroll) {
    if (scroll) {
        setTimeout(() => {
            containerForm.scrollIntoView({behavior: 'smooth'})
        }, 300)
    }

    if (action === 'enable') {
        form.classList.remove('hidden')
    } else {
        form.classList.add('hidden')
    }
}

function replaceClass(newClass, oldClass) {
    containerForm.classList.replace(newClass, oldClass)
}

function clearInputs(elements) {
    if (elements) {
        elements.forEach(element => element.value = '')
    }
}

function verifyInput(input) {
    if (input.attributes[0].value === 'checkbox') {
        if (input.checked === false) {
            input.classList.add('error')
            setTimeout(() => {
                input.classList.remove('error')
            }, 1000)
            return false
        } else {
            return true
        }
    } else {
        if (input.value === '') {
            containerForm.scrollIntoView({ behavior: 'smooth' })
            input.classList.add('error')
            return false
        } else {
            return true
        }
    }
}

function inputFocus(input) {
    input.focus()
}

function removeErrorClass(input) {
    input.classList.remove('input-error')
    input.nextElementSibling.classList.remove('input-error')
}

function setErrorClass(input) {
    input.classList.add('input-error')
    input.nextElementSibling.classList.add('input-error')
}

// INTERACTION WITH DATA

nationalityInput.addEventListener('input', deleteNumbers)
birthplaceInput.addEventListener('input', deleteNumbers)

function deleteNumbers(e) {
    const useInput = e.target
    const regex = /^[^\d]*$/
    let inputValue = useInput.value

    if (regex.test(useInput.value)) {
        useInput.value = inputValue
    } else {
        useInput.value = inputValue.substring(0, inputValue.length - 1)
    }
}

cpfInputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        const inputEl = e.target
        let cpfValue = inputEl.value.replace(/[^\d]/g, '')

        if (cpfValue.length > 3 && cpfValue.length <= 6) {
            cpfValue = cpfValue.replace(/(\d{3})/, '$1.')
        } else if (cpfValue.length > 6 && cpfValue.length <= 9) {
            cpfValue = cpfValue.replace(/(\d{3})(\d{3})/, '$1.$2.')
        } else if (cpfValue.length > 9) {
            cpfValue = cpfValue.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3-')
        }

        inputEl.value = cpfValue;
    })
})

cepInputs.forEach((input) => {
    input.addEventListener('input', (e) => {
        const inputTarget = e.target
        const cepValue = inputTarget.value
        const cepFormatted = cepValue.replace(/[.\-\s]/g, '')
        if (cepFormatted.length === 8) {
            cepIsValid(cepFormatted, inputTarget)
        } else if (cepFormatted.length === 0) {
            if (inputTarget.classList.contains('input-error')) {
                removeErrorClass(inputTarget)
            }
        }
    })
})

numbersInput.forEach((input) => {
    input.addEventListener('input', (e) => {
        const inputNumber = e.target
        let numberValue = inputNumber.value.replace(/[^\d]/g, '')

        if (numberValue.length > 2 && numberValue.length <= 6) {
            numberValue = numberValue.replace(/(\d{2})(\d{1,4})/, '($1) $2')
        } else if (numberValue.length > 6 && numberValue.length <= 10) {
            numberValue = numberValue.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3')
        } else if (numberValue.length > 10) {
            numberValue = numberValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3').substr(0, 15)
        }

        inputNumber.value = numberValue
    })
})

function setAutoAddress(response, input) {
    const idInput = input.id
    const participantCep = idInput.split('-')[0]
    const stateInput = document.querySelector(`#${participantCep}-state-input`)
    stateInput.value = response.state

    const cityInput = document.querySelector(`#${participantCep}-city-input`)
    cityInput.value = response.city

    const streetInput = document.querySelector(`#${participantCep}-street-input`)
    streetInput.value = response.street

    const neighborhoodInput = document.querySelector(`#${participantCep}-neighborhood-input`)
    neighborhoodInput.value = response.neighborhood

    const inputsForFocus = [stateInput, cityInput, streetInput, neighborhoodInput]
    inputsForFocus.forEach(input => inputFocus(input))
}

async function cepIsValid(cep, input) {
    const request = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
    const requestFormatted = await request.json()
    if (requestFormatted.cep) {
        if (input.classList.contains('input-error')) {
            removeErrorClass(input)
        }

        setAutoAddress(requestFormatted, input)
    } else {
        setErrorClass(input)
    }
}
// */