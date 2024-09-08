const songs = [
    { title: 'Song 1', artist: 'Artist 1', src: 'C:/Users/GOWSHIKA D/Downloads/song 1.mp3', cover: 'C:/Users/GOWSHIKA D/Downloads/cover 1.jpg' },
    { title: 'Song 2', artist: 'Artist 2', src: 'C:/Users/GOWSHIKA D/Downloads/song 2.mp3', cover: 'C:/Users/GOWSHIKA D/Downloads/cover 2.jpg' },
    { title: 'Song 3', artist: 'Artist 3', src: 'C:/Users/GOWSHIKA D/Downloads/song 3.mp3', cover: 'C:/Users/GOWSHIKA D/Downloads/cover 3.jpg' }
];

let currentSongIndex = 0;
const audioPlayer = document.getElementById('audio-player');
const albumCover = document.getElementById('album-cover');
const songTitle = document.getElementById('song-title');
const playPauseBtn = document.getElementById('play-pause-btn');
const progressBar = document.getElementById('progress-bar');
const volumeControl = document.getElementById('volume-control');

function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    albumCover.src = song.cover;
    songTitle.textContent = ${song.title} - ${song.artist};
    audioPlayer.play().catch(error => console.error('Error playing audio:', error));
    playPauseBtn.textContent = 'Pause';
    currentSongIndex = index;
}

function playPause() {
    if (audioPlayer.paused) {
        audioPlayer.play().catch(error => console.error('Error playing audio:', error));
        playPauseBtn.textContent = 'Pause';
    } else {
        audioPlayer.pause();
        playPauseBtn.textContent = 'Play';
    }
}

function nextSong() {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
}

function prevSong() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
}

playPauseBtn.addEventListener('click', playPause);
document.getElementById('next-btn').addEventListener('click', nextSong);
document.getElementById('prev-btn').addEventListener('click', prevSong);

audioPlayer.addEventListener('timeupdate', () => {
    progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
});

progressBar.addEventListener('input', () => {
    audioPlayer.currentTime = (progressBar.value / 100) * audioPlayer.duration;
});

volumeControl.addEventListener('input', () => {
    audioPlayer.volume = volumeControl.value / 100;
});

// Load the first song initially
loadSong(currentSongIndex);