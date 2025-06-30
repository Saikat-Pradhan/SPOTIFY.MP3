document.addEventListener('DOMContentLoaded', () => {
    console.log("Welcome to Spotify");

    // Initialize variables
    let songIndex = 0;
    let audioElement = new Audio('1.mp3');
    const masterPlay = document.getElementById('masterPlay');
    const myProgressBar = document.getElementById('myProgressBar');
    const gif = document.getElementById('gif');
    const forWard = document.getElementById('forward');
    const backWard = document.getElementById('backward');
    const currentSongName = document.getElementById('currentSong');

    const songs = [
        { songname: "Sun Raha Hai - Aashiqui2", filePath: "1.mp3" },
        { songname: "Haan Hansi Ban Gaye - Hamari Aadhuri Kahani", filePath: "2.mp3" },
        { songname: "Jeene Laga Hu - Ramaiya Vastavaiya", filePath: "3.mp3" },
        { songname: "Maheroo Maheroo - Super nani", filePath: "4.mp3" },
        { songname: "Zihaal E Miskin - Album Song", filePath: "5.mp3" },
    ];

    // Play or pause the song
    masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            // Update the song name
            currentSongName.textContent = `${songs[songIndex].songname}`;
            masterPlay.src = 'https://img.icons8.com/?size=80&id=xAAZEp9992NX&format=png';
            gif.style.opacity = 1;
        } else {
            audioElement.pause();
            masterPlay.src = 'https://img.icons8.com/?size=80&id=t294OHA3a4ko&format=png';
            gif.style.opacity = 0;
        }
    });

    // Helper function to play a song by index
    function playSongAt(index, autoPlay = true) {
        songIndex = index;
        audioElement.src = `${songIndex + 1}.mp3`;
        audioElement.currentTime = 0;
        myProgressBar.value = 0;

        // Update the song name
        currentSongName.textContent = `${songs[songIndex].songname}`;

        if (autoPlay) {
            audioElement.play();
            masterPlay.src = 'https://img.icons8.com/?size=80&id=xAAZEp9992NX&format=png';
            gif.style.opacity = 1;
        } else {
            masterPlay.src = 'https://img.icons8.com/?size=80&id=t294OHA3a4ko&format=png';
            gif.style.opacity = 0;
        }
    }

    // Forward button — go to next song
    forWard.addEventListener('click', () => {
        if(songIndex==0){
            songIndex = 4;
        }else{
            songIndex--;
        }
        playSongAt(songIndex, !audioElement.paused);
    });

    // Backward button — go to previous song
    backWard.addEventListener('click', () => {
        if(songIndex==4){
            songIndex = 0;
        }else{
            songIndex++;
        }
        playSongAt(songIndex, !audioElement.paused);
    });

    // Choose song from list
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
        element.addEventListener('click', (e) => {
            const index = parseInt(e.target.id);
            playSongAt(index, true);
        });
    });

    // Update progress bar as song plays
    audioElement.addEventListener('timeupdate', () => {
        const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;

        // Auto-forward when song ends
        if (progress >= 100) {
            const nextIndex = (songIndex === songs.length - 1) ? 0 : songIndex + 1;
            playSongAt(nextIndex, true);
        }
    });

    // Seek song when user changes progress bar
    myProgressBar.addEventListener('change', () => {
        audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
    });
});

// console.log("Welcome to Spotify");
// //Initialize the variables
// let songIndex = 0;
// let audioElement = new Audio('1.mp3');
// let masterPlay = document.getElementById('masterPlay');
// let myProgressBar = document.getElementById('myProgressBar');
// let gif = document.getElementById('gif');
// let forWard = document.getElementById('forward');
// let backWard = document.getElementById('backward');
// let songItems = document.getElementsByClassName('songItem');

// let songs=[
//         {songname: "Sun Raha Hai", filePath:"1.mp3"},
//         {songname: "Haan Hansi Ban Gaye", filePath: "2.mp3"},
//         {songname: "Jeene Laga Hu", filePath: "3.mp3"},
//         {songname: "Maheroo Maheroo", filePath: "4.mp3"},
//         {songname: "Zihaal E Miskin", filePath: "5.mp3"},
//     ]
 

// //Handle play/pause click
// masterPlay.addEventListener('click', ()=>{
//     if( audioElement.paused || audioElement.currentTime<=0){
//         audioElement.play();
//         masterPlay.src = 'https://img.icons8.com/?size=80&id=xAAZEp9992NX&format=png';
//         gif.style.opacity = 1;
//     }else{
//         audioElement.pause();
//         masterPlay.src = 'https://img.icons8.com/?size=80&id=t294OHA3a4ko&format=png';
//          gif.style.opacity = 0;
//     }
// }) 

// //Change song
// forWard.addEventListener('click', ()=>{
//     if(audioElement.played){
//         if(songIndex==0){
//             songIndex = 4;
//             audioElement.src = `songs/${songIndex+1}.mp3`;
//             myProgressBar.value = 0;
//             audioElement = new Audio(`${songIndex+1}.mp3`);  //Forward
//             audioElement.play();
//         }else{
//             songIndex--;
//             audioElement.src = `songs/${songIndex+1}.mp3`;
//             myProgressBar.value = 0;
//             audioElement = new Audio(`${songIndex+1}.mp3`);
//             audioElement.play();
//         }
//     }
// })    

// backWard.addEventListener('click', ()=>{
//     if(audioElement.played){
//         if(songIndex==4){
//             songIndex = 0;
//            audioElement.src = `songs/${songIndex+1}.mp3`;
//             myProgressBar.value = 0;
//             audioElement = new Audio(`${songIndex+1}.mp3`);  //Backward
//             audioElement.play();
//         }else{
//             songIndex++;
//             audioElement.src = `songs/${songIndex+1}.mp3`;
//             myProgressBar.value = 0;
//             audioElement = new Audio(`${songIndex+1}.mp3`);
//             audioElement.play();
//         }
//     }
// })  

// //Chose song
// Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
//     element.addEventListener('click', (e)=>{
//         songIndex = parseInt(e.target.id);
//         audioElement.src = `songs/${songIndex+1}.mp3`;
//         audioElement.currentTime = 0;
//         myProgressBar.value = 0;
//         audioElement.play();
//         masterPlay.src = 'https://img.icons8.com/?size=80&id=xAAZEp9992NX&format=png';
//     })
// })

// //Update time
// audioElement.addEventListener('timeupdate', ()=>{
//      progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
//      myProgressBar.value=progress;
// })   

// //Update time by user
// myProgressBar.addEventListener('change', ()=>{
//     audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
// })

