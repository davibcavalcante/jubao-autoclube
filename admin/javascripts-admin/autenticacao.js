const loggedIn = () => {
    const formWrapper = document.querySelector('#form-wrapper')

    formWrapper.innerHTML = `
        <section class="title-container">
            <h1>Seja Bem Vindo!</h1>
            <h2>Você já está logado</h2>
        </section>
        <section class="question-container">
            <h3>Deseja ir até a página de administrador?</h3>
            <section class="responses-container">
                <a href="/admin" rel="next" target="_self">SIM</a>
                <a href="/" rel="prev" target="_self">NÃO</a>
            </section>
        </section>
    `
}

// FUNCTION THAT CHECK IF SESSION IS VALID
const checkSession = async () => {
    const isAdmin = await fetch('/api/v1/autenticacao')

    if (isAdmin.ok) loggedIn()
}

// CODE INICIALIZATION EVENT
window.addEventListener('load', checkSession) 