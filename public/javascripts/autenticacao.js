// FUNCTION THAT CHECK IF SESSION IS VALID
const checkSession = async () => {
    const result = await fetch('/api/v1/autenticacao')
    if (result.status !== 200) window.location.href = '/'
}

// CODE INICIALIZATION EVENT
window.addEventListener('load', checkSession)