const fullBtn = document.querySelector('.expandBtn')
const collapsedElem = document.querySelector('.collapsed')
const fullPlayerElem = document.querySelector('.full-player')
const nowPlaying = document.querySelector('.now-playing')

const songsClick = document.querySelector('.songsClick')
const albumsClick = document.querySelector('.albumsClick')
const artistsClick = document.querySelector('.artistsClick')
const playlistsClick = document.querySelector('.playlistsClick')
const searchClick = document.querySelector('.searchClick')
const newPlaylistElem = document.querySelector('.new-playlist')



const songsElem = document.querySelector('.window.songs')
const albumsElem = document.querySelector('.window.albums')
const artistsElem = document.querySelector('.window.artists')
const playlistsElem = document.querySelector('.window.playlists')
const searchElem = document.querySelector('.window.search')
const mainElem = document.querySelector('.main')
const sidebarElem = document.querySelector('.sidebar')
const dynamicAlbumElem = document.querySelector('.dynamicAlbum')
const dynamicArtistElem = document.querySelector('.dynamicArtist')
const dynamicPlaylistElem = document.querySelector('.dynamicPlaylist')
const head = document.querySelector('.app-heading')
const playingOptions = document.querySelector('.moreOptions')





fullBtn.addEventListener('click', ()=>{
    // collapsedElem.classList.toggle('full')
    fullPlayerElem.classList.toggle('full')
    fullBtn.classList.toggle('full')
})

songsClick.addEventListener('click', ()=>{
    songsElem.classList.add('active')
    albumsElem.classList.remove('active')
    artistsElem.classList.remove('active')
    playlistsElem.classList.remove('active')
    searchElem.classList.remove('active')

    songsClick.classList.add('active')
    albumsClick.classList.remove('active')
    artistsClick.classList.remove('active')
    playlistsClick.classList.remove('active')
    searchClick.classList.remove('active')
    head.innerHTML = 'All Songs'
    document.querySelector('.shufflePlay').classList.remove('hide')
})
albumsClick.addEventListener('click', ()=>{
    songsElem.classList.remove('active')
    albumsElem.classList.add('active')
    artistsElem.classList.remove('active')
    playlistsElem.classList.remove('active')
    searchElem.classList.remove('active')

    songsClick.classList.remove('active')
    albumsClick.classList.add('active')
    artistsClick.classList.remove('active')
    playlistsClick.classList.remove('active')
    searchClick.classList.remove('active')
    head.innerHTML = 'Albums'
    document.querySelector('.shufflePlay').classList.add('hide')
})
artistsClick.addEventListener('click', ()=>{
    songsElem.classList.remove('active')
    albumsElem.classList.remove('active')
    artistsElem.classList.add('active')
    playlistsElem.classList.remove('active')
    searchElem.classList.remove('active')

    songsClick.classList.remove('active')
    albumsClick.classList.remove('active')
    artistsClick.classList.add('active')
    playlistsClick.classList.remove('active')
    searchClick.classList.remove('active')
    head.innerHTML = 'Artists'
    document.querySelector('.shufflePlay').classList.add('hide')
})

playlistsClick.addEventListener('click', ()=>{
    songsElem.classList.remove('active')
    albumsElem.classList.remove('active')
    artistsElem.classList.remove('active')
    playlistsElem.classList.add('active')
    searchElem.classList.remove('active')

    songsClick.classList.remove('active')
    albumsClick.classList.remove('active')
    artistsClick.classList.remove('active')
    playlistsClick.classList.add('active')
    searchClick.classList.remove('active')
    head.innerHTML = 'Playlists'
    document.querySelector('.shufflePlay').classList.add('hide')
})

searchClick.addEventListener('click', ()=>{
    searchElem.classList.add('active')
    songsElem.classList.remove('active')
    albumsElem.classList.remove('active')
    artistsElem.classList.remove('active')
    playlistsElem.classList.remove('active')

    songsClick.classList.remove('active')
    albumsClick.classList.remove('active')
    artistsClick.classList.remove('active')
    playlistsClick.classList.remove('active')
    searchClick.classList.add('active')
    
    head.innerHTML = 'Search'
    document.querySelector('.shufflePlay').classList.add('hide')
})

dynamicAlbumElem.addEventListener('click', ()=>{
    nowPlaying.classList.remove('active')
})

dynamicArtistElem.addEventListener('click', ()=>{
    nowPlaying.classList.remove('active')
})

dynamicPlaylistElem.addEventListener('click', ()=>{
    nowPlaying.classList.remove('active')
})


dynamicAlbumElem.addEventListener('mouseover', ()=>{
    nowPlaying.classList.remove('active')
})

dynamicArtistElem.addEventListener('mouseover', ()=>{
    nowPlaying.classList.remove('active')
})


dynamicPlaylistElem.addEventListener('mouseover', ()=>{
    nowPlaying.classList.remove('active')
})





nowPlaying.addEventListener('click', ()=>{
   nowPlaying.classList.add('active')
})

nowPlaying.addEventListener('mouseover', ()=>{
    nowPlaying.classList.add('active')
 })

document.querySelector('.container').addEventListener('click', ()=>{
    nowPlaying.classList.add('active')
})

playingOptions.addEventListener('click', ()=>{
    document.querySelector('.collapsed .options-list').classList.toggle('show')
})

document.addEventListener('click', (e)=>{
    if (!playingOptions.contains(e.target) && !document.querySelector('.collapsed .options-list').contains(e.target)){
        document.querySelector('.collapsed .options-list').classList.remove('show')
      }
})

document.querySelector('.collapsed .options-list').addEventListener('click', () => {
    document.querySelector('.collapsed .options-list').classList.remove('show')
})

newPlaylistElem.addEventListener('click', ()=>{
    newPlaylistElem.classList.remove('active')
    document.querySelector('.new-playlist input').focus()
})

document.addEventListener('click', (e)=>{
    if (!newPlaylistElem.contains(e.target)){
        newPlaylistElem.classList.add('active')
      }
})

document.querySelector('.add-new').addEventListener('click', ()=>{
    document.querySelector('.add-new-playlist').classList.add('show')
    document.querySelector('.add-new-playlist button').addEventListener('clic   k', ()=>{
        document.querySelector('.add-new-playlist').classList.remove('show')
    })
})

document.addEventListener('click', (e)=>{
    if (!document.querySelector('.add-new-playlist').contains(e.target) && !document.querySelector('.add-new').contains(e.target)){
        document.querySelector('.add-new-playlist').classList.remove('show')
      }
})

document.querySelector('.options-album-btn').addEventListener('click', ()=>{
    document.querySelector('.dynamicAlbum .album-buttons .options-list').classList.add('show')
})

document.addEventListener('click', (e)=>{
    if(!document.querySelector('.dynamicAlbum .album-buttons .options-list').contains(e.target) && 
    !document.querySelector('.options-album-btn').contains(e.target) ){
        document.querySelector('.dynamicAlbum .album-buttons .options-list').classList.remove('show')
    }else{

    }
})