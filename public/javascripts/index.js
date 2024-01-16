const viewWidth = window.innerWidth
const timer = 3000

const background = document.querySelector('.background-desktop-header')
const videoContainer = document.querySelector('.slide-video-container')

const prevButtons = document.querySelectorAll('.prev-image-btn')
const nextButtons = document.querySelectorAll('.next-image-btn')

prevButtons.forEach(button => button.addEventListener('click', moveBackground))
nextButtons.forEach(button => button.addEventListener('click', moveBackground))

prevVideoButton = document.querySelector('.prev-video-btn')
nextVideoButton = document.querySelector('.next-video-btn')

prevVideoButton.addEventListener('click', moveVideo)
nextVideoButton.addEventListener('click', moveVideo)

if (innerWidth >= 992) {
    prevVideoButton.classList.add('hidden')
    nextVideoButton.classList.add('hidden')
} else {
    prevVideoButton.classList.remove('hidden')
    nextVideoButton.classList.remove('hidden')
}

let currentBackground = 1
let imagesLength = 2

let currentVideo = 1
let videosLength = 10
let moveDirection = 1

function moveBackground(e) {
    if (e.clientX > 500) {
        if (currentBackground < imagesLength) {
            background.style.transform = `translateX(-${100 * currentBackground}vw)`
            currentBackground++
        }
    } else {
        if (currentBackground > 1) {
            currentBackground--
            background.style.transform = `translateX(${100 * (currentBackground - 1)}vw)`
        }
    }
}

function moveVideo(e) {
    if (e.clientX > 150) {
        if (currentVideo < videosLength) {
            moveNextVideo(100)
        }
    } else {
        if (currentVideo > 1) {
            movePrevVideo(100)
        }
    }
}

const interval = setInterval(() => {
    if (viewWidth < 992) return

    if (moveDirection === 1) {
        if (currentVideo + 2 < videosLength) {
            moveNextVideo(33.33)
        } else {
            moveDirection = -1
            movePrevVideo(33.33)
        }
    } else if (moveDirection === -1) {
        if (currentVideo > 1) {
            movePrevVideo(33.33)
        } else {
            moveDirection = 1
            moveNextVideo(33.33)
        }
    }
}, timer)

function moveNextVideo(moveValue) {
    videoContainer.style.transform = `translateX(-${(moveValue * currentVideo)}%)`
    currentVideo++
}

function movePrevVideo(moveValue) {
    currentVideo--
    videoContainer.style.transform = `translateX(-${moveValue * (currentVideo - 1)}%)`
}