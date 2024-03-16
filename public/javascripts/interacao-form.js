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

// RETORNA UMA SELECT
const getSelect = (id) => {
    return document.querySelector(`#${id}-select`)
}

// TROCA A CLASSE DE UM ELEMENTO POR OUTRA
const replaceClass = (newClass, oldClass) => {
    getForms().parent.classList.replace(newClass, oldClass)
}

// VERIFICA SE OS INPUTS FORAM PREENCHIDOS
const checkElementsOk = (element) => {
    if (element.attributes[0].value === 'checkbox') {
        if (element.checked === false) {
            element.classList.add('error')
            setTimeout(() => {
                element.classList.remove('error')
            }, 1000)
            return false
        } else {
            return true
        }
    } else {
        if (element.value === '') {
            element.scrollIntoView({ behavior: 'smooth' })
            element.classList.add('error')
            return false
        } else {
            return true
        }
    }
}

// PREPARA OS ELEMENTOS PARA CHECAR SE SÃO VÁLIDOS
const sendElementsForCheck = (id) => {
    const parentElement = document.querySelector(`#${id}-form`)
    const elements = Array.from(parentElement.querySelectorAll('input, select'))
    const elementsToCheck = elements.filter(element => element.required)

    let inputIsvalid

    for (let input of elementsToCheck) {
        inputIsvalid = checkElementsOk(input)
        if (!inputIsvalid) break
    }

    if (inputIsvalid) return true 
}

// RETIRA OS NÚMEROS DOS INPUTS QUE NÃO DEVEM CONTER NÚMEROS 
const removeNumbersInput = (input) => {
    const regex = /^[^\d]*$/
    let inputValue = input.value

    if (regex.test(input.value)) {
        input.value = inputValue
    } else {
        input.value = inputValue.substring(0, inputValue.length - 1)
    }
}

// FUNÇÕES DE CEP

// COMPLETA OS OUTROS CAMPOS DE ENDEREÇO COM BASE NO CEP
const setAutoAddress = (data, input) => {
    const idInput = input.id
    const participantCep = idInput.split('-')[0]
    const autoCompleteInputs = ['state', 'city', 'street', 'neighborhood']

    autoCompleteInputs.forEach((item) => {
        const currentInput = document.querySelector(`#${participantCep}-${item}-input`)
        if (item === 'state') currentInput.value = data.state
        if (item === 'city') currentInput.value = data.city
        if (item === 'street') currentInput.value = data.street
        if (item === 'neighborhood') currentInput.value = data.neighborhood
        currentInput.focus()
    })
}

// VERIFICA SE O CEP É VALIDO
const cepIsValid = async (cep, input) => {
    const request = await fetch(`https://brasilapi.com.br/api/cep/v1/${cep}`)
    const data = await request.json()
    if (data.cep) {
        if (input.classList.contains('input-error')) {
            input.classList.remove('error')
        }
        setAutoAddress(data, input)
    } else {
        input.classList.add('error')
    }
}

// FORMATA O CAMPO DE CEP
const formatCepInput = (input) => {
    const cepValue = input.value
    const cepFormatted = cepValue.replace(/[^0-9]/g, '')
    input.value = cepFormatted
    if (cepFormatted.length === 8) {
        cepIsValid(cepFormatted, input)
    } else if (cepFormatted.length === 0) {
        if (input.classList.contains('input-error')) {
            removeErrorClass(input)
        }
    }
}

// FORMATA OS CAMPOS DE CPF
const formatCpfInput = (input) => {
    let cpfValue = input.value.replace(/[^\d]/g, '')

    if (cpfValue.length > 3 && cpfValue.length <= 6) {
        cpfValue = cpfValue.replace(/(\d{3})/, '$1.')
    } else if (cpfValue.length > 6 && cpfValue.length <= 9) {
        cpfValue = cpfValue.replace(/(\d{3})(\d{3})/, '$1.$2.')
    } else if (cpfValue.length > 9) {
        cpfValue = cpfValue.replace(/(\d{3})(\d{3})(\d{3})/, '$1.$2.$3-')
    }

    input.value = cpfValue
}

// FORMATA OS CAMPOS DE NÚMERO
const formatNumberInput = (input) => {
    let numberValue = input.value.replace(/[^\d]/g, '')

    if (numberValue.length > 2 && numberValue.length <= 6) {
        numberValue = numberValue.replace(/(\d{2})(\d{1,4})/, '($1) $2')
    } else if (numberValue.length > 6 && numberValue.length <= 10) {
        numberValue = numberValue.replace(/(\d{2})(\d{4})(\d{1,4})/, '($1) $2-$3')
    } else if (numberValue.length > 10) {
        numberValue = numberValue.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3').substr(0, 15)
    }

    input.value = numberValue
}

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
const updateStepTeste = (step, forms, scroll = false) => {
    const parentForms = getForms().parent
    let formId

    switch (step) {
        case 0: 
            formId = 'statement-form'
            break

        case 1:
            formId = 'pilot-form'
            break

        case 2:
            formId = 'navigator-form'
            break

        case 3:
            formId = 'aux1-form'
            break

        case 4:
            formId = 'aux2-form'
            break

        default: 'Id Inválido!'
    }

    forms.forEach((form) => {
        if (form.id === formId) {
            toggleClass(form, 'remove')
        } else {
            toggleClass(form, 'add')
        }
    })

    if (scroll) {
        setTimeout(() => {
            parentForms.scrollIntoView({behavior: 'smooth'})
        }, 300)
    }
}

// ARMAZENA E DEFINE VALOR DO PASSO ATUAL DO FORMULÁRIO
const formStepState = () => {
    let step = 0

    const getStep = () => {
        return step
    }

    const setStep = (newStep) => {
        step = newStep
    }

    return { getStep, setStep }
}

const formStepManage = formStepState()

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
    const categoriesValue = getSelect('categories').value
    const participantsValue = getSelect('participants').value

    if (participantsValue <= '3') {
        if (categoriesValue === 'INICIANTE' || categoriesValue === 'NOVATO' || categoriesValue === 'SILVANIA') {
            valueScreen.innerText = 'VALOR: R$ 375,00'
        } else {
            valueScreen.innerText = 'VALOR: R$ 450,00'
        }
    } else if (participantsValue === '4') {
        if (categoriesValue != 'TURISMO' && categoriesValue && 'GRADUADO' && categoriesValue != 'MASTER' &&         categoriesValue != 'SILVANIA') {
            valueScreen.innerText = 'VALOR: R$ 475,00'
        } else if (categoriesValue === 'SILVANIA') {
            valueScreen.innerText = 'VALOR: R$ 450,00'
        }
    }

    const rallyName = document.querySelector('#rally-name').innerText

    if (rallyName.toUpperCase() === 'RALLY DA APAE') {
        return validateForm(true)
    } else {
        return validateForm()
    }
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

// DEFINE COMO REQUIRED OS INPUTS CHECKBOX DO TERMO DE RESPONSABILIDADE
const statementRequired = (elements) => {
    if (elements === 'none') {
        for (let c = 1; c <= 2; c++) {
            const auxRequired = document.querySelector(`#accept-assistant${c}-input`)
            auxRequired.required = false
        }
        return
    } else {
        elements.forEach((element) => {
            document.querySelector(`#accept-assistant${element}-input`).required = true
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
                item.querySelector(`.${className}-input`).required = true
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
            resetInputs(inputsForReset)
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
            enableInputs(forms[3], 'element')
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

// LEVA O USUÁRIO AO PRÓXIMO PASSO DO FORMULÁRIO (MOBILE)
const goNextStep = (currentStep, forms, formContainer) => {
    const participantsValue = getSelect('participants').value

    const selPartIsValid = checkElementsOk(getSelect('participants'))
    const selCategIsValid = checkElementsOk(getSelect('categories'))

    if (!selPartIsValid || !selCategIsValid) return

    if (currentStep === 0) {
        const canNextStep = sendElementsForCheck('statement')
        if (!canNextStep) return

        currentStep++
        formStepManage.setStep(currentStep)
        formContainer.classList.add('second-step')
        updateStepTeste(currentStep, forms, true)
    } else if (currentStep === 1) {
        const canNextStep = sendElementsForCheck('pilot')

        if (!canNextStep) return

        currentStep++
        formStepManage.setStep(currentStep)
        replaceClass('second-step', 'third-step')
        updateStepTeste(currentStep, forms, true)
    } else if (currentStep === 2 && (participantsValue === '3' || participantsValue === '4')) {
        const canNextStep = sendElementsForCheck('pilot')

        if (!canNextStep) return

        currentStep++
        formStepManage.setStep(currentStep)
        replaceClass('third-step', 'fourth-step')
        updateStepTeste(currentStep, forms, true)
    } else if (currentStep === 3 && participantsValue === '4') {
        const canNextStep = sendElementsForCheck('pilot')

        if (!canNextStep) return

        currentStep++
        formStepManage.setStep(currentStep)
        replaceClass('fourth-step', 'fifth-step')
        updateStepTeste(currentStep, forms, true)
    }
}

// LEVA O USUÁRIO AO PASSO ANTERIOR DO FORMULÁRIO (MOBILE)
const goPrevStep = (currentStep, forms, formContainer) => {
    switch (currentStep) {
        case 1:
            currentStep--
            formStepManage.setStep(currentStep)
            updateStepTeste(currentStep, forms, true)
            formContainer.classList.remove('second-step')
            break

        case 2:
            currentStep--
            formStepManage.setStep(currentStep)
            updateStepTeste(currentStep, forms, true)
            replaceClass('third-step', 'second-step')
            break

        case 3:
            currentStep--
            formStepManage.setStep(currentStep)
            updateStepTeste(currentStep, forms, true)
            replaceClass('fourth-step', 'third-step')
            break

        case 4:
            currentStep--
            formStepManage.setStep(currentStep)
            updateStepTeste(currentStep, forms, true)
            replaceClass('fifth-step', 'fourth-step')
            break
    }
}

// FUNÇÃO QUE REGISTRA EVENTOS
const setEvents = () => {
    // ELEMENTOS GLOBAIS
    const formContainer = getForms().parent

    // EVENTOS DE FORMULÁRIOS
    const form = document.querySelector('#form')
    form.addEventListener('focusin', handleFocus)
    form.addEventListener('focusout', handleFocus)
    form.addEventListener('submit', submitForm)

    // EVENTO DO CONTAINER PAI DOS FORMULÁRIOS
    formContainer.addEventListener('click', (e) => {
        const targetClick = e.target
        const forms = getForms().forms
        let currentStep = formStepManage.getStep()

        if (targetClick.classList.contains('next-step-btn')) {
            goNextStep(currentStep, forms, formContainer)
        } else if (targetClick.classList.contains('prev-step-btn')) {
            goPrevStep(currentStep, forms, formContainer)
        }
    })

    // EVENTO DA SELECT DE PARTICIPANTES
    const participantsSelect = getSelect('participants')
    participantsSelect.addEventListener('change', changeParticipants)

    // EVENTO DA SELECT DE CATEGORIAS
    const categoriesSelect = getSelect('categories')

    categoriesSelect.addEventListener('change', () => {
        if (categoriesSelect.classList.contains('error')) {
            categoriesSelect.classList.remove('error')
        }

        const pilotCba = document.querySelector('#pilot-cba-input')
        const categoriesValue = categoriesSelect.value

        if (categoriesValue === 'TURISMO' || categoriesValue === 'GRADUADO' || categoriesValue === 'MASTER') {
            getSelect('participants').value = '2'
            changeParticipants()
            pilotCba.required = true
        } else {
            pilotCba.required = false
        }
    })

    // EVENTO DOS INPUTS
    const inputs = formContainer.querySelectorAll('input')

    inputs.forEach((input) => {    
        input.addEventListener('input', (e) => {
            if (input.classList.contains('active') && input.classList.contains('error')) {
                input.classList.remove('error')
            }

            if (input.classList.contains('without-numbers-input')) {
                removeNumbersInput(input)
            }
            
            if (input.classList.contains('cep-input')) {
                formatCepInput(input)
            }

            if (input.classList.contains('cpf-input')) {
                formatCpfInput(input)
            }

            if (input.classList.contains('number-input')) {
                formatNumberInput(input)
            }

            input.focus()
        })
    })

    // EVENTOS DOS PLACEHOLDERS
    const placeholders = document.querySelectorAll('.placeholder')

    placeholders.forEach((item) => {
        item.addEventListener('click', (e) => {
            const targetEl = e.target.previousElementSibling
            targetEl.focus()
        })
    })

    // EVENTO DO BOTÃO QUE GERA O QRCODE
    const showQrCodeButton = document.querySelector('#show-qr-code-btn')

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
}

// PONTO INICIAL
window.addEventListener('load', (e) => {
    const forms = getForms().forms
    enableDisableForms(e, forms)
    toggleSubmitButtons(forms.slice(2), ['disable', 'disable', 'enable'])

    window.addEventListener('resize', (e) => {
        enableDisableForms(e, forms)
    })

    const tempOption = document.querySelector('#temp-option')
    const rallyName = document.querySelector('#rally-name').innerText
    if (rallyName.toUpperCase() !== 'RALLY DA APAE') tempOption.classList.add('hidden')

    setEvents()
})