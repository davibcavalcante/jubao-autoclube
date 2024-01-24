const insertAlbums = (albums) => {
    albums.forEach((album) => {
        const id = album.id
        album.innerHTML = `
        <section class="info-container">
            <h1>JubaoFe - ${id}</h1>
        </section>
        <img src="https://cdn.pixabay.com/photo/2023/07/22/04/15/motorbike-8142649_1280.jpg">
        `
    
        album.addEventListener('click', async() => {
            window.location.href = `/album/${id}`
        })
    })
}

const getAlbums = () => {
    const albums = document.querySelectorAll('.album')
    insertAlbums(albums)
}

getAlbums()