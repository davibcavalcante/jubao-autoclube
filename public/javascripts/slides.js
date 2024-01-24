const getViewWidth = () => {
    return window.innerWidth
}

const moveNextVideo = (container, currentVideo, moveValue) => {
    container.style.transform = `translateX(-${(moveValue * currentVideo)}%)`
}

const movePrevVideo = (container, currentVideo, moveValue) => {
    container.style.transform = `translateX(-${moveValue * (currentVideo - 1)}%)`
}

const getVideoElements = () => {
    const autoVideoSlide = () => {
        viewWidth = getViewWidth()
        if (viewWidth < 992) {
            if (videoState.moveDirection === 1) {
                if (videoState.currentVideo < videoState.videosLength) {
                    moveNextVideo(videoContainer, videoState.currentVideo, 100)
                    videoState.currentVideo++
                } else {
                    videoState.moveDirection = -1
                    videoState.currentVideo--
                    movePrevVideo(videoContainer, videoState.currentVideo, 100)
                }

            } else if (videoState.moveDirection === -1) {
                if (videoState.currentVideo > 1) {
                    videoState.currentVideo--
                    movePrevVideo(videoContainer, videoState.currentVideo, 100)
                } else {
                    videoState.moveDirection = 1
                    moveNextVideo(videoContainer, videoState.currentVideo, 100)
                    videoState.currentVideo++
                }
            }
        } else {
            if (videoState.moveDirection === 1) {
                if (videoState.currentVideo + 2 < videoState.videosLength) {
                    moveNextVideo(videoContainer, videoState.currentVideo, 33.33333333)
                    videoState.currentVideo++
                } else {
                    videoState.moveDirection = -1
                    videoState.currentVideo--
                    movePrevVideo(videoContainer, videoState.currentVideo, 33.33333333)
                }

            } else if (videoState.moveDirection === -1) {
                if (videoState.currentVideo > 1) {
                    videoState.currentVideo--
                    movePrevVideo(videoContainer, videoState.currentVideo, 33.33333333)
                } else {
                    videoState.moveDirection = 1
                    moveNextVideo(videoContainer, videoState.currentVideo, 33.33333333)
                    videoState.currentVideo++
                }
            }
        }
    }

    const videoContainer = document.querySelector('.slide-video-container')
    const prevVideoButton = document.querySelector('.prev-video-btn')
    const nextVideoButton = document.querySelector('.next-video-btn')
    const timer = 2000

    let viewWidth = getViewWidth()
    let videoState = {
        currentVideo: 1,
        videosLength: 10,
        moveDirection: 1
    }

    let interval = setInterval(autoVideoSlide, timer)
    const resetInterval = () => {
        clearInterval(interval)
        interval = setInterval(autoVideoSlide, timer)
    }

    prevVideoButton.addEventListener('click', () => {
        viewWidth = getViewWidth()
        if (viewWidth < 992) {
            if (videoState.currentVideo > 1) {
                videoState.currentVideo--
                movePrevVideo(videoContainer, videoState.currentVideo, 100)
                resetInterval()
            }
        } else {
            if (videoState.currentVideo > 1) {
                videoState.currentVideo--
                movePrevVideo(videoContainer, videoState.currentVideo, 33.33333333)
                resetInterval()
            }
        }
    })

    nextVideoButton.addEventListener('click', () => {
        viewWidth = getViewWidth()
        if (viewWidth < 992) {
            if (videoState.currentVideo < videoState.videosLength) {
                moveNextVideo(videoContainer, videoState.currentVideo, 100)
                videoState.currentVideo++
                resetInterval()
            }
        } else {
            if (videoState.currentVideo + 2 < videoState.videosLength) {
                moveNextVideo(videoContainer, videoState.currentVideo, 33.33333333)
                videoState.currentVideo++
                resetInterval()
            }
        }
    })
}

const moveBackground = (container, currentBackground, action) => {
    if (action === 'next') {
        container.style.transform = `translateX(-${100 * currentBackground}vw)`
    } else if (action === 'prev') {
        container.style.transform = `translateX(${100 * (currentBackground - 1)}vw)`
    }
}

const getBackgroundElements = () => {

    const verifyMoveBackground = (e) => {
        let buttonClick
        if (e !== undefined) {
            buttonClick = e.clientX
        }

        if (buttonClick > 500 && !(currentBackground < imagesLength)) return
        if (buttonClick < 500 && !(currentBackground > 1)) return

        if (moveBackgroundDirection === 1) {

            if (currentBackground < imagesLength && currentBackground + 1 === imagesLength) {
                moveBackground(background, currentBackground, 'next')
                currentBackground++
                moveBackgroundDirection = -1
            } else if (currentBackground < imagesLength && currentBackground + 1 < imagesLength) {
                moveBackground(background, currentBackground, 'next')
                currentBackground++
            }

        } else if (moveBackgroundDirection === -1) {

            if (currentBackground > 1 && currentBackground - 1 === 1) {
                currentBackground--
                moveBackground(background, currentBackground, 'prev')
                moveBackgroundDirection = 1
            } else if (currentBackground > 1 && currentBackground - 1 > 1) {
                currentBackground--
                moveBackground(background, currentBackground, 'prev')
            }
            
        }
    }

    const background = document.querySelector('.slide-background-container')
    const prevButtons = document.querySelectorAll('.prev-image-btn')
    const nextButtons = document.querySelectorAll('.next-image-btn')
    const timerBackground = 4000

    let currentBackground = 1
    let imagesLength = 2
    let moveBackgroundDirection = 1

    let backgroundInterval = setInterval(verifyMoveBackground, timerBackground)
    const resetBackgroundInterval = () => {
        clearInterval(backgroundInterval)
        backgroundInterval = setInterval(verifyMoveBackground, timerBackground)
    }

    prevButtons.forEach(button => button.addEventListener('click', (e) => {
        verifyMoveBackground(e)
        resetBackgroundInterval()
    }))

    nextButtons.forEach(button => button.addEventListener('click', (e) => {
        verifyMoveBackground(e)
        resetBackgroundInterval()
    }))
}

getVideoElements()
getBackgroundElements()