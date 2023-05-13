const songsContainer = document.querySelector('.window.songs .songs-list')


const customHeaders = {'Content-Type': "application/json"}
let songList = []
let songElems = []
fetch('http://localhost:3000/', {
    method: 'GET',
    contentType: 'application/json',
    headers: customHeaders,
    mode: 'no-cors'
}).then((response) => response.json())
.then((json) => {
    // console.log(json)
    json.forEach(element => {
        songList.push(element)    // console.log(songList)
    });
    displaySongs(songList)
    observeSong()
    // jsonExport(json)
    console.log('YES')
}).catch((err)=>{
    console.log(err)
    console.log('NO')
})

function displaySongs(songList){
    console.log(songList)
    songList.forEach(el =>{
        // console.log(el)
        listSongs(el)
    })
}


function listSongs(el){
    const song = document.createElement('div')
        song.classList.add('song')
        song.classList.add('row')
            const songQN =  document.createElement('div')
                // Adding Classes
                songQN.classList.add('cell')
                songQN.classList.add('no')
                   const QNp = document.createElement('p')
                    QNp.innerHTML = '1'
                   const songPlayBtn = document.createElement('buttton')
                   songPlayBtn.classList.add('play-button')
                    const songPlayBtnIcon = document.createElement('i')
                    songPlayBtnIcon.classList.add('fas')
                    songPlayBtnIcon.classList.add('fa-play')
            const trackTitle =  document.createElement('div')
                // Adding Classes
                trackTitle.classList.add('cell')
                trackTitle.classList.add('title')
                    const songCoverElem = document.createElement('div')
                    songCoverElem.classList.add('cover')
                        const songCoverImg = document.createElement('img')
                        songCoverImg.classList.add('img')
                        const data = el.cover.imageBuffer.data
                        const format = el.cover.imageBuffer.mime
                        let base64String = ""
                        for (let i = 0; i < data.length; i++) {
                            base64String += String.fromCharCode(data[i])
                        }
                        songCoverImg.src = `data:${format};base64,${window.btoa(base64String)}`
                       
                    const songText = document.createElement('div')
                        songText.classList.add('song-text')
                        const songTitle = document.createElement('div')
                        songTitle.classList.add('song-title')
                            const songTitleText = document.createElement('p')
                            songTitleText.innerHTML = el.title
                        const songArtist = document.createElement('div')
                        songArtist.classList.add('song-artist')
                            const songArtistText = document.createElement('p')
                            songArtistText.innerHTML = el.artist       
            const songAlbum =  document.createElement('div')
                // Adding Classes
                songAlbum.classList.add('cell')
                songAlbum.classList.add('album')
                    const songAlbumText = document.querySelector('p')
                    songAlbumText.innerHTML = el.album
            const songOptions =  document.createElement('div')
                // Adding Classes
                songOptions.classList.add('cell')
                songOptions.classList.add('duration')
                    const songOptionsText = document.createElement('p')
                    songOptionsText.innerHTML = '2:46'

        //Append Childs
            songsContainer.appendChild(song)
                song.appendChild(songQN)
                    songQN.appendChild(QNp)
                    songQN.appendChild(songPlayBtn)
                        songPlayBtn.appendChild(songPlayBtnIcon)
                song.appendChild(trackTitle)
                    trackTitle.appendChild(songCoverElem)
                        songCoverElem.appendChild(songCoverImg)
                    trackTitle.appendChild(songText)
                        songText.appendChild(songTitle)
                            songTitle.appendChild(songTitleText)
                        songText.appendChild(songArtist)
                            songArtist.appendChild(songArtistText)
                song.appendChild(songAlbum)
                        songAlbum.appendChild(songAlbumText)
                song.appendChild(songOptions)
                        songOptions.appendChild(songOptionsText)
    songElems.push(song)
}


function observeSong(){
    // console.log(songElems)
    const target = document.querySelectorAll('.window.songs .song')
    // console.log(songCard)
    let options = {
        root: document.querySelector('.songs-container'),
        rootMargin: '0px',
        threshold: 0.5,
    }
    let callback = (entries, observer) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                console.log('entry')
                entry.target.classList.add('show')
            }else{
                console.log('out')
                entry.target.classList.remove('show')
            }
        });
    };


    let observer = new IntersectionObserver(callback, options);
    
    // let target = document.querySelectorAll('.card')
    target.forEach(el => {
        observer.observe(el)
    })

}

// module.exports = observeSong

 