// Define the file path
// const filePath = '/Give In - (feat. Crystal Nicole).mp3';
// Use the music-metadata library to read the metadata
import { parseFile } from 'music-metadata';
import { inspect } from 'util';
import { promises as fs } from "fs";
import { stat } from "fs";
import { join, extname } from "path";
import express from 'express'
import staticMiddleware from '../expressLoad.js';
const app = express()
app.listen(3000, ()=>{
  console.log('Server is Online')
})

export { parseFile }

app.use(staticMiddleware)

let songsLists = []
function getMeta(filePath){
  let data
  (async () => {
    try {
      const metadata = await parseFile(filePath);
      data = inspect(metadata, { showHidden: false, depth: null })
      // console.log(data)
      // console.log(metadata.common.picture);
      const trackDetails = {
        title: metadata.common.title,
        artist: metadata.common.artist,
        album: metadata.common.album,
        year: metadata.common.year,
        cover: metadata.common.picture,
        path: filePath,
        genre: metadata.common.genre
      }
      songsLists.push(trackDetails)
      // console.log(trackDetails)


    } catch (error) {
      console.error(error.message);
    }
  })();
}

// getMeta()

async function findFiles(folderName) {
  const items = await fs.readdir(folderName, { withFileTypes: true });
  items.forEach((item) => {
    const filepath =  folderName + '\\' + item.name
    stat(filepath, (error, stats) => {
        if(stats.isDirectory()){
            findFiles(join(folderName, item.name));
        }else{
            if (extname(item.name) === ".mp3") {
                  const filepath =  folderName + '\\' + item.name
                  // console.log(filepath)
                  getMeta(filepath)
                // URLS.push(filepath)
            } else {

            }
        }
    });
  });
}
findFiles("C:/Users/omaga/Music");




app.get('/', (req, res)=>{
  res.json('hello')
  console.log(songsLists)
})