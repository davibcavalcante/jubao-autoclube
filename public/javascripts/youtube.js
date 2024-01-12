async function recentsVideos() {
    const results = await fetch('/api/v1/youtube-videos')
    const data = await results.json()
    console.log(data)
}

recentsVideos()