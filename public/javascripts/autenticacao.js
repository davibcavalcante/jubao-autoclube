// FUNCTION THAT CHECK IF SESSION IS VALID
const checkSession = async () => {
    const isAdmin = await fetch(`/api/v1/autenticacao`)

    if (isAdmin.ok) {
        window.location.href = '/admin'
    }
}

// CODE INICIALIZATION EVENT
window.addEventListener('load', checkSession)