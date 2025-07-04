console.log("Welcome to Spotify");

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
    const currentSongCurrentTime = document.getElementById('currentTime');
    const currentSongTotalTime = document.getElementById('totalTime');

    const songs = [
        { songname: "Sun Raha Hai - Aashiqui2", time: "06:30", filePath: "1.mp3" },
        { songname: "Haan Hansi Ban Gaye - Hamari Aadhuri Kahani", time: "03:12", filePath: "2.mp3" },
        { songname: "Jeene Laga Hu - Ramaiya Vastavaiya", time: "03:56", filePath: "3.mp3" },
        { songname: "Maheroo Maheroo - Super nani", time: "04:34", filePath: "4.mp3" },
        { songname: "Zihaal E Miskin - Album Song", time: "04:23", filePath: "5.mp3" },
        { songname: "Teri Meri - Bodyguard", time: "05:22", filePath: "6.mp3" },
        { songname: "Deewani Mastani - Bajirao Mastani", time: "05:53", filePath: "7.mp3" },
        { songname: "Teri Ore - Singh Is Kinng", time: "05:37", filePath: "8.mp3" }
    ];

    // Play or pause the song
    masterPlay.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            
            // Play audio
            audioElement.play();

            // Update the song name
            currentSongName.textContent = `${songs[songIndex].songname}`;

            // Update current song total-time
            currentSongTotalTime.textContent = `${songs[songIndex].time}`;

            masterPlay.src = 'https://img.icons8.com/?size=80&id=xAAZEp9992NX&format=png';
            gif.style.opacity = 1;
        } else {
            // Pause audio
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

        // Update current song total-time
        currentSongTotalTime.textContent = `${songs[songIndex].time}`;

        if (autoPlay) {
            audioElement.play();
            masterPlay.src = 'https://img.icons8.com/?size=80&id=xAAZEp9992NX&format=png';
            gif.style.opacity = 1;
        } else {
            masterPlay.src = 'https://img.icons8.com/?size=80&id=t294OHA3a4ko&format=png';
            gif.style.opacity = 0;
        }
    }

    // Add click event listeners to each song item
    document.querySelectorAll('.songName').forEach(item => {
        item.addEventListener('click', () => {
            const songId = parseInt(item.id);
            playSongAt(songId);
        });
    });

    // Forward button — go to next song
    forWard.addEventListener('click', () => {
        if(songIndex==0){
            songIndex = 7;
        }else{
            songIndex--;
        }
        playSongAt(songIndex, !audioElement.paused);
    });

    // Backward button — go to previous song
    backWard.addEventListener('click', () => {
        if(songIndex==7){
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

    // Format Time
    function formatTime(seconds) {
      console.log('1');  
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
      console.log('2'); 
    }

    // Update progress bar as song plays
    audioElement.addEventListener('timeupdate', () => {
        // Show current time in seconds
        currentSongCurrentTime.textContent = formatTime(Math.floor(audioElement.currentTime));

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