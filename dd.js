// const customHeaders = {'Content-Type': "application/json"}
// fetch('http://localhost:3000/music', {
//    method: 'GET',
//    contentType: 'application/json',
//    headers: customHeaders,
//    mode: 'no-cors'
// }).then((response) => response.json())
// .then((json) => {
//    console.log(json)
//    console.log('YES')
// }).catch((err)=>{
//    console.log(err)
//    console.log('NO')
// })
//         // async function call(){
//         //     try {
//         //     const response = await fetch(
//         //         'http://localhost:3000/music', {
//         //         method: 'GET',
//         //         mode: 'no-cors'
//         //     });
//         //     const data = await response.json();
//         //         console.log(data);
//         //     } catch (error) {
//         //         console.error(error);
//         //     }
//         // }

//         // call()

// // const file = new File('C:/Users/omaga/Music\\03-Davido-IN-THE-GARDEN-Ft-Morravey-(JustNaija.com).mp3', 'song')
// // console.log(file)

// const file = new File(["C:/Users/omaga/Music\\03-Davido-IN-THE-GARDEN-Ft-Morravey-(JustNaija.com).mp3"], "foo.mp3", {
//     type: "audio/mpeg",
//   });

// console.log(file)

const jsmediatags = window.jsmediatags;
// Define the file path
const filePath = './Give In - (feat. Crystal Nicole).mp3';

// Use jsmediatags to read the metadata
jsmediatags.read(filePath, {
  onSuccess: function(tag) {
    console.log(tag);
  },
  onError: function(error) {
    console.log(':(', error.type, error.info);
  }
});
