const NodeID3 = require('node-id3')

const tags = NodeID3.read('Give In - (feat. Crystal Nicole).mp3')

console.log(tags)