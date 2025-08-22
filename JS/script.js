console.log("Welcome to Spotify");

document.addEventListener('DOMContentLoaded', () => {
    console.log("🎵 DOM fully loaded");

    // DOM elements
    const masterPlay = document.getElementById('masterPlay');
    const myProgressBar = document.getElementById('myProgressBar');
    const gif = document.getElementById('gif');
    const forWard = document.getElementById('forward');
    const backWard = document.getElementById('backward');
    const currentSongName = document.getElementById('currentSong');
    const currentSongCurrentTime = document.getElementById('currentTime');
    const currentSongTotalTime = document.getElementById('totalTime');

    // Toggle logic
    document.addEventListener('DOMContentLoaded', function () {
        const toggleButton = document.getElementById('menuToggle');
        const optionsMenu = document.getElementById('options'); // this matches your HTML id

        if (toggleButton && optionsMenu) {
            toggleButton.addEventListener('click', function () {
                optionsMenu.classList.toggle('active');
            });
        }
    });

    // Handle navigation clicks
    const singerLinks = document.querySelectorAll("a[class$='-page-link']");
    singerLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            event.preventDefault();
            const targetPage = event.currentTarget.getAttribute("href").split("/").pop();
            let songs = [];

            switch (targetPage) {
                case "arijit.html":
                    songs = [
                        { songname: "Sanam Re - sanam Re", time: "04:29", filePath: "../Songs/6.mp3" },
                        { songname: "Janam Janam - Dilwale", time: "03:08", filePath: "../Songs/7.mp3" },
                        { songname: "Hamari Adhuri Kahani - Hamari Adhuri Kahani", time: "05:45", filePath: "../Songs/8.mp3" },
                        { songname: "Enna Sona - OK Jaanu", time: "03:40", filePath: "../Songs/9.mp3" },
                        { songname: "Zaalima - Raees", time: "02:51", filePath: "../Songs/10.mp3" },
                    ];
                    break;
                case "kk.html":
                    songs = [
                        { songname: "Zara Sa - Jannat", time: "03:47", filePath: "../Songs/16.mp3" },
                        { songname: "Haan Tu Hain - Jannat", time: "04:46", filePath: "../Songs/17.mp3" },
                        { songname: "Tuhi Meri Shab Hai - Gangster", time: "06:41", filePath: "../Songs/18.mp3" },
                        { songname: "Tera Mera Rista - Awarapan", time: "05:13", filePath: "../Songs/19.mp3" },
                        { songname: "Kya Mujhe Pyaar Hai - Woh Lamhe", time: "04:23", filePath: "../Songs/20.mp3" },
                    ];
                    break;
                case "shreya.html":
                    songs = [
                        { songname: "Sun Raha Hai - Aashiqui2", time: "06:30", filePath: "../Songs/1.mp3" },
                        { songname: "Haan Hansi Ban Gaye - Hamari Aadhuri Kahani", time: "03:12", filePath: "../Songs/2.mp3" },
                        { songname: "Jeene Laga Hu - Ramaiya Vastavaiya", time: "03:56", filePath: "../Songs/3.mp3" },
                        { songname: "Maheroo Maheroo - Super nani", time: "04:34", filePath: "../Songs/4.mp3" },
                        { songname: "Deewani Mastani - Bajirao Mastani", time: "05:53", filePath: "../Songs/5.mp3" },
                    ];
                    break;
                case "sonu.html":
                    songs = [
                        { songname: "Kal Ho Naa Ho - Kal Ho Naa Ho", time: "04:47", filePath: "../Songs/11.mp3" },
                        { songname: "Abhi Mujh Mein Kahin - Agneepath", time: "04:15", filePath: "../Songs/12.mp3" },
                        { songname: "Mere Hath Mein - Fanaa", time: "04:43", filePath: "../Songs/13.mp3" },
                        { songname: "Tumse Milke Dil Ka - Main Hoon Na", time: "05:40", filePath: "../Songs/14.mp3" },
                        { songname: "Suraj Hua Maddham - Kabhi Khushi Kabhi Gham", time: "07:57", filePath: "../Songs/15.mp3" },
                    ];
                    break;
                case "old90s.html":
                    songs = [
                        { songname: "Tere Liye - Veer Zaara", time: "05:33", filePath: "../Songs/21.mp3" },
                        { songname: "Bahut Pyar Karte Hai - Saajan", time: "04:27", filePath: "../Songs/22.mp3" },
                        { songname: "Main Yahaan Hoon - Veer Zaara", time: "04:56", filePath: "../Songs/23.mp3" },
                        { songname: "Saat Samundar Paar - Vishwatma", time: "06:25", filePath: "../Songs/24.mp3" },
                        { songname: "Janam Meri Janam - Mr. Bechara", time: "04:19", filePath: "../Songs/25.mp3" },
                    ];
                    break;
            }

            sessionStorage.setItem("songs", JSON.stringify(songs));
            sessionStorage.setItem("songIndex", "0");
            window.location.href = targetPage;
        });
    });

    // Load songs from sessionStorage
    let songs = JSON.parse(sessionStorage.getItem("songs")) || [];
    let songIndex = parseInt(sessionStorage.getItem("songIndex")) || 0;
    let audioElement = new Audio(songs[songIndex]?.filePath || "");

    // Play or pause the song
    masterPlay?.addEventListener('click', () => {
        if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
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
        sessionStorage.setItem("songIndex", songIndex.toString());
        audioElement.src = songs[songIndex].filePath;
        audioElement.currentTime = 0;
        myProgressBar.value = 0;
        currentSongName.textContent = songs[songIndex].songname;
        currentSongTotalTime.textContent = songs[songIndex].time;

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
            const index = parseInt(item.id); // Assuming each .songName element has an ID like "0", "1", etc.
            if (!isNaN(index)) {
                playSongAt(index, true); // Play the selected song
            } else {
                console.warn("Invalid song index on element:", item);
            }
        });
    });

    // Forward button — go to next song 
    forWard?.addEventListener('click', () => {
        songIndex = (songIndex === 0) ? songs.length - 1 : songIndex - 1;
        playSongAt(songIndex, !audioElement.paused);
    });

    // Backward button — go to previous song
    backWard?.addEventListener('click', () => {
        songIndex = (songIndex === songs.length - 1) ? 0 : songIndex + 1;
        playSongAt(songIndex, !audioElement.paused);
    });

    // Format time
    function formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    // Update progress bar as song plays
    audioElement.addEventListener('timeupdate', () => {
        currentSongCurrentTime.textContent = formatTime(audioElement.currentTime);
        currentSongName.textContent = songs[songIndex].songname;
        currentSongTotalTime.textContent = songs[songIndex].time;

        const progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
        myProgressBar.value = progress;

        if (progress >= 100) {
            const nextIndex = (songIndex === songs.length - 1) ? 0 : songIndex + 1;
            playSongAt(nextIndex, true);
        }
    });

    // Seek song when user changes progress bar
    myProgressBar?.addEventListener('change', () => {
        audioElement.currentTime = (myProgressBar.value / 100) * audioElement.duration;
    });

});