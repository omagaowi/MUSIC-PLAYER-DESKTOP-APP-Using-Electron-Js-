const fullBtn = document.querySelector('.expandBtn')
const collapsedElem = document.querySelector('.collapsed')
const fullPlayerElem = document.querySelector('.full-player')

const songsClick = document.querySelector('.songsClick')
const albumsClick = document.querySelector('.albumsClick')
const artistsClick = document.querySelector('.artistsClick')
const playlistsClick = document.querySelector('.playlistsClick')

const songsElem = document.querySelector('.window.songs')
const albumsElem = document.querySelector('.window.albums')
const artistsElem = document.querySelector('.window.artists')
const playlistsElem = document.querySelector('.window.playlists')

const head = document.querySelector('.app-heading')





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

    songsClick.classList.add('active')
    albumsClick.classList.remove('active')
    artistsClick.classList.remove('active')
    playlistsClick.classList.remove('active')
    head.innerHTML = 'All Songs'
})
albumsClick.addEventListener('click', ()=>{
    songsElem.classList.remove('active')
    albumsElem.classList.add('active')
    artistsElem.classList.remove('active')
    playlistsElem.classList.remove('active')

    songsClick.classList.remove('active')
    albumsClick.classList.add('active')
    artistsClick.classList.remove('active')
    playlistsClick.classList.remove('active')
    head.innerHTML = 'Albums'
})
artistsClick.addEventListener('click', ()=>{
    songsElem.classList.remove('active')
    albumsElem.classList.remove('active')
    artistsElem.classList.add('active')
    playlistsElem.classList.remove('active')

    songsClick.classList.remove('active')
    albumsClick.classList.remove('active')
    artistsClick.classList.add('active')
    playlistsClick.classList.remove('active')
    head.innerHTML = 'Artists'
})

playlistsClick.addEventListener('click', ()=>{
    songsElem.classList.remove('active')
    albumsElem.classList.remove('active')
    artistsElem.classList.remove('active')
    playlistsElem.classList.add('active')

    songsClick.classList.remove('active')
    albumsClick.classList.remove('active')
    artistsClick.classList.remove('active')
    playlistsClick.classList.add('active')
    head.innerHTML = 'Playlists'
})

