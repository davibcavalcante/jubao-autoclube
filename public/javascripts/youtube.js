const createTitleVideo = (videoData) => {
    const titleVideo = document.createElement('h1')
    titleVideo.innerText = videoData.title

    return titleVideo
}

const createPlayButton = () =>{
    const playButton = document.createElement('button')
    playButton.classList.add('play-btn')
    playButton.innerHTML = `<i class="fa-solid fa-circle-play"></i>`

    return playButton
}

const createVideoThumbnail = (videoData) => {
    const videoThumbnail = document.createElement('img')
    videoThumbnail.setAttribute('src', videoData.thumbnail)
    videoThumbnail.setAttribute('alt', 'Miniatura do Podcast Poeiracast')

    return videoThumbnail
}

const createLinkVideo = (videoData) => {
    const linkVideo = document.createElement('a')
    linkVideo.setAttribute('href', videoData.url)
    linkVideo.setAttribute('rel', 'external')
    linkVideo.setAttribute('target', '_blank')

    linkVideo.appendChild(createVideoThumbnail(videoData))
    
    return linkVideo
}

const createVideoInfo = (videoData) => {
    const infoContainer = document.createElement('section')
    infoContainer.classList.add('info-container')

    infoContainer.appendChild(createTitleVideo(videoData))
    infoContainer.appendChild(createPlayButton())

    return infoContainer
}

const createVideoContainer = (videoData) => {
    containerEl = document.createElement('section')
    containerEl.classList.add('poeiracast-video-container')

    containerEl.appendChild(createVideoInfo(videoData))
    containerEl.appendChild(createLinkVideo(videoData))

    return containerEl
}

const createCardVideos = (videoData) => {
    const container = document.querySelector('.slide-video-container')
    const videoContainer = createVideoContainer(videoData)
    
    container.appendChild(videoContainer)
    return container
}

const createVideos = (data) => {
    data.forEach((video) => {
        const videoData = {
            thumbnail: video.thumbnails.maxres.url,
            title: video.title,
            url: `https://youtu.be/${video.resourceId.videoId}`
        }

        return createCardVideos(videoData)
    })
}

const loadingAnimation = (action) => {
    const boxAnimation = document.querySelector('.loading-animation')
    if (action === 'start') {
        boxAnimation.classList.add('active')
    } else if (action === 'break') {
        boxAnimation.classList.replace('active', 'hidden')
    }
}

const recentsVideos = async() => {
    loadingAnimation('start')
    const results = await fetch('/api/v1/youtube-videos')
    const data = await results.json()
    loadingAnimation('break')
    return createVideos(data)
}

recentsVideos()