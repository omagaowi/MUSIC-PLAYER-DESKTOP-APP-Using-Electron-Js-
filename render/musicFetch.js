
const counter = document.querySelector('.count')
const mainAudio = new Audio()
const addedTo = document.querySelector('.added-alert')

    window.electronAPI.handleCounter((event, value) => {
      counter.innerText = value
      console.log(value)
    })


const songsContainer = document.querySelector('.window.songs .songs-list')
const albumContainer = document.querySelector('.window.albums .albums-list')
const artistsContainer = document.querySelector('.window.artists .artists-list')
const dynamicAlbum = document.querySelector('.dynamicAlbum')
const dynamicArtist = document.querySelector('.dynamicArtist')
const dynamicPlaylist = document.querySelector('.dynamicPlaylist')
const albumSongList = document.querySelector('.dynamicAlbum .album-song-list')
const artistSongList = document.querySelector('.dynamicArtist .artist-song-list')

const albumPlayBtn = document.querySelector('.dynamicAlbum .play-album-btn')
const artistPlayBtn = document.querySelector('.dynamicArtist .play-artist-btn')

const albumShuffleElem = document.querySelector('#album-shuffle-check')
const artistShuffleElem = document.querySelector('#artist-shuffle-check')
const repeatElem = document.querySelector('#repeat')

const shuffleAllElem = document.querySelector('#shuffle-all-check')
const playlistShuffleElem = document.querySelector('#playlist-shuffle-check')

let albumShuffle 
let artistShuffle
let shuffleAll
playlistShuffle = localStorage.getItem('playlist-shuffle') || '';


shuffleAllElem.addEventListener('change', ()=>{
    if(shuffleAllElem.checked){
        localStorage.setItem('shuffle-all', 'true')
        shuffleAll = localStorage.getItem('shuffle-all')
        document.querySelector('.shuffle-all').classList.add('checked')
        console.log(shuffleAll)
    }else{
        localStorage.setItem('shuffle-all', 'false')
        shuffleAll = localStorage.getItem('shuffle-all')
        document.querySelector('.shuffle-all').classList.remove('checked')
        console.log(shuffleAll)
    }
})

albumShuffleElem.addEventListener('change', ()=>{
    if(albumShuffleElem.checked){
        localStorage.setItem('album-shuffle', 'true')
        albumShuffle =  localStorage.getItem('album-shuffle')
        document.querySelector('.shuffle-album-btn').classList.add('checked')
        console.log(albumShuffle)
    }else{
        localStorage.setItem('album-shuffle', 'false')
        albumShuffle =  localStorage.getItem('album-shuffle')
        document.querySelector('.shuffle-album-btn').classList.remove('checked')
        console.log(albumShuffle)
    }
})

artistShuffleElem.addEventListener('change', ()=>{
    if(artistShuffleElem.checked){
        localStorage.setItem('artist-shuffle', 'true')
        artistShuffle =  localStorage.getItem('artist-shuffle')
        document.querySelector('.shuffle-artist-btn').classList.add('checked')
        console.log(artistShuffle)
    }else{
        localStorage.setItem('artist-shuffle', 'false')
        artistShuffle =  localStorage.getItem('artist-shuffle')
        document.querySelector('.shuffle-artist-btn').classList.remove('checked')
        console.log(artistShuffle)
    }
})

playlistShuffleElem.addEventListener('change', ()=>{
    if(playlistShuffleElem.checked){
        localStorage.setItem('playlist-shuffle', 'true')
        playlistShuffle =  localStorage.getItem('playlist-shuffle')
        document.querySelector('.shuffle-playlist-btn').classList.add('checked')
        console.log(playlistShuffle)
    }else{
        localStorage.setItem('playlist-shuffle', 'false')
        playlistShuffle =  localStorage.getItem('playlist-shuffle')
        document.querySelector('.shuffle-playlist-btn').classList.remove('checked')
        console.log(playlistShuffle)
    }
})


let onRepeat

repeatElem.addEventListener('change', ()=>{
    if(repeatElem.checked){
        // console.log('checked')
        localStorage.setItem('repeat', true)
        onRepeat = localStorage.getItem('repeat')
        // console.log(onRepeat)
        document.querySelector('.collapsed .options label svg').classList.add('checked')
    }else{
        // console.log('false')
        localStorage.setItem('repeat', false)
        onRepeat = localStorage.getItem('repeat')
        // console.log(onRepeat)
        document.querySelector('.collapsed .options label svg').classList.remove('checked')
    }    
})

document.addEventListener('DOMContentLoaded', ()=>{
    onRepeat = localStorage.getItem('repeat')
    albumShuffle = localStorage.getItem('album-shuffle')
    artistShuffle = localStorage.getItem('artist-shuffle')
    shuffleAll = localStorage.getItem('shuffle-all')

    if(onRepeat == 'true'){
        repeatElem.checked = true
        document.querySelector('.collapsed .options label svg').classList.add('checked')
    }else{
        repeatElem.checked = false
        document.querySelector('.collapsed .options label svg').classList.remove('checked')
    }

    if(albumShuffle == 'true'){
        albumShuffleElem.checked = true
        document.querySelector('.shuffle-album-btn').classList.add('checked')
    }else{
        albumShuffleElem.checked = false
        document.querySelector('.shuffle-album-btn').classList.remove('checked')
    }

    if(artistShuffle == 'true'){
        artistShuffleElem.checked = true
        document.querySelector('.shuffle-artist-btn').classList.add('checked')
    }else{
        artistShuffleElem.checked = false
        document.querySelector('.shuffle-artist-btn').classList.remove('checked')
    }

    if(playlistShuffle == 'true'){
        playlistShuffleElem.checked = true
        document.querySelector('.shuffle-playlist-btn').classList.add('checked')
    }else{
        playlistShuffleElem.checked = false
        document.querySelector('.shuffle-playlist-btn').classList.remove('checked')
    }

    if(shuffleAll == 'true'){
        console.log(shuffleAll)
        shuffleAllElem.checked = true
        document.querySelector('.shuffle-all').classList.add('checked')
    }else{
        shuffleAllElem  .checked = false
        console.log(shuffleAll)
        document.querySelector('.shuffle-all').classList.remove('checked')
    }
})

// const mainAudio = document.querySelector('audio')

const artistColors = ['#663399', '#b90000', '#000096']

let songQueue

const customHeaders = {'Content-Type': "application/json"}
let songList = []
let songElems = []
let albumList = []
let artistList = []
let albumTracklist = []
let playlistList = []
let artistDiscograghy = []
let disFive = []
let newIndex


// localStorage.setItem('playlists', JSON.stringify(playlists))
playlists = JSON.parse(localStorage.getItem('playlists')) || [];


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
    songList = songList.sort((a, b) => a.title.localeCompare(b.title));
    displaySongs(songList)
    displayPlaylists(playlists)
    songlistSetup(songList)
    getAlbums(songList)
    getArtists(songList)
    popoutAlbum(songList)
    popoutArtist(songList)
    observeSong()
    songOptions(songList)
  
    
    // jsonExport(json)
    console.log('YES')
}).catch((err)=>{
    console.log(err)
    console.log('NO')
})
function displaySongs(songList){
    // console.log(songList)
    songList.forEach(el =>{
        // console.log(el)
        listSongs(el, songList)
    })
}
function listSongs(el, songList){
    const songInd = songList.indexOf(el)
    const songNo = songList.indexOf(el) + 1    
    let base64String = ""
    let coverURL

    if(el.cover == 'unknown cover'){
        // console.log('no')
        coverURL = './pics/music.png'
    }else{
        // console.log('yes')
        const data = el.cover.imageBuffer.data
        const format = el.cover.imageBuffer.mime
        for (let i = 0; i < data.length; i++) {
            base64String += String.fromCharCode(data[i])
       }
       coverURL = `data:${format};base64,${window.btoa(base64String)}`
    }

    const song = `
        <div class="row song" data-index="${songInd}">
        <div class="cell no"><p>${songNo}</p>
            <button class="play-button" data-index="${songInd}">
                <i class="fas fa-play"></i>
            </button>
        </div>
        <div class="cell title">
            <div class="cover">
                <img class="img" src="${coverURL}" alt="">
            </div>
            <div class="song-text">
                <div class="song-title">
                    <p data-index="${songInd}">${el.title}</p>
                </div>
                <div class="song-artist">
                    <p data-artist="${el.artist}">${el.artist}</p>
                </div>
            </div>
        </div>
        <div class="cell album" data-album="${el.album}">${el.album}</div>
        <div class="cell duration">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
         <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
    	</svg>
        </div>
        <div class="options-list">
            <div class="options-overflow">
                    <div class="part playlist-add" data-pathid="${el.path}">
                        <i class="fas fa-plus"></i>
                        <p>Add to Playlist</p>
                    </div>
                    <div class="part queue-add" data-pathid="${el.path}">
                        <i class="fas fa-plus"></i>
                        <p>Add to Queue</p>
                    </div>
                    <div class="part play-next" data-pathid="${el.path}">
                        <i class="fas fa-play"></i>
                        <p>Play Next</p>
                    </div>
                    <div class="part view-artist" data-artist="${el.artist}">
                        <i class="fas fa-user"></i>
                        <p>View Artist</p>
                    </div>
                    <div class="part view-album" data-album="${el.album}">
                        <i class="fas fa-record-vinyl"></i>
                        <p>View Album</p>
                    </div>
            </div>
        </div>
    </div>
    `
    songsContainer.innerHTML += song
    songElems.push(song)
    // playSong(songList, songNo)
}

document.querySelector('.add-new').addEventListener('click', ()=>{
   const playlistLength = playlists.length;
//    console.log(playlistLength)
   document.querySelector('.add-new-playlist input').value = `#Playlist${playlistLength}`
})


document.querySelector('.add-new-playlist button').addEventListener('click', ()=>{
    const playlistName = document.querySelector('.add-new-playlist input').value;
    createPlaylists(playlistName)
    document.querySelector('.add-new-playlist').classList.remove('show')
})

function createPlaylists(playlistName){
    const playlist = {
        playlistName: playlistName,
        songs: []
    }
    // console.log(playlist)
    playlists.push(playlist)
    localStorage.setItem('playlists', JSON.stringify(playlists))
    displayPlaylists(playlists)
}

function displayPlaylists(playlists){
    const playlistsElem = document.querySelector('.playlist-overflow')
    playlistsElem.innerHTML = ''
    const mainELem = document.querySelector('.main')
    playlists.forEach((el, index) => {
        const playlistCard = document.createElement('div')
        const playListCover = document.createElement('div')
        const playlistCoverImg = document.createElement('img')
        const playListCardTitle = document.createElement('div')
        const playlistTitleP = document.createElement('p')
        const deleteBtn = document.createElement('button')

      

        deleteBtn.setAttribute('data-index', index)
        const deleteIcon = document.createElement('i')


        playlistCard.appendChild(playListCover)
            playListCover.appendChild(playlistCoverImg)
        playlistCard.appendChild(playListCardTitle)
            playListCardTitle.appendChild(playlistTitleP)
        playlistCard.appendChild(deleteBtn)
            deleteBtn.appendChild(deleteIcon)
            
        playlistCard.classList.add('playlist-card')
        playListCover.classList.add('playlist-cover')
        playListCardTitle.classList.add('playlist-card-title')
        deleteBtn.classList.add('delete-playlist')
        deleteIcon.classList.add('fas')
        deleteIcon.classList.add('fa-trash')

        playlistCoverImg.src = './pics/music.png'
        playlistTitleP.innerHTML = `${el.playlistName}`

        const confirmDelete =  document.createElement('div')
        const confirmH3 =  document.createElement('h3')
        const fullDelete =  document.createElement('button')
        const fullDeleteIcon =  document.createElement('i')

        confirmDelete.appendChild(confirmH3)
        confirmDelete.appendChild(fullDelete)

        
        
        confirmDelete.classList.add('delete-playlist-confirm')
        fullDelete.classList.add('fulldelete-btn')
        fullDeleteIcon.classList.add('fas')
        fullDeleteIcon.classList.add('fa-trash')
        fullDelete.appendChild(fullDeleteIcon)
        fullDelete.innerHTML += 'Delete';
        confirmH3.innerHTML = 'Delete Playlist?'
        mainELem.appendChild(confirmDelete)

        confirmH3.classList.add('confirm-h3')
        fullDelete.classList.add('full-delete')


        playlistsElem.appendChild(playlistCard)
        deleteBtn.addEventListener('click', ()=>{
            const index = deleteBtn.dataset.index;
            console.log(index)
            confirmDelete.classList.add('show')
            fullDelete.addEventListener('click', ()=>{
                console.log('click')
                playlists.splice(index, 1)
                localStorage.setItem('playlists', JSON.stringify(playlists))
                displayPlaylists(playlists)
                confirmDelete.classList.remove('show')
            })
        })

        document.addEventListener('click', (e)=>{
            if (!confirmDelete.contains(e.target) && !deleteBtn.contains(e.target)){
                confirmDelete.classList.remove('show')
              }
        })

        playListCardTitle.addEventListener('click', ()=>{
            gatherPlayList(el)
        })
    })
   
}


function gatherPlayList(playlistEl){
     playlistList = []
    //  console.log(playlistEl)
     playlistEl.songs.forEach(song => {
        const oneSong = songList.filter(function(el) {
           return el.path == song
        })
        // console.log(oneSong[0])
        playlistList.push(oneSong[0])
     })
    // console.log(playlistList)
    popoutPlaylist(playlistEl, playlistList)
}

function popoutPlaylist(playlistEl, playlistList){
    dynamicPlaylist.classList.add('show')
    document.querySelector('.full-player').classList.remove('full')
    // console.log(album.dataset.albumname)
    dynamicAlbum.classList.remove('show')
    dynamicArtist.classList.remove('show')
    document.querySelector('.playlist-close').addEventListener('click', ()=>{
        dynamicPlaylist.classList.remove('show')
    })
    document.querySelector('.dynamicPlaylist .artist-title').innerHTML = playlistEl.playlistName;
    document.querySelector('.dynamicPlaylist .artist-artist').innerHTML = `Playlist.${playlistEl.songs.length} songs`;
    const playlistOverflow = document.querySelector('.dynamicPlaylist .artist-song-list')
    playlistOverflow.innerHTML = ''
   
    
    playlistList.forEach((song, index) => {
        let playlistbase64String = ""
        let playlistcoverURL
        if(song.cover == 'unknown cover'){
            // console.log('no')
            playlistcoverURL = './pics/music.png'
        }else{
            // console.log('yes')
            const data = song.cover.imageBuffer.data
            const format = song.cover.imageBuffer.mime
            for (let i = 0; i < data.length; i++) {
                playlistbase64String += String.fromCharCode(data[i])
           }
           playlistcoverURL = `data:${format};base64,${window.btoa(playlistbase64String)}`
        }

        const playlistSong = `
                <div class="row song show">
                <div class="cell title">
                    <div class="cover">
                        <img class="img" src="${playlistcoverURL}" alt="">
                        <button class="play-button" data-index="${index}">
                            <i class="fas fa-play"></i>
                         </button>
                    </div>
                    <div class="song-text">
                        <div class="song-title" data-index="${index}">
                            <p>${song.title}</p>
                        </div>
                        <div class="song-artist">
                            <p>${song.artist}</p>
                        </div>
                    </div>
                </div>
                <div class="cell options">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
                </div>
                <div class="options-list">
                    <div class="options-overflow">
                            <div class="part playlist-add" data-pathid="${song.path}">
                                <i class="fas fa-plus"></i>
                                <p>Add to Playlist</p>
                            </div>
                            <div class="part queue-add" data-pathid="${song.path}">
                                <i class="fas fa-plus"></i>
                                <p>Add to Queue</p>
                            </div>
                            <div class="part play-next" data-pathid="${song.path}">
                                <i class="fas fa-play"></i>
                                <p>Play Next</p>
                            </div>
                            <div class="part view-artist" data-artist="${song.artist}">
                                <i class="fas fa-user"></i>
                                <p>View Artist</p>
                            </div>
                            <div class="part view-album" data-album="${song.album}">
                                <i class="fas fa-record-vinyl"></i>
                                <p>View Album</p>
                            </div>
                    </div>
                </div>  
            </div>
        `
        playlistOverflow.innerHTML += playlistSong;

    })
    playlistActions(playlistList)
}

function playlistActions(playlistList){
    const allPlaylistPlayBtn = document.querySelectorAll('.dynamicPlaylist .song .play-button')
    const allPlaylistSongTitle = document.querySelectorAll('.dynamicPlaylist .song .song-title')
    const allPlaylistSongs = document.querySelectorAll('.dynamicPlaylist .song')
    const allArtistCards = document.querySelectorAll('.artist-card')
    const allAlbumCards = document.querySelectorAll('.album-card')
    const playlistPlayBtn = document.querySelector('.play-playlist-btn')

    
    // console.log(allPlaylistPlayBtn)
    allPlaylistPlayBtn.forEach(btn =>{
        btn.addEventListener('click', ()=>{
            loadToQueue(btn.dataset.index, playlistList)
        })
    })
    allPlaylistSongTitle.forEach(btn =>{
        btn.addEventListener('click', ()=>{
            loadToQueue(btn.dataset.index, playlistList)
        })
    })

    allPlaylistSongs.forEach(song =>{
        song.children[1].addEventListener('click', ()=>{
            song.children[2].classList.toggle('show')
            song.classList.toggle('lift')
        })

        song.children[2].addEventListener('click', ()=>{
            song.children[2].classList.remove('show')
            song.classList.remove('lift')
        })

        song.children[1].addEventListener('contextmenu', (e)=>{
            e.preventDefault()
            song.children[2].classList.toggle('show')
            song.classList.toggle('lift')
        })


        document.addEventListener('click', (e)=>{
                if (!song.children[2].contains(e.target) && !song.children[1].contains(e.target)){
                    // console.log('User clicked outside of the div');
                    song.children[2].classList.remove('show')
                    song.classList.remove('lift')
                  }
         })
         
    })

    const allSongPlayNext = document.querySelectorAll('.dynamicPlaylist .artist-song-list .play-next')
    allSongPlayNext.forEach(playnext => {
        playnext.addEventListener('click', ()=>{
            // console.log('click')
            const nextIndex = Number(newIndex) + 1;
            // console.log(nextIndex)
            // console.log(playnext.dataset.pathid)
            const songNext = songList.filter(function(el){
                return el.path == playnext.dataset.pathid;
            })
            // console.log(songNext[0])
            songQueue.splice(nextIndex, 0, songNext[0])
            // console.log(songQueue)
            displayQueue(songQueue, newIndex)
            addedTo.classList.add('show')
            document.querySelector('.added-alert h4').innerHTML = 'Song will play next'
            setTimeout(function(){
                addedTo.classList.remove('show')
            }, 1300)
        })
    })

    const allSongAddQueue = document.querySelectorAll('.dynamicPlaylist .artist-song-list .queue-add')
    allSongAddQueue.forEach(playlast => {
        playlast.addEventListener('click', ()=>{
            const songLast = songList.filter(function(el){
                return el.path == playlast.dataset.pathid;
            })
            songQueue.push(songLast[0])
            displayQueue(songQueue, newIndex)
            addedTo.classList.add('show')
            document.querySelector('.added-alert h4').innerHTML = 'Added To Queue'
            setTimeout(function(){
                addedTo.classList.remove('show')
            }, 1300)
        })
    })

    const optionArtists = document.querySelectorAll('.dynamicPlaylist .artist-song-list .view-artist')
    optionArtists.forEach(link =>{
        const thisArtist = Array.from(allArtistCards).filter(function(el){
            return el.dataset.artistname == link.dataset.artist
        })
        link.addEventListener('click', ()=>{
            const artist = thisArtist[0]            
            displayArtistWindow(songList, artist)
        })
    })

    const optionAlbums = document.querySelectorAll('.dynamicPlaylist .artist-song-list .view-album')
    optionAlbums.forEach(link =>{
        const thisAlbum = Array.from(allAlbumCards).filter(function(el){
            return el.dataset.albumname == link.dataset.album
        })
        link.addEventListener('click', ()=>{
            // console.log(link.parentNode.parentElement)
            const album = thisAlbum[0]
            displayAlbumWindow(songList, album)
        })
    })

    playlistPlayBtn.addEventListener('click', ()=>{
        // playlistShuffle = localStorage.getItem('playlist-shuffle')
        if(playlistShuffle == 'true'){
            console.log(albumShuffle)
            playlistList = playlistList.sort(() => Math.random() - 0.5);
            const trackIndex = 0
            loadToQueue(trackIndex, playlistList)
        }else{         
            playlistList = playlistList.sort((a, b) => a.trackNo - b.trackNo);
            console.log(albumShuffle)
             const trackIndex = 0
            loadToQueue(trackIndex, playlistList)
        }
    })


}



function songOptions(songList){
    const allSongs = document.querySelectorAll('.songs-list .song')
    const allAlbumLinks = document.querySelectorAll('.songs-list .song .album')
    const allArtistLinks = document.querySelectorAll('.songs-list .song .song-artist p')
    const allAlbumCards = document.querySelectorAll('.album-card')
    const allArtistCards = document.querySelectorAll('.artist-card')
    const optionAlbums = document.querySelectorAll('.options-list .view-album')
    const optionArtists = document.querySelectorAll('.options-list .view-artist')
    const optionAddPlaylist = document.querySelectorAll('.songs-list .playlist-add')



    allSongs.forEach(song =>{
        song.children[3].addEventListener('click', ()=>{
            song.children[4].classList.toggle('show')
            song.classList.toggle('lift')
        })

        song.children[3].addEventListener('contextmenu', (e)=>{
            e.preventDefault()
            song.children[4].classList.toggle('show')
            song.classList.toggle('lift')
        })

        song.children[4].addEventListener('click', ()=>{
            song.children[4].classList.remove('show')
            song.classList.remove('lift')
        })




        document.addEventListener('click', (e)=>{
                if (!song.children[4].contains(e.target) && !song.children[3].contains(e.target)){
                    // console.log('User clicked outside of the div');
                    song.children[4].classList.remove('show')
                    song.classList.remove('lift')
                  }
         })
    })
    allAlbumLinks.forEach(link =>{
        const thisAlbum = Array.from(allAlbumCards).filter(function(el){
            return el.dataset.albumname == link.dataset.album
        })
        link.addEventListener('click', ()=>{
            const album = thisAlbum[0]
            displayAlbumWindow(songList, album)
        })
    })

    optionAlbums.forEach(link =>{
        const thisAlbum = Array.from(allAlbumCards).filter(function(el){
            return el.dataset.albumname == link.dataset.album
        })
        link.addEventListener('click', ()=>{
            // console.log(link.parentNode.parentElement)
            const album = thisAlbum[0]
            displayAlbumWindow(songList, album)
        })
    })

    allArtistLinks.forEach(link =>{
        const thisArtist = Array.from(allArtistCards).filter(function(el){
            return el.dataset.artistname == link.dataset.artist
        })
        link.addEventListener('click', ()=>{
            const artist = thisArtist[0]            
            displayArtistWindow(songList, artist)
        })
    })

    optionArtists.forEach(link =>{
        const thisArtist = Array.from(allArtistCards).filter(function(el){
            return el.dataset.artistname == link.dataset.artist
        })
        link.addEventListener('click', ()=>{

            const artist = thisArtist[0]            
            displayArtistWindow(songList, artist)
           
        })
    })

    const allSongPlayNext = document.querySelectorAll('.songs-list .play-next')
    allSongPlayNext.forEach(playnext => {
        playnext.addEventListener('click', ()=>{
            // console.log('click')
            const nextIndex = Number(newIndex) + 1;
            // console.log(nextIndex)
            // console.log(playnext.dataset.pathid)
            const songNext = songList.filter(function(el){
                return el.path == playnext.dataset.pathid;
            })
            // console.log(songNext[0])
            songQueue.splice(nextIndex, 0, songNext[0])
            // console.log(songQueue)
            displayQueue(songQueue, newIndex)
            addedTo.classList.add('show')
            document.querySelector('.added-alert h4').innerHTML = 'Song will play next'
            setTimeout(function(){
                addedTo.classList.remove('show')
            }, 1300)
        })
    })

    const allSongAddQueue = document.querySelectorAll('.songs-list .queue-add')
    allSongAddQueue.forEach(playlast => {
        playlast.addEventListener('click', ()=>{
            const songLast = songList.filter(function(el){
                return el.path == playlast.dataset.pathid;
            })
            songQueue.push(songLast[0])
            displayQueue(songQueue, newIndex)
            addedTo.classList.add('show')
            document.querySelector('.added-alert h4').innerHTML = 'Added To Queue'
            setTimeout(function(){
                addedTo.classList.remove('show')
            }, 1300)
        })
    })

    const playlistAddContainer = document.querySelector('.my-playlist-list')
    const plWindow = document.querySelector('.add-playlist-window')
    optionAddPlaylist.forEach(addPlaylist => {
        // console.log(addPlaylist)
        addPlaylist.addEventListener('click', ()=>{
            console.log('click')
            document.querySelector('.new-playlist-name').value = `#Playlist${playlists.length}`
            document.querySelector('.add-playlist-window').classList.add('show')
            document.querySelector('.close-pl-window').addEventListener('click', ()=>{
                document.querySelector('.add-playlist-window').classList.remove('show')
            })
            playlistAddContainer.innerHTML = ''
            // console.log(playlists)
            playlists.forEach(playlist=>{
                const playlistButton = document.createElement('button')
                playlistButton.classList.add('playlist')
                playlistButton.innerHTML = playlist.playlistName;
                playlistAddContainer.appendChild(playlistButton)
                playlistButton.addEventListener('click', ()=>{
                    const thisPlaylist = playlists.filter(function(el){
                        return el.playlistName == playlistButton.textContent;
                    })
                    // console.log(thisPlaylist)
                    thisPlaylist[0].songs.push(addPlaylist.dataset.pathid)
                    // console.log(playlists)
                    localStorage.setItem('playlists', JSON.stringify(playlists))
                    document.querySelector('.add-playlist-window').classList.remove('show')
                })
            })
            document.querySelector('.new-p-add').addEventListener('click', ()=>{
                const newPlaylistName = document.querySelector('.new-playlist-name').value
                console.log(newPlaylistName)
                createPlaylists(newPlaylistName)
                const thisPlaylist = playlists.filter(function(el){
                    return el.playlistName == newPlaylistName;
                })
                // console.log(thisPlaylist)
                thisPlaylist[0].songs.push(addPlaylist.dataset.pathid)
                // console.log(playlists)
                localStorage.setItem('playlists', JSON.stringify(playlists))
                document.querySelector('.add-playlist-window').classList.remove('show')
            })
        })
      
    })



}

function songlistSetup(songList){
    const songsRowTitle = document.querySelectorAll('.window.songs .song .song-title p')
    const songPlayBtns = document.querySelectorAll('.window.songs .song .play-button')
    const playSongBtn = document.querySelector('.play-all')
    // console.log(songsRow)


    songsRowTitle.forEach(song =>{
        song.addEventListener('click', ()=>{
            const songIndex = song.dataset.index
            // console.log(songList[songIndex])
            songList = songList.sort((a, b) => a.title.localeCompare(b.title));
            loadToQueue(songIndex, songList)
        })
    })

    songPlayBtns.forEach(song =>{
        song.addEventListener('click', ()=>{
            const songIndex = song.dataset.index
            // console.log(songList[songIndex])
            songList = songList.sort((a, b) => a.title.localeCompare(b.title));
            loadToQueue(songIndex, songList)
        })
    })

    playSongBtn.addEventListener('click', ()=>{
        if(shuffleAll == 'true'){
            const songIndex = 0
            songList = songList.sort(() => Math.random() - 0.5);
            loadToQueue(songIndex, songList)
        }else{
            const songIndex = 0
            songList = songList.sort((a, b) => a.title.localeCompare(b.title));
            loadToQueue(songIndex, songList)
        }

    })


}




function getAlbums(songList){
    function groupSongsByAlbums(arr, property) {
        return arr.reduce((groupedElements, element) => {
          const propertyValue = element[property];
      
          if (!groupedElements[propertyValue]) {
            groupedElements[propertyValue] = [];
          }
      
          groupedElements[propertyValue].push(element);
          return groupedElements;
        }, {});
    }
      
      const groupedPersons = groupSongsByAlbums(songList, 'album');
      for (property in groupedPersons){
        if(groupedPersons.hasOwnProperty(property)){
            // console.log(property)
            // console.log(groupedPersons[property])
            const albumXCover = {
                albumName: property,
                albumCover: groupedPersons[property][0].cover,
                albumArtist: groupedPersons[property][0].artist,
                albumYear: groupedPersons[property][0].year
            }
            // console.log(albumXCover)
            albumList.push(albumXCover)
        }
      }
      albumList = albumList.sort((a, b) => a.albumName.localeCompare(b.albumName));
      displayAlbums(albumList)
}


function displayAlbums(albumList){
    // console.log(albumList)
    albumList.forEach(alb => {    
        let albumBase64String = ""
        let albumCover
    
        if(alb.albumCover == 'unknown cover'){
            // console.log('no')
            albumCover = './pics/music.png'
        }else{
            // console.log('yes')
            const albumData = alb.albumCover.imageBuffer.data
             const albumFormat = alb.albumCover.imageBuffer.mime
            for (let i = 0; i < albumData.length; i++) {
                albumBase64String += String.fromCharCode(albumData[i])
            }
            albumCover = `data:${albumFormat};base64,${window.btoa(albumBase64String)}`
        }

        const albumCard = `
        <div class="album-card" id="album-card${albumList.indexOf(alb)}" data-albumName="${alb.albumName}"  data-albumArtist="${alb.albumArtist}" data-albumName="${alb.albumName}" data-albumCover="${albumCover}" data-albumYear="${alb.albumYear}">
            <div class="album-cover">
                <img src="${albumCover}" alt="">
            </div>
            <div class="album-card-text">
                <div class="album-card-title"><p>${alb.albumName}</p></div>
                <div class="album-card-artist"><p>${alb.albumArtist}</p></div>
            </div>
        </div>
        `
        albumContainer.innerHTML += albumCard;
        // const albumDOM = document.getElementById(`album-card${albumList.indexOf(alb)}`)
        // console.log(albumDOM)
        // albumDOM.addEventListener('click', ()=>{
        //     console.log('click')
        // })


    })
}


function getArtists(){
    function groupSongsByArtists(arr, property) {
        return arr.reduce((groupedSongs, element) => {
          const propertyValue = element[property];
      
          if (!groupedSongs[propertyValue]) {
            groupedSongs[propertyValue] = [];
          }
      
          groupedSongs[propertyValue].push(element);
          return groupedSongs;
        }, {});
    }
      
      const groupedArtists = groupSongsByArtists(songList, 'artist');
      for (property in groupedArtists){
        if(groupedArtists.hasOwnProperty(property)){
            // console.log(property)
            artistList.push(property)
            // console.log(groupedArtists[property])
        }
      }
      artistList = artistList.sort((a, b) => a.localeCompare(b));
      displayArtists(artistList)
}

function displayArtists(artistList){
    // console.log(artistList)
    artistList.forEach(art =>{
        const artistCard = `
            <div class="artist-card" data-artistName="${art}">
                <div class="artist-cover">
                    <img src="./pics/artist2.png" alt="">
                </div>
                <div class="artist-card-text">
                    <div class="artist-card-name"><p>${art}</p></div>
                </div>
            </div>
        `
        artistsContainer.innerHTML += artistCard;
    })
}


function popoutAlbum(songList){
   const allAlbums = document.querySelectorAll('.album-card')
//    console.log(allAlbums)
   allAlbums.forEach(album =>{
        album.addEventListener('click', ()=>{
            displayAlbumWindow(songList, album)
        })
   })
}

function displayAlbumWindow(songList, album){
        const albumTitle = album.dataset.albumname
        document.querySelector('.full-player').classList.remove('full')
        // console.log(album.dataset.albumname)
        dynamicAlbum.classList.add('show')
        dynamicArtist.classList.remove('show')
        dynamicPlaylist.classList.remove('show')
        if(album.dataset.albumname == 'unknown album'){
            document.querySelector('.dynamicAlbum .album-artist p').innerHTML = ''
            document.querySelector('.dynamicAlbum .album-year').innerHTML = ''
        }else{
            document.querySelector('.dynamicAlbum .album-artist p').innerHTML = album.dataset.albumartist
            document.querySelector('.dynamicAlbum .album-year').innerHTML = album.dataset.albumyear
        }
        document.querySelector('.dynamicAlbum .album-cover img').src = album.dataset.albumcover
        document.querySelector('.dynamicAlbum .album-title p').innerHTML = album.dataset.albumname
        document.querySelector('.album-close').classList.add('show')
        getTrackList(songList, albumTitle)
        document.querySelector('.album-close').addEventListener('click', ()=>{
            dynamicAlbum.classList.remove('show')
            // document.querySelector('.album-close').classList.remove('show')
        })
}


function popoutArtist(songList, artistColors){
    const allArtists = document.querySelectorAll('.artist-card')
    // console.log(allArtists)
    allArtists.forEach(artist => {
        artist.addEventListener('click', ()=>{
            displayArtistWindow(songList, artist)
        })
    })

}

function displayArtistWindow(songList, artist){
        const artistName = artist.dataset.artistname
        document.querySelector('.full-player').classList.remove('full')
        dynamicArtist.classList.add('show')
        dynamicAlbum.classList.remove('show')
        dynamicPlaylist.classList.remove('show')
        getDiscography(songList, artistName)
        document.querySelector('.artist-close').addEventListener('click', ()=>{
            dynamicArtist.classList.remove('show')
            // document.querySelector('.album-close').classList.remove('show')
        })
}

function getDiscography(songList, artistName){
    artistDiscograghy = []
    artistSongList.innerHTML = ''
    // console.log(artistName)
    document.querySelector('.artist-title').innerHTML = artistName
    artistDiscograghy = songList.filter(function(el){
        return el.artist == artistName
    })
    // console.log(artistDiscograghy)
    artistDiscograghy.forEach(disc =>{
        const discInd = artistDiscograghy.indexOf(disc)
        let Artistbase64String = ""
        let discCoverURL

        if(disc.cover == 'unknown cover'){
            // console.log('no')
            discCoverURL = './pics/music.png'
        }else{
            // console.log('yes')
            const discData = disc.cover.imageBuffer.data
             const discFormat = disc.cover.imageBuffer.mime
            for (let i = 0; i < discData.length; i++) {
                Artistbase64String += String.fromCharCode(discData[i])
            }
            discCoverURL = `data:${discFormat};base64,${window.btoa(Artistbase64String)}`
        }
        


       const artistSong = `
        <div class="row song" data-index="${discInd}">
            <div class="cell title">
                <div class="cover">
                    <img class="img" src="${discCoverURL}" alt="">
                    <button class="play-button" data-index="${discInd}">
                         <i class="fas fa-play"></i>
                    </button>
                </div>
                <div class="song-text">
                    <div class="song-title">
                        <p data-index="${discInd}">${disc.title}</p>
                    </div>
                    <div class="song-artist">
                        <p>${disc.artist}</p>
                    </div>
                </div>
            </div>
            <div class="cell options">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                        <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                </svg>
            </div>
            <div class="options-list">
                            <div class="options-overflow">
                                <div class="part playlist-add" data-pathid="${disc.path}">
                                    <i class="fas fa-plus"></i>
                                    <p>Add to Playlist</p>
                                </div>
                                <div class="part queue-add" data-pathid="${disc.path}">
                                    <i class="fas fa-plus"></i>
                                    <p>Add to Queue</p>
                                </div>
                                <div class="part play-next" data-pathid="${disc.path}">
                                    <i class="fas fa-play"></i>
                                    <p>Play Next</p>
                                </div>
                            </div>
                </div>
        </div>
        `
        artistSongList.innerHTML += artistSong
    })
    discographySetup(artistDiscograghy)
    artistSongOptions()
    observeDiscography()
}



function getTrackList(songList, albumTitle){
    albumSongList.innerHTML = ''
    albumTracklist = []
    albumTracklist = songList.filter(function(el){
        return el.album == albumTitle
    })
    albumTracklist = albumTracklist.sort((a, b) => a.trackNo - b.trackNo);
    
    // console.log(albumTracklist)
    albumTracklist.forEach(track => {
        const trackIn = albumTracklist.indexOf(track)
        const albumSong = `
            <div class="song" data-index="${trackIn}">
                <div class="song-no cell">
                    <p>${track.trackNo}</p>
                    <button class="play-button" data-index="${trackIn}">
                         <i class="fas fa-play"></i>
                    </button>
                </div>
                <div class="song-text cell">
                    <div class="song-title">
                        <p data-index="${trackIn}">${track.title}</p>
                    </div>
                    <div class="song-artist">
                        <p>${track.artist}</p>
                    </div>
                </div>
                <div class="song-options cell">
                    <button class="album-song-options">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                        </svg>
                    </button>
                </div>
                <div class="options-list">
                            <div class="options-overflow">
                                <div class="part playlist-add" data-pathid="${track.path}">
                                    <i class="fas fa-plus"></i>
                                    <p>Add to Playlist</p>
                                </div>
                                <div class="part queue-add" data-pathid="${track.path}">
                                    <i class="fas fa-plus"></i>
                                    <p>Add to Queue</p>
                                </div>
                                <div class="part play-next" data-pathid="${track.path}">
                                    <i class="fas fa-play"></i>
                                    <p>Play Next</p>
                                </div>
                            </div>
                </div>
            </div>
        `
        albumSongList.innerHTML += albumSong
    })
    albumSetup(albumTracklist)
    albumSongOptions()
}

function albumSetup(albumTracklist) {
    const allTracksPlayBtn = document.querySelectorAll('.dynamicAlbum .song .play-button')
    const allTracksTitle = document.querySelectorAll('.dynamicAlbum .song .song-title p')
    // console.log(allTracks)

    allTracksPlayBtn.forEach(track =>{
        track.addEventListener('click', ()=>{
            const trackIndex = track.dataset.index
            albumTracklist = albumTracklist.sort((a, b) => a.trackNo - b.trackNo);
            // console.log(trackIndex)
        //    console.log(albumTracklist[trackIndex])
           loadToQueue(trackIndex, albumTracklist)
        })
    })

    allTracksTitle.forEach(track =>{
        track.addEventListener('click', ()=>{
            const trackIndex = track.dataset.index
            albumTracklist = albumTracklist.sort((a, b) => a.trackNo - b.trackNo);
            // console.log(trackIndex)
        //    console.log(albumTracklist[trackIndex])
           loadToQueue(trackIndex, albumTracklist)
        })
    })

    
    albumPlayBtn.addEventListener('click', ()=>{
        if(albumShuffle == 'true'){
            console.log(albumShuffle)
            albumTracklist = albumTracklist.sort(() => Math.random() - 0.5);
            const trackIndex = 0
            loadToQueue(trackIndex, albumTracklist)
        }else{         
            albumTracklist = albumTracklist.sort((a, b) => a.trackNo - b.trackNo);
            console.log(albumShuffle)
             const trackIndex = 0
            loadToQueue(trackIndex, albumTracklist)
        }
    })
}

function discographySetup(artistDiscograghy){
    const allDiscBtns= document.querySelectorAll('.dynamicArtist .song .play-button')
    const allDiscTitle = document.querySelectorAll('.dynamicArtist .song .song-title p')
    // console.log(allDiscs)

    allDiscBtns.forEach(disc =>{
        disc.addEventListener('click', ()=>{
            const discIndex = disc.dataset.index
            artistDiscograghy = artistDiscograghy.sort((a, b) => a.title.localeCompare(b.title));
            // console.log(trackIndex)
        //    console.log(albumTracklist[trackIndex])
           loadToQueue(discIndex, artistDiscograghy)
        })
    })

    allDiscTitle.forEach(disc =>{
        disc.addEventListener('click', ()=>{
            const discIndex = disc.dataset.index
            artistDiscograghy = artistDiscograghy.sort((a, b) => a.title.localeCompare(b.title));
        
           loadToQueue(discIndex, artistDiscograghy)
        })
    })

 
        artistPlayBtn.addEventListener('click', ()=>{
            if(artistShuffle == 'true'){
                artistDiscograghy = artistDiscograghy.sort(() => Math.random() - 0.5);
                    const discIndex = 0
                    loadToQueue(discIndex, artistDiscograghy)
            }else{
                artistDiscograghy = artistDiscograghy.sort((a, b) => a.title.localeCompare(b.title));
                const discIndex = 0
                loadToQueue(discIndex, artistDiscograghy)
            }
        })
}

function loadToQueue(songIndex, queueList){
    songQueue = []
    newIndex = songIndex
    queueList.forEach(element => {
        songQueue.push(element)
    })
    playSong(songQueue, songIndex)
}


const prevBtn = document.querySelector('.prev')
const nextBtn = document.querySelector('.next')
const range =  document.querySelector('.seek input')

function playSong(songQueue, newIndex){
    console.log(newIndex)
    const last = +songQueue.length - +newIndex
    displayQueue(songQueue, newIndex)
    // console.log(newIndex)

    const playBtn = document.querySelector('.playBtn')
    const pauseBtn = document.querySelector('.pauseBtn')
    const volumeBtn = document.querySelector('.volumeBtn')
    const mutedBtn = document.querySelector('.mutedBtn')


    
   
    //Albums
    const allAlbumCards = document.querySelectorAll('.album-card')
    const allArtistCards = document.querySelectorAll('.artist-card')

    

    const currentSong = songQueue[newIndex]
    // console.log(songQueue)
    let currentCover
     let currentSongBase64String = ""
    
    if(currentSong.cover == 'unknown cover'){
        // console.log('no')
        currentCover = './pics/music.png'
    }else{
        // console.log('yes')
        const data = currentSong.cover.imageBuffer.data
         const format = currentSong.cover.imageBuffer.mime
        for (let i = 0; i < data.length; i++) {
            currentSongBase64String += String.fromCharCode(data[i])
        }
        currentCover = `data:${format};base64,${window.btoa(currentSongBase64String)}`
    }
    // console.log(currentSong)
    mainAudio.src = currentSong.path
    mainAudio.play()
    playBtn.classList.remove('play')
    

    document.querySelector('.collapsed .cover img').src = currentCover
    document.querySelector('.full-player .picture img').src = currentCover
    document.querySelector('.collapsed .song-title p').innerHTML = currentSong.title
    document.querySelector('.collapsed .song-artist p').innerHTML = currentSong.artist
    document.querySelector('.collapsed .view-artist').dataset.artist = currentSong.artist
    document.querySelector('.collapsed .view-album').dataset.album = currentSong.album
    // document.querySelector('.currentTime p').innerHTML = mainAudio.currentTime;

    document.querySelector('.collapsed .view-artist').addEventListener('click', (e)=>{
        const optionClicked = document.querySelector('.collapsed .view-artist')
        const thisArtist = Array.from(allArtistCards).filter(function(el){
            return el.dataset.artistname == optionClicked.dataset.artist
        })
       
        const artist = thisArtist[0]
        displayArtistWindow(songList, artist)
    })

    document.querySelector('.collapsed .view-album').addEventListener('click', (e)=>{
        const optionClicked = document.querySelector('.collapsed .view-album')
        const thisAlbum = Array.from(allAlbumCards).filter(function(el){
            return el.dataset.albumname == optionClicked.dataset.album
        })

        const album = thisAlbum[0]
        displayAlbumWindow(songList, album)
    })

    mainAudio.addEventListener('pause', ()=>{
        playBtn.classList.add('play')
        document.querySelectorAll('.queue .bar').forEach(bar => {
            bar.classList.add('paused')
        })
    })

    mainAudio.addEventListener('play', ()=>{
        playBtn.classList.remove('play')
        document.querySelectorAll('.queue .bar').forEach(bar => {
            bar.classList.remove('paused')
        })
    })

    playBtn.addEventListener('click', ()=>{
        mainAudio.play()
        playBtn.classList.remove('play')
        document.querySelectorAll('.queue .bar').forEach(bar => {
            bar.classList.remove('paused')
        })
    })

    pauseBtn.addEventListener('click', ()=>{
        mainAudio.pause()
        playBtn.classList.add('play')
        document.querySelectorAll('.queue .bar').forEach(bar => {
            bar.classList.add('paused')
        })
    })

    volumeBtn.addEventListener('click', ()=>{
        mainAudio.volume = 0;
    })

    volumeBtn.addEventListener('click', ()=>{
        mainAudio.volume = 0;
        document.querySelector('.collapsed .volume').classList.add('muted')
    })

    mutedBtn.addEventListener('click', ()=>{
        mainAudio.volume = 1;
        document.querySelector('.collapsed .volume').classList.remove('muted')
    })
   
   
   
    let songTimer

    songTimer = setInterval(function(){
            currentTime = Math.floor(mainAudio.currentTime);
            // console.log(currentTime)
            const mins = (currentTime / 60);
            let minutes = Math.floor(mins)
            // console.log('mins' + minutes)
            const secsRaw = mins.toString().split('.')[1];
            const secsDecimal = '0.' + secsRaw
            const secs =  secsDecimal * 60
            // console.log('seconds' + secs.toFixed(2))
            let seconds = Math.trunc(secs.toFixed(2))
            // console.log('seconds' + seconds)

            minutes = minutes < 10 ? '0' + minutes : minutes
            seconds = seconds < 10 ? '0' + seconds : seconds;
            // seconds =  seconds == NaN ? '00' : seconds;
            const fullTime = minutes + ':' + seconds;

            const audioLength = Math.floor(mainAudio.duration);
            // console.log(currentTime)
            const durmins = (audioLength / 60);
            let durminutes = Math.floor(durmins)
            // console.log('mins' + minutes)
            const dursecsRaw = durmins.toString().split('.')[1];
            const dursecsDecimal = '0.' + dursecsRaw
            const dursecs =  dursecsDecimal * 60
            // console.log('seconds' + secs.toFixed(2))
            let durseconds = Math.trunc(dursecs.toFixed(2))
            // console.log('seconds' + seconds)

            range.max = mainAudio.duration;
            range.value = currentTime;

            durminutes = durminutes < 10 ? '0' + durminutes : durminutes
            durseconds = durseconds < 10 ? '0' + durseconds : durseconds;
            // seconds =  seconds == NaN ? '00' : seconds;
            const durfullTime = durminutes + ':' + durseconds;
            // console.log(fullTime)
            document.querySelector('.fullTime p').innerHTML = durfullTime;
            
            // console.log(fullTime)
            document.querySelector('.currentTime p').innerHTML = fullTime;

    }, 1000)

    range.addEventListener('change', ()=>{
        mainAudio.currentTime = range.value;
    })

}


prevBtn.addEventListener('click', ()=>{
    // clearInterval(songTimer)
    newIndex -= 1
    range.value = 0
    playSong(songQueue, newIndex)
})

nextBtn.addEventListener('click', ()=>{
    const last = +songQueue.length - +newIndex
    if(last == 1){
        // clearInterval(songTimer)
        range.value = 0
        newIndex = 0
        playSong(songQueue, newIndex)
    }else{
        // clearInterval(songTimer)
        range.value = 0
        newIndex++
        playSong(songQueue, newIndex)
    }
    
})

mainAudio.addEventListener('ended', function() {
    const last = +songQueue.length - +newIndex
    onRepeat = localStorage.getItem('repeat')
    // console.log(onRepeat)
    if(onRepeat == 'true'){
        // clearInterval(songTimer)
        range.value = 0
        newIndex = newIndex
        playSong(songQueue, newIndex)
        // console.log('repeat')
    }else{
        //  clearInterval(songTimer)
    playSong(songQueue, newIndex)
        if(last == 1){
            // clearInterval(songTimer)
            range.value = 0
            newIndex = 0
            playSong(songQueue, newIndex)
        }else{
            // clearInterval(songTimer)
            range.value = 0
            newIndex++
            playSong(songQueue, newIndex)
        }
        // console.log('nope')
    }
});



function displayQueue(songQueue, songIndex){
    // console.log(songQueue)
    const clearQueueBtn = document.querySelector('.clear-queue')
    clearQueueBtn.addEventListener('çlick', ()=>{

    })
    disFive = []
    const queueContainer = document.querySelector('.queue')
    queueContainer.innerHTML = ''
    const songLeft = songQueue.length - songIndex
    // console.log(songLeft)
    if(songLeft <= 5){
        for(let i = 0; i < songLeft ; i++) {
            // console.log(songIndex)
            const element = {
                album: songQueue[+songIndex + i].album,
                artist:  songQueue[+songIndex + i].artist,
                cover:  songQueue[+songIndex + i].cover,
                genre:  songQueue[+songIndex + i].genre,
                path:  songQueue[+songIndex + i].path,
                title:  songQueue[+songIndex + i].title,
                trackNo:  songQueue[+songIndex + i].trackNo,
                year:  songQueue[+songIndex + i].year,
                ind: +songIndex + i
            }
            disFive.push(element)
        }
    }else{
        for(let i = 0; i < 5; i++) {
            // console.log(songIndex)
            const element = {
                album: songQueue[+songIndex + i].album,
                artist:  songQueue[+songIndex + i].artist,
                cover:  songQueue[+songIndex + i].cover,
                genre:  songQueue[+songIndex + i].genre,
                path:  songQueue[+songIndex + i].path,
                title:  songQueue[+songIndex + i].title,
                trackNo:  songQueue[+songIndex + i].trackNo,
                year:  songQueue[+songIndex + i].year,
                ind: +songIndex + i
            }
            disFive.push(element)
        }
    }
    
    // console.log(disFive)
    disFive.forEach((el, index) => {
        const disEl = `
                <div class="row song" data-index="${el.ind}" draggable="true">
                <div class="cell title">
                    <div class="cover">
                        <p>${+index + 1}</p>
                        <button class="play-button" data-index="${el.ind}">
                            <i class="fas fa-play"></i>
                        </button>
                        <div class="playing-animation">
                            <div class="bars">
                                 <div class="bar"></div>
                                 <div class="bar"></div>
                                 <div class="bar"></div>
                                 <div class="bar"></div>
                                 <div class="bar"></div>
                            </div>
                        </div>
                    </div>
                    <div class="song-text">
                        <div class="song-title" data-index="${el.ind}">
                            <p>${el.title}</p>
                        </div>
                        <div class="song-artist">
                            <p>${el.artist}</p>
                        </div>
                    </div>
                </div>
                <div class="cell options">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots-vertical" viewBox="0 0 16 16">
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                    </svg>
                </div>
                <div class="options-list">
                    <div class="part playlist-add" data-pathid="${el.path}">
                        <i class="fas fa-plus"></i>
                        <p>Add to Playlist</p>
                    </div>
                    <div class="part queue-add" data-pathid="${el.path}">
                        <i class="fas fa-plus"></i>
                        <p>Add to Queue</p>
                    </div>
                    <div class="part play-next" data-pathid="${el.path}">
                        <i class="fas fa-play"></i>
                        <p>Play Next</p>
                    </div>
                    <div class="part view-artist" data-artist="${el.artist}">
                        <i class="fas fa-user"></i>
                        <p>View Artist</p>
                    </div>
                    <div class="part view-album" data-album="${el.album}">
                        <i class="fas fa-record-vinyl"></i>
                        <p>View Album</p>
                    </div>
                    <div class="part delete-queue" data-index="${el.ind}">
                        <i class="fas fa-trash"></i>
                        <p>Remove</p>
                    </div>
                </div>
            </div> 
        `
        queueContainer.innerHTML += disEl
    })
    addEventListeners(songQueue, songIndex)
    playingAnimation(songQueue, songIndex)
    queueActions(songQueue)
}

function playingAnimation(songQueue, songIndex){
    const allQueueRows = document.querySelectorAll('.queue .row')
    allQueueRows.forEach(row => {
        // console.log(row)
        if(row.dataset.index == songIndex){
            row.classList.add('isplaying')
        }else{
            row.classList.remove('isplaying')
        }
    })
}

function queueActions(songQueue){
    const allQueuePlay = document.querySelectorAll('.queue .row .play-button')
    const allQueueTitle = document.querySelectorAll('.queue .row .song-title')
    const optionAddPlaylist =  document.querySelectorAll('.queue .song .playlist-add')
    const allQueues = document.querySelectorAll('.queue .row')

    allQueuePlay.forEach(play =>{
        play.addEventListener('click', ()=>{
            newIndex = play.dataset.index;
            playSong(songQueue, newIndex)
        })
    })

    allQueueTitle.forEach(play =>{
        play.addEventListener('click', ()=>{
            newIndex = play.dataset.index;
            playSong(songQueue, newIndex)
        })
    })

    allQueues.forEach(song => {
        song.children[1].addEventListener('click', ()=>{
            song.children[2].classList.toggle('show')
            song.classList.toggle('lift')
        })

        song.children[2].addEventListener('click', ()=>{
            song.children[2].classList.remove('show')
            song.classList.remove('lift')
        })

        song.children[1].addEventListener('contextmenu', (e)=>{
            e.preventDefault()
            song.children[2].classList.toggle('show')
            song.classList.toggle('lift')
        })


        document.addEventListener('click', (e)=>{
                if (!song.children[2].contains(e.target) && !song.children[1].contains(e.target)){
                    // console.log('User clicked outside of the div');
                    song.children[2].classList.remove('show')
                    song.classList.remove('lift')
                  }
         })

    })

     const allQueuePlayNext = document.querySelectorAll('.queue .row .play-next')
        // console.log(allQueuePlayNext)
        allQueuePlayNext.forEach(playnext => {
            playnext.addEventListener('click', ()=>{
                const nextIndex = Number(newIndex) + 1;
                // console.log(nextIndex)
                // console.log(playnext.dataset.pathid)
                const songNext = songList.filter(function(el){
                    return el.path == playnext.dataset.pathid;
                })
                // console.log(songNext[0])
                songQueue.splice(nextIndex, 0, songNext[0])
                // console.lo   g(songQueue)
                displayQueue(songQueue, newIndex)
                addedTo.classList.add('show')
                document.querySelector('.added-alert h4').innerHTML = 'Song will play next'
                setTimeout(function(){
                    addedTo.classList.remove('show')
                }, 1300)
            })
        })

        const allQueuePlayLast = document.querySelectorAll('.queue .row .queue-add')
        // console.log(allQueuePlayLast)
        allQueuePlayLast.forEach(playlast => {
            playlast.addEventListener('click', ()=>{
                const songLast = songList.filter(function(el){
                    return el.path == playlast.dataset.pathid;
                })
                // console.log(songNext[0])
                songQueue.push(songLast[0])
                displayQueue(songQueue, newIndex)
                addedTo.classList.add('show')
                document.querySelector('.added-alert h4').innerHTML = 'Added To Queue'
                setTimeout(function(){
                    addedTo.classList.remove('show')
                }, 1300)
            })
        })

        const allAlbumCards = document.querySelectorAll('.album-card')
        const allArtistCards = document.querySelectorAll('.artist-card')

        const allQueueViewAlbum = document.querySelectorAll('.queue .view-album')
        allQueueViewAlbum.forEach(viewAlbum => {
            const thisAlbum = Array.from(allAlbumCards).filter(function(el){
                return el.dataset.albumname == viewAlbum.dataset.album
            })
            viewAlbum.addEventListener('click', ()=>{
                const album = thisAlbum[0]
                displayAlbumWindow(songList, album)
            })
        })
    
        const allQueueViewArtist = document.querySelectorAll('.queue .view-artist')
        allQueueViewArtist.forEach(viewArtist => {
            const thisArtist = Array.from(allArtistCards).filter(function(el){
                return el.dataset.artistname == viewArtist.dataset.artist
            })
            viewArtist.addEventListener('click', ()=>{
                const artist = thisArtist[0]       
                displayArtistWindow(songList, artist)
            })
        })

        const allRemoveQueues = document.querySelectorAll('.queue .delete-queue')
        allRemoveQueues.forEach(remove => {
            if(remove.dataset.index == newIndex){
                remove.classList.add('none')
            }else{
                remove.classList.remove('none')
            }
            remove.addEventListener('click', ()=>{
                const index = remove.dataset.index;
                songQueue.splice(index, 1)
                // newIndex -=1
                console.log(newIndex)
                displayQueue(songQueue, newIndex)
            })
        })

    const playlistAddContainer = document.querySelector('.my-playlist-list')
    const plWindow = document.querySelector('.add-playlist-window')
    optionAddPlaylist.forEach(addPlaylist => {
        // console.log(addPlaylist)
        addPlaylist.addEventListener('click', ()=>{
            console.log('click')
            document.querySelector('.new-playlist-name').value = `#Playlist${playlists.length}`
            document.querySelector('.add-playlist-window').classList.add('show')
            document.querySelector('.close-pl-window').addEventListener('click', ()=>{
                document.querySelector('.add-playlist-window').classList.remove('show')
            })
            playlistAddContainer.innerHTML = ''
            // console.log(playlists)
            playlists.forEach(playlist=>{
                const playlistButton = document.createElement('button')
                playlistButton.classList.add('playlist')
                playlistButton.innerHTML = playlist.playlistName;
                playlistAddContainer.appendChild(playlistButton)
                playlistButton.addEventListener('click', ()=>{
                    const thisPlaylist = playlists.filter(function(el){
                        return el.playlistName == playlistButton.textContent;
                    })
                    // console.log(thisPlaylist)
                    thisPlaylist[0].songs.push(addPlaylist.dataset.pathid)
                    // console.log(playlists)
                    localStorage.setItem('playlists', JSON.stringify(playlists))
                    document.querySelector('.add-playlist-window').classList.remove('show')
                })
            })
            document.querySelector('.new-p-add').addEventListener('click', ()=>{
                const newPlaylistName = document.querySelector('.new-playlist-name').value
                console.log(newPlaylistName)
                createPlaylists(newPlaylistName)
                const thisPlaylist = playlists.filter(function(el){
                    return el.playlistName == newPlaylistName;
                })
                // console.log(thisPlaylist)
                thisPlaylist[0].songs.push(addPlaylist.dataset.pathid)
                // console.log(playlists)
                localStorage.setItem('playlists', JSON.stringify(playlists))
                document.querySelector('.add-playlist-window').classList.remove('show')
            })
        })
      
    })

}

const collapsedQueueAdd = document.querySelector('.collapsed .queue-add')
const collapsedPlayNext = document.querySelector('.collapsed .play-next')

collapsedQueueAdd.addEventListener('click', ()=>{
    // console.log(songQueue[newIndex])
    songQueue.push(songQueue[newIndex])
    displayQueue(songQueue, newIndex)
    addedTo.classList.add('show')
    document.querySelector('.added-alert h4').innerHTML = 'Added To Queue'
    setTimeout(function(){
        addedTo.classList.remove('show')
    }, 1300)
})

collapsedPlayNext.addEventListener('click', ()=>{
    const nextIndex = Number(newIndex) + 1;
    songQueue.splice(nextIndex, 0, songQueue[newIndex])
                // console.lo   g(songQueue)
    displayQueue(songQueue, newIndex)
    addedTo.classList.add('show')
    document.querySelector('.added-alert h4').innerHTML = 'Song will play next'
    setTimeout(function(){
        addedTo.classList.remove('show')
    }, 1300)
})

function  swapItems(songQueue, fromIndex, toIndex, songIndex){
    if(fromIndex == 0){
        songQueue.splice(+toIndex + 1, 0, songQueue[fromIndex])
        songQueue.splice(+fromIndex, 1)
        displayQueue(songQueue, songIndex)
    }else if(fromIndex < toIndex){
        songQueue.splice(+toIndex + 1, 0, songQueue[fromIndex])
        songQueue.splice(+fromIndex, 1)
        displayQueue(songQueue, songIndex)
    }else if(fromIndex > toIndex){
        songQueue.splice(toIndex, 0, songQueue[fromIndex])
        songQueue.splice(+fromIndex + 1, 1)
        displayQueue(songQueue, songIndex)
    } else{
        songQueue.splice(toIndex, 0, songQueue[fromIndex])
        songQueue.splice(fromIndex, 1)
        displayQueue(songQueue, songIndex)
    }
}

function addEventListeners(songQueue, songIndex){
    // const draggables = document.querySelectorAll('.draggable')
    const dragListItems = document.querySelectorAll('.queue .row')
    document.querySelectorAll('.queue .row').forEach(row => {
        if(row.dataset.index == songIndex){
           row.setAttribute('draggable', false)
        }else{
            row.setAttribute('draggable', true)
        }
    })
    dragListItems.forEach(item => {
        item.addEventListener('dragstart', ()=>{
            dragStartIndex = item.closest('.row').getAttribute('data-index')
        })
        item.addEventListener('dragover', (e)=>{
            item.classList.add('over')
            e.preventDefault()
        })
        item.addEventListener('drop', ()=>{
            const dragEndIndex = item.getAttribute('data-index')
            item.classList.remove('over')
            if(dragEndIndex == songIndex){
                return false;
            }else{
                swapItems(songQueue, dragStartIndex, dragEndIndex, songIndex)
            }
           
            // this.classList.remove('over')
            // console.log('Event', 'drop')
        })
        item.addEventListener('dragenter', ()=>{
             // console.log('Event', 'dragEnter')
            item.classList.add('over')
        
        })
        item.addEventListener('dragleave', ()=>{
             // console.log('Event', 'dragLeave')
            item.classList.remove('over')
        })
    })
}


function albumSongOptions(){
    const allTracks = document.querySelectorAll('.dynamicAlbum .song')
    const optionAddPlaylist =  document.querySelectorAll('.dynamicAlbum .song .playlist-add')
    // console.log(allTracks)
    allTracks.forEach(song =>{
        song.children[2].addEventListener('click', ()=>{
            song.children[3].classList.toggle('show')
            song.classList.toggle('lift')
        })

        song.children[3].addEventListener('click', ()=>{
            song.children[3].classList.remove('show')
            song.classList.remove('lift')
        })

        song.children[2].addEventListener('contextmenu', (e)=>{
            e.preventDefault()
            song.children[3].classList.toggle('show')
            song.classList.toggle('lift')
        })


        document.addEventListener('click', (e)=>{
                if (!song.children[3].contains(e.target) && !song.children[2].contains(e.target)){
                    // console.log('User clicked outside of the div');
                    song.children[3].classList.remove('show')
                    song.classList.remove('lift')
                  }
         })

    })
    const allTrackPlayNext = document.querySelectorAll('.dynamicAlbum .song .play-next')
        // console.log(allTrackPlayNext)
        allTrackPlayNext.forEach(playnext => {
            playnext.addEventListener('click', ()=>{
                const nextIndex = Number(newIndex) + 1;
                // console.log(nextIndex)
                // console.log(playnext.dataset.pathid)
                const songNext = songList.filter(function(el){
                    return el.path == playnext.dataset.pathid;
                })
                // console.log(songNext[0])
                songQueue.splice(nextIndex, 0, songNext[0])
                // console.lo   g(songQueue)
                displayQueue(songQueue, newIndex)
                addedTo.classList.add('show')
                document.querySelector('.added-alert h4').innerHTML = 'Song will play next'
                setTimeout(function(){
                    addedTo.classList.remove('show')
                }, 1300)
            })
    })

    const allTrackPlayLast = document.querySelectorAll('.dynamicAlbum .song .queue-add')
        // console.log(allTrackPlayLast)
        allTrackPlayLast.forEach(playlast => {
            playlast.addEventListener('click', ()=>{
                const songLast = songList.filter(function(el){
                    return el.path == playlast.dataset.pathid;
                })
                // console.log(songNext[0])
                songQueue.push(songLast[0])
                displayQueue(songQueue, newIndex)
                addedTo.classList.add('show')
                document.querySelector('.added-alert h4').innerHTML = 'Added To Queue'
                setTimeout(function(){
                    addedTo.classList.remove('show')
                }, 1300)
            })
    })

    const playlistAddContainer = document.querySelector('.my-playlist-list')
    const plWindow = document.querySelector('.add-playlist-window')
    optionAddPlaylist.forEach(addPlaylist => {
        // console.log(addPlaylist)
        addPlaylist.addEventListener('click', ()=>{
            console.log('click')
            document.querySelector('.new-playlist-name').value = `#Playlist${playlists.length}`
            document.querySelector('.add-playlist-window').classList.add('show')
            document.querySelector('.close-pl-window').addEventListener('click', ()=>{
                document.querySelector('.add-playlist-window').classList.remove('show')
            })
            playlistAddContainer.innerHTML = ''
            // console.log(playlists)
            playlists.forEach(playlist=>{
                const playlistButton = document.createElement('button')
                playlistButton.classList.add('playlist')
                playlistButton.innerHTML = playlist.playlistName;
                playlistAddContainer.appendChild(playlistButton)
                playlistButton.addEventListener('click', ()=>{
                    const thisPlaylist = playlists.filter(function(el){
                        return el.playlistName == playlistButton.textContent;
                    })
                    // console.log(thisPlaylist)
                    thisPlaylist[0].songs.push(addPlaylist.dataset.pathid)
                    // console.log(playlists)
                    localStorage.setItem('playlists', JSON.stringify(playlists))
                    document.querySelector('.add-playlist-window').classList.remove('show')
                })
            })
            document.querySelector('.new-p-add').addEventListener('click', ()=>{
                const newPlaylistName = document.querySelector('.new-playlist-name').value
                console.log(newPlaylistName)
                createPlaylists(newPlaylistName)
                const thisPlaylist = playlists.filter(function(el){
                    return el.playlistName == newPlaylistName;
                })
                // console.log(thisPlaylist)
                thisPlaylist[0].songs.push(addPlaylist.dataset.pathid)
                // console.log(playlists)
                localStorage.setItem('playlists', JSON.stringify(playlists))
                document.querySelector('.add-playlist-window').classList.remove('show')
            })
        })
      
    })

}


function artistSongOptions(){
    const allDiscs = document.querySelectorAll('.dynamicArtist .song')
    const optionAddPlaylist =  document.querySelectorAll('.dynamicArtist .song .playlist-add')
    // console.log(allTracks)
    allDiscs.forEach(song =>{
        song.children[1].addEventListener('click', ()=>{
            song.children[2].classList.toggle('show')
            song.classList.toggle('lift')
        })

        song.children[2].addEventListener('click', ()=>{
            song.children[2].classList.remove('show')
            song.classList.remove('lift')
        })

        song.children[1].addEventListener('contextmenu', (e)=>{
            e.preventDefault()
            song.children[2].classList.toggle('show')
            song.classList.toggle('lift')
        })


        document.addEventListener('click', (e)=>{
                if (!song.children[2].contains(e.target) && !song.children[1].contains(e.target)){
                    // console.log('User clicked outside of the div');
                    song.children[2].classList.remove('show')
                    song.classList.remove('lift')
                  }
         })
    })
    const allTrackPlayNext = document.querySelectorAll('.dynamicArtist .song .play-next')
    // console.log(allTrackPlayNext)
    allTrackPlayNext.forEach(playnext => {
        playnext.addEventListener('click', ()=>{    
            const nextIndex = Number(newIndex) + 1;
            // console.log(nextIndex)
            // console.log(playnext.dataset.pathid)
            const songNext = songList.filter(function(el){
                return el.path == playnext.dataset.pathid;
            })
            // console.log(songNext[0])
            songQueue.splice(nextIndex, 0, songNext[0])
            displayQueue(songQueue, newIndex)
            addedTo.classList.add('show')
            document.querySelector('.added-alert h4').innerHTML = 'Song will play next'
            setTimeout(function(){
                addedTo.classList.remove('show')
            }, 1300)
        })
    })
    const allTrackPlayLast = document.querySelectorAll('.dynamicArtist .song .queue-add')
        // console.log(allTrackPlayLast)
        allTrackPlayLast.forEach(playlast => {
            playlast.addEventListener('click', ()=>{
                const songLast = songList.filter(function(el){
                    return el.path == playlast.dataset.pathid;
                })
                // console.log(songNext[0])
                songQueue.push(songLast[0])
                displayQueue(songQueue, newIndex)
                addedTo.classList.add('show')
                document.querySelector('.added-alert h4').innerHTML = 'Added To Queue'
                setTimeout(function(){
                    addedTo.classList.remove('show')
                }, 1300)
            })
        })

        const playlistAddContainer = document.querySelector('.my-playlist-list')
        const plWindow = document.querySelector('.add-playlist-window')
        optionAddPlaylist.forEach(addPlaylist => {
            // console.log(addPlaylist)
            addPlaylist.addEventListener('click', ()=>{
                console.log('click')
                document.querySelector('.new-playlist-name').value = `#Playlist${playlists.length}`
                document.querySelector('.add-playlist-window').classList.add('show')
                document.querySelector('.close-pl-window').addEventListener('click', ()=>{
                    document.querySelector('.add-playlist-window').classList.remove('show')
                })
                playlistAddContainer.innerHTML = ''
                // console.log(playlists)
                playlists.forEach(playlist=>{
                    const playlistButton = document.createElement('button')
                    playlistButton.classList.add('playlist')
                    playlistButton.innerHTML = playlist.playlistName;
                    playlistAddContainer.appendChild(playlistButton)
                    playlistButton.addEventListener('click', ()=>{
                        const thisPlaylist = playlists.filter(function(el){
                            return el.playlistName == playlistButton.textContent;
                        })
                        // console.log(thisPlaylist)
                        thisPlaylist[0].songs.push(addPlaylist.dataset.pathid)
                        // console.log(playlists)
                        localStorage.setItem('playlists', JSON.stringify(playlists))
                        document.querySelector('.add-playlist-window').classList.remove('show')
                    })
                })
                document.querySelector('.new-p-add').addEventListener('click', ()=>{
                    const newPlaylistName = document.querySelector('.new-playlist-name').value
                    console.log(newPlaylistName)
                    createPlaylists(newPlaylistName)
                    const thisPlaylist = playlists.filter(function(el){
                        return el.playlistName == newPlaylistName;
                    })
                    // console.log(thisPlaylist)
                    thisPlaylist[0].songs.push(addPlaylist.dataset.pathid)
                    // console.log(playlists)
                    localStorage.setItem('playlists', JSON.stringify(playlists))
                    document.querySelector('.add-playlist-window').classList.remove('show')
                })
            })
          
        })
}

function observeSong(){
    // console.log(songElems)
    const target = document.querySelectorAll('.window.songs .song')
    const albumTarget = document.querySelectorAll('.window.albums .album-card')
    const artistTarget = document.querySelectorAll('.window.artists .artist-card')
    
    // console.log(songCard)
    let options = {
        root: document.querySelector('.songs-container'),
        rootMargin: '0px',
        threshold: 0.5,
    }
    let callback = (entries, observer) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                // console.log('entry')
                entry.target.classList.add('show')
            }else{
                // console.log('out')
                entry.target.classList.remove('show')
            }
        });
    };
    let observer = new IntersectionObserver(callback, options);
    
    // let target = document.querySelectorAll('.card')
    target.forEach(el => {
        observer.observe(el)
    })


    let options2 = {
        root: document.querySelector('.albums-container'),
        rootMargin: '0px',
        threshold: 0.5,
    }
    let callback2 = (entries, observer) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                // console.log('entry')
                entry.target.classList.add('show')
            }else{
                // console.log('out')
                entry.target.classList.remove('show')
            }
        });
    };
    let observer2 = new IntersectionObserver(callback2, options2);
    
    // let target = document.querySelectorAll('.card')
    albumTarget.forEach(el => {
        observer2.observe(el)
    })



    let options3 = {
        root: document.querySelector('.artists-container'),
        rootMargin: '0px',
        threshold: 0.5,
    }
    let callback3 = (entries, observer) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                // console.log('entry')
                entry.target.classList.add('show')
            }else{
                // console.log('out')
                entry.target.classList.remove('show')
            }
        });
    };
    let observer3 = new IntersectionObserver(callback3, options3);
    
    // let target = document.querySelectorAll('.card')
    artistTarget.forEach(el => {
        observer3.observe(el)
    })

    //DYNAMIC LISTS
}

function observeDiscography(){
    const discographyTarget = document.querySelectorAll('.dynamicArtist .song')
    // console.log(discographyTarget)

    let options4 = {
        root: document.querySelector('.artist-song-container'),
        rootMargin: '0px',
        threshold: 0.5,
    }
    let callback4 = (entries, observer) => {
        entries.forEach((entry) => {
            if(entry.isIntersecting){
                // console.log('entry')
                entry.target.classList.add('show')
            }else{
                // console.log('out')
                entry.target.classList.remove('show')
            }
        });
    };
    let observer4 = new IntersectionObserver(callback4, options4);
    
    // let target = document.querySelectorAll('.card')
    discographyTarget.forEach(el => {
        observer4.observe(el)
    })

}

// module.exports = observeSong

 