// FUNCTION THAT CREATES THE VIDEO TITLE
const createVideoTitle = (videoData) => {
    const titleVideo = document.createElement('h1')
    titleVideo.innerText = videoData.title

    return titleVideo
}

// FUNCTION THAT CREATES THE PLAY BUTTON
const createPlayButton = () =>{
    const playButton = document.createElement('button')
    playButton.classList.add('play-btn')
    playButton.innerHTML = `<i class="fa-solid fa-circle-play"></i>`

    return playButton
}

// FUNCTION THAT CREATES THE VIDEO THUMBNAIL
const createVideoThumbnail = (videoData) => {
    const videoThumbnail = document.createElement('img')
    videoThumbnail.setAttribute('src', videoData.thumbnail)
    videoThumbnail.setAttribute('alt', 'Miniatura do Podcast Poeiracast')

    return videoThumbnail
}

// FUNCTION THAT CREATES THE VIDEO LINK
const createVideoLink = (videoData) => {
    const linkVideo = document.createElement('a')
    linkVideo.setAttribute('href', videoData.url)
    linkVideo.setAttribute('rel', 'external')
    linkVideo.setAttribute('target', '_blank')

    linkVideo.appendChild(createVideoThumbnail(videoData))
    
    return linkVideo
}

// FUNCTION THAT CREATES THE VIDEO INFORMATION
const createVideoInfo = (videoData) => {
    const infoContainer = document.createElement('section')
    infoContainer.classList.add('info-container')

    infoContainer.appendChild(createVideoTitle(videoData))
    infoContainer.appendChild(createPlayButton())

    return infoContainer
}

// FUNCTION THAT CREATES THE VIDEO CONTAINER
const createVideoContainer = (videoData) => {
    containerEl = document.createElement('section')
    containerEl.classList.add('poeiracast-video-container')

    containerEl.appendChild(createVideoInfo(videoData))
    containerEl.appendChild(createVideoLink(videoData))

    return containerEl
}

// FUNCTION THAT CREATES THE VIDEO CARDS
const createVideoCards = (videoData) => {
    const container = document.querySelector('.slide-video-container')
    const videoContainer = createVideoContainer(videoData)
    
    container.appendChild(videoContainer)
    return container
}

// FUNCTION THAT CREATES VIDEOS
const createVideos = (data) => {
    data.forEach((video) => {
        const videoData = {
            thumbnail: video.thumbnails.maxres.url,
            title: video.title,
            url: `https://youtu.be/${video.resourceId.videoId}`
        }

        return createVideoCards(videoData)
    })
}

// FUNCTION THAT ENABLES AND DISABLES LOADING ANIMATION
const loadingAnimation = (action) => {
    const boxAnimation = document.querySelector('.loading-animation')
    if (action === 'start') {
        boxAnimation.classList.add('active')
    } else if (action === 'break') {
        boxAnimation.classList.replace('active', 'hidden')
    }
}

// FUNCTION THAT TAKES THE RECENT VIDEOS
const recentsVideos = async() => {
    loadingAnimation('start')
    const results = await fetch('/api/v1/youtube-videos')
    const data = await results.json()
    loadingAnimation('break')
    return createVideos(data)
}

// CODE INICIALIZATION EVENT
window.addEventListener('load', () => {
    recentsVideos()
})