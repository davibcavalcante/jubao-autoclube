const placeholder = document.querySelectorAll('.placeholder')
const inputs = form.querySelectorAll('input')

const cepInputs = document.querySelectorAll('.cep-input')
const cpfInputs = document.querySelectorAll('.cpf-input')
const numbersInput = document.querySelectorAll('.number-input')

const classSelect = document.querySelector('#class-select')
const footer = document.querySelector('footer')
const partSel = document.querySelector('#participants-select')

const nationalityInput = document.querySelector('#pilot-nationality-input')
const birthplaceInput = document.querySelector('#pilot-birthplace-input')

const showQrCodeButton = document.querySelector('#show-qr-code-btn')

const tempOption = document.querySelector('#temp-option')
const rallyName = document.querySelector('#rally-name').innerText
if (rallyName.toUpperCase() !== 'RALLY DA APAE') tempOption.classList.add('hidden')

// INTERACTION WITH ELEMENTS

form.addEventListener('focusin', handleFocusIn)
form.addEventListener('focusout', handleFocusOut)
form.addEventListener('submit', (e) => {
    e.preventDefault()
    const valueScreen = document.querySelector('.pay-value')

    if (partSel.value <= '3') {
        if (classSelect.value === 'INICIANTE' || classSelect.value === 'NOVATO' || classSelect.value === 'SILVANIA') {
            valueScreen.innerText = 'VALOR: R$ 375,00'
        } else {
            valueScreen.innerText = 'VALOR: R$ 450,00'
        }
    } else if (partSel.value === '4') {
        if (classSelect.value != 'TURISMO' && classSelect.value != 'GRADUADO' && classSelect.value != 'MASTER' && classSelect.value != 'SILVANIA') {
            valueScreen.innerText = 'VALOR: R$ 475,00'
        } else if (classSelect.value === 'SILVANIA') {
            valueScreen.innerText = 'VALOR: R$ 450,00'
        }
    }
    return validateForm(true)
})

placeholder.forEach((item) => {
    item.addEventListener('click', (e) => {
        const targetEl = e.target.previousElementSibling
        targetEl.focus()
        handleFocusIn()
    })
})

inputs.forEach((input) => {
    input.addEventListener('input', autoFocus)
    input.addEventListener('input', () => {
        if (input.classList.contains('active') && input.classList.contains('error')) {
            input.classList.remove('error')
        }
    })
})

partSel.addEventListener('change', changeParticipants)

classSelect.addEventListener('change', () => {
    if (classSelect.classList.contains('error')) {
        classSelect.classList.remove('error')
    }

    const selClassValue = classSelect.value
    const pilotCba = document.querySelector('#pilot-cba-input')

    if (selClassValue === 'TURISMO' || selClassValue === 'GRADUADO' || selClassValue === 'MASTER') {
        partSel.value = '2'
        changeParticipants()
        pilotCba.required = true
    } else {
        pilotCba.required = false
    }
})

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

function changeParticipants() {
    if (partSel.classList.contains('error')) {
        partSel.classList.remove('error')
    }

    let selValue = partSel.value

    if (classSelect.value === 'TURISMO' || classSelect.value === 'GRADUADO' || classSelect.value === 'MASTER') {
        partSel.value = '2'
        selValue = partSel.value
    } else {
        selValue = partSel.value
    }

    switch (selValue) {
        case '2':
            statementAuxRequired('none')
            participantsForm('1', 'disable')
            participantsForm('2', 'disable')
            submitForm('navigator', 'enable')
            break
            
        case '3': 
            statementAuxRequired('1')
            participantsForm('1', 'enable')
            participantsForm('2', 'disable')
            enableInputs('1')
            submitForm('navigator', 'disable')
            submitForm('aux1', 'enable')
            break

        case '4':
            statementAuxRequired('1')
            statementAuxRequired('2')
            participantsForm('1', 'enable')
            participantsForm('2', 'enable')
            enableInputs('1')
            enableInputs('2')
            submitForm('navigator', 'disable')
            submitForm('aux1', 'disable')
            submitForm('aux2', 'enable')
            break
    }
}

function autoFocus(e) {
    const targetInput = e.target
    targetInput.focus()
}

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

function submitForm(id, action) {
    const submitDisable = document.querySelector(`#${id}-form`).querySelector('.submit-btn-container')
    if (action === 'disable') {
        submitDisable.classList.add('hidden')
    } else {
        submitDisable.classList.remove('hidden')
    }
}

function participantsForm(num, action) {
    const formAction = document.querySelector(`#aux${num}-form`)
    disableInputs(formAction)
    if (action === 'disable') {
        const inputsForClear = formAction.querySelectorAll('input')
        const selectForClear = formAction.querySelectorAll('select')
        clearInputs(inputsForClear)
        clearInputs(selectForClear)
        formAction.classList.add('hidden-participant')
    } else {
        formAction.classList.remove('hidden-participant')
    }
}

function disableInputs(form) {
    const requiredInputs = form.querySelectorAll('input')
    const requiredSelects = form.querySelectorAll('select')
    
    function removeRequired(element) {
        element.forEach((item) => {
            if (item.required) {
                item.required = false
            }
        })
    }

    removeRequired(requiredInputs)
    removeRequired(requiredSelects)
}

function enableInputs(id) {
    const formForEnable = document.querySelector(`#aux${id}-form`)
    const classForEnable = ['name', 'date', 'cpf', 'shirt']

    classForEnable.forEach((item) => {
        const inputForEnable = formForEnable.querySelector(`.${item}-input`)
        inputForEnable.required = true
    })
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

function statementAuxRequired(num) {
    if (num === 'none') {
        for (let c = 1; c <= 2; c++) {
            const auxRequired = document.querySelector(`#accept-assistant${c}-input`)
            auxRequired.required = false
        }
        return
    }

    const auxRequired = document.querySelector(`#accept-assistant${num}-input`)
    auxRequired.required = true
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
//

updateStep(statementForm, 'enable')
updateStep(pilotForm, 'disable')
updateStep(navigatorForm, 'disable')
updateStep(auxForm1, 'disable')
updateStep(auxForm2, 'disable')