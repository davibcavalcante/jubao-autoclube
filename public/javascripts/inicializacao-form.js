// OPEN AND CLOSE REGISTRATION
const registrationIsOpen = true
//

const form = document.querySelector('#form')
const infoContainer = document.querySelector('.info-container')
const registrationClosed = document.querySelector('.registration-closed')

const openCloseRegistration = () => {
    if (!registrationIsOpen) {
        return
    } else {
        infoContainer.classList.remove('hidden')
        form.classList.remove('hidden')
        registrationClosed.classList.add('hidden')
    }
}

openCloseRegistration()

const statementForm = document.querySelector('#statement-form')
const pilotForm = document.querySelector('#pilot-form')
const navigatorForm = document.querySelector('#navigator-form')
const auxForm1 = document.querySelector('#aux1-form')
const auxForm2 = document.querySelector('#aux2-form')
const formsForToggleClass = [statementForm, pilotForm, navigatorForm, auxForm1, auxForm2]

const containerForm = document.querySelector('.form-container')

let oldViewWidth = window.innerWidth
let step = 0

window.addEventListener('load', enableDisableForms)
window.addEventListener('load', disableSubmitButtons)
window.addEventListener('resize', enableDisableForms)

function enableDisableForms(e) {
    const event = e.type
    let viewWidth = window.innerWidth
    if (event === 'load') {
        if (viewWidth >= 992) {
            formsForToggleClass.forEach(form => toggleClass(form, 'remove'))
        } else {
            formsForToggleClass.forEach((form, index) => {
                if (index != 0) {
                    toggleClass(form, 'add')
                    step = 0
                } 
            })
        }
    } else {
        if ((oldViewWidth >= 992 && viewWidth < 992) || (oldViewWidth < 992 && viewWidth >=  992)) {
            if (viewWidth >= 992) {
                if (containerForm.classList.contains(containerForm.classList.item(1))) {
                    containerForm.classList.remove(containerForm.classList.item(1))
                }
                formsForToggleClass.forEach(form => toggleClass(form, 'remove'))
            } else {
                formsForToggleClass.forEach((form, index) => {
                    if (index != 0) {
                        toggleClass(form, 'add')
                        step = 0
                    } 
                })
            }
        }
    }

    oldViewWidth = viewWidth
}

function toggleClass(form, action) {
    if (action === 'remove') {
        form.classList.remove('hidden')
    } else {
        form.classList.add('hidden')
    }
}

function disableSubmitButtons() {
    submitForm('navigator', 'disable')
    submitForm('aux1', 'disable')
    submitForm('aux2', 'enable')
}