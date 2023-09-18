const { app, BrowserWindow, Menu } = require('electron');
const express = require('express');
const path = require('path');
const fs = require('fs')
const fs2 = require('fs').promises
const NodeID3 = require('node-id3')
const os = require('os');
const userFolder = os.homedir()
// const { ipcMain } = require('electron');
// mainWindow.webContents.send('update-counter', 1)

// Create the Express app
const expressApp = express();
expressApp.set('view engine', 'ejs')
let songsLists = []
function getMeta(fileURL, fileName){
    const tags = NodeID3.read(fileURL)
    let title = tags.title
    let artist = tags.artist;
    let album = tags.album
    let cover = tags.image
    let year = tags.year
    let genre = tags.genre
    let trackNo = tags.trackNumber

    title = title == undefined ? fileName : title;
    artist = artist == undefined ? "unknown artist" : artist;
    album = album == undefined ? "unknown album" : album;
    cover = cover == undefined ? "unknown cover" : cover;
    year = year == undefined ? "unknown year" : year;
    genre = genre == undefined ? "unknown genre" : genre;
    trackNo = trackNo == undefined ? "#" : trackNo;
    // console.log(artist)
    const trackDetails = {
        title: title,
        artist: artist,
        album: album,
        year: year,
        cover: cover,
        path: fileURL,
        genre: genre,
        trackNo: trackNo
    }
    // console.log(trackDetails)
    // console.log(tags.time)
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

  const musicFolder = path.join(userFolder, 'Music')
  // console.log(musicFolder)
  findFiles(musicFolder);

  expressApp.get('/', (req, res) => {
    //   res.send('Hello from Express!');
      res.json(songsLists)
    });

    // expressApp.get('/share', (req, res) => {
    //   //   res.send('Hello from Express!');
    //    res.render('index.ejs')
    //   });

    //   expressApp.get('/share/:path/*', (req, res) => {
    //       console.log(path.join(req.params.path, req.params[0]))
    //       const Filepath = path.join(req.params.path, req.params[0])
    //       fs.readFile(Filepath, (err, data)=>{
    //         if(err){
    //           console.log(err)
    //         }else{
    //           // console.log(data)

    //           // res.send('data')
    //           res.json(data)
    //         }
    //       })
    //       // const file = fs.readFile(Filepath)
    //       // res.send(file)
    //     });
    
  

// Start the Express server
const server = expressApp.listen(3000, () => {
  console.log('Express server running on port 3000!');
});

let mainWindow

// Create the Electron window
function createWindow() {
   mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, '/render/preload.js'),
      accelerator: true,
      nodeIntegration: false, 
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote// Enable Node.js integration in the Electron window
    }
  });
  // Open DevTools (optional)
}

// Start the Electron app
app.enableSandbox()
app.whenReady().then(() => {
  createWindow();
  mainWindow.webContents.send('update-counter', 'Hello')
  mainWindow.loadFile(path.join(__dirname, '/render/index.html'));
  mainWindow.webContents.send('update-counter', 'Hello')
});

app.on('open-file', (event, path) => {
  console.log(path)
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
