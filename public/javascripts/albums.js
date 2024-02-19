const insertAlbums = (albums) => {

    albums.forEach(async (album) => {
        const id = album.id
        album.innerHTML = `
        <section class="info-container">
            <h1>JubaoFe - ${id}</h1>
        </section>
        <section class="year-container">
            <h1>${id}</h1>
        </section>
        <img src="/imagens/albums/${id}.jpg">
        `
    
        album.addEventListener('click', async() => {
            window.location.href = `/fotos/${id}`
        })
    })
}

const getAlbums = () => {
    const albums = document.querySelectorAll('.album')
    insertAlbums(albums)
}

getAlbums()