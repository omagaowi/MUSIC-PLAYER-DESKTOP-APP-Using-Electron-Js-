const { app, BrowserWindow } = require('electron');
const express = require('express');
const path = require('path');
const fs = require('fs')
const fs2 = require('fs').promises
const NodeID3 = require('node-id3')


// Create the Express app
const expressApp = express();
let songsLists = []
function getMeta(fileURL, fileName){
    const tags = NodeID3.read(fileURL)
    let title = tags.title
    let artist = tags.artist;
    let album = tags.album
    let cover = tags.image
    let year = tags.year
    let genre = tags.genre

    title = title == undefined ? fileName : title;
    artist = artist == undefined ? "unknown artist" : artist;
    album = album == undefined ? "unknown album" : album;
    cover = cover == undefined ? "unknown cover" : cover;
    year = year == undefined ? "unknown year" : year;
    genre = genre == undefined ? "unknown genre" : genre;
    // console.log(artist)
    const trackDetails = {
        title: title,
        artist: artist,
        album: album,
        year: year,
        cover: cover,
        path: fileURL,
        genre: genre
    }
    // console.log(trackDetails)
    songsLists.push(trackDetails)
}
// getMeta()

async function findFiles(folderName) {
    const items = await fs2.readdir(folderName, { withFileTypes: true });
    items.forEach((item) => {
      const filepath =  folderName + '\\' + item.name
      fs.stat(filepath, (error, stats) => {
          if(stats.isDirectory()){
              findFiles(path.join(folderName, item.name));
          }else{
              if (path.extname(item.name) === ".mp3") {
                    const filepath =  folderName + '\\' + item.name
                    const fileName = item.name
                    // console.log(filepath)
                    getMeta(filepath, fileName)
                  // URLS.push(filepath)
              } else {
  
              }
          }
      });
    });
  }
  findFiles("C:/Users/omaga/Music");

  expressApp.get('/', (req, res) => {
    //   res.send('Hello from Express!');
      res.json(songsLists)
    });
    
  

// Start the Express server
const server = expressApp.listen(3000, () => {
  console.log('Express server running on port 3000!');
});

// Create the Electron window
function createWindow() {
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      accelerator: true,
      nodeIntegration: true, // Enable Node.js integration in the Electron window
    }
  });

  // Load the index.html file
  mainWindow.loadFile(path.join(__dirname, '/render/index.html'));

  // Open DevTools (optional)
  // mainWindow.webContents.openDevTools();
}

// Start the Electron app
app.enableSandbox()
app.whenReady().then(() => {
  createWindow();
});

// Quit the app when all windows are closed (optional)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

// Gracefully close the Express server when Electron app is quit
app.on('quit', () => {
  server.close();
});
