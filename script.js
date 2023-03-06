'use strict';
const img = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const curTimeEl = document.getElementById('cur-time');
const durationEl = document.getElementById('duration');
const prewBtn = document.getElementById('prew');
const playBtn = document.getElementById('play');
const forwBtn = document.getElementById('forw');

let isPlaying = false;

let songIndex = 0;

const songs = [
  {
    name: 'jacinto-1',
    displayName: 'Electric Chill Machine',
    artist: 'Jacinto',
  },
  {
    name: 'jacinto-2',
    displayName: 'Seven Nation Army (remix)',
    artist: 'Nurik',
  },
  {
    name: 'jacinto-3',
    displayName: 'Good night, Disco Queen',
    artist: 'Kanan N.',
  },
];

const playMusic = function () {
  isPlaying = true;
  playBtn.classList.replace('fa-play', 'fa-pause');
  playBtn.setAttribute('title', 'pause');
  music.play();
};

const pauseMusic = function () {
  isPlaying = false;
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'play');
  music.pause();
};

playBtn.addEventListener('click', () =>
  isPlaying ? pauseMusic() : playMusic()
);

const loadSongs = function (song) {
  title.textContent = song.displayName;
  artist.innerText = song.artist;
  music.src = `music/${song.name}.mp3`;
  img.src = `img/${song.name}.jpg`;
};

loadSongs(songs[songIndex]);

const prewSong = function () {
  songIndex--;
  if (songIndex < 0) {
    songIndex = songs.length - 1;
  }
  loadSongs(songs[songIndex]);
  playMusic();
};

const nextSong = function () {
  songIndex++;
  if (songIndex > songs.length - 1) {
    songIndex = 0;
  }
  loadSongs(songs[songIndex]);
  playMusic();
};

prewBtn.addEventListener('click', prewSong);
forwBtn.addEventListener('click', nextSong);

music.addEventListener('timeupdate', function (e) {
  const { currentTime, duration } = e.srcElement;

  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;

  const progressDurationMin = Math.floor(duration / 60);
  let progressDurationSec = Math.floor(duration % 60);

  if (progressDurationSec < 10) {
    progressDurationSec = `0${progressDurationSec}`;
  }

  if (progressDurationSec) {
    durationEl.textContent = `${progressDurationMin}:${progressDurationSec}`;
  }

  //curTime elements

  const curTimeMin = Math.floor(currentTime / 60);
  let curTimeSec = Math.floor(currentTime % 60);

  if (curTimeSec < 10) {
    curTimeSec = `0${curTimeSec}`;
  }

  curTimeEl.textContent = `${curTimeMin}:${curTimeSec}`;
});

const setProgressBar = function (e) {
  const width = this.clientWidth;
  const offset = e.offsetX;
  const { duration } = music;
  music.currentTime = (offset / width) * duration;
};

progressContainer.addEventListener('click', setProgressBar);
music.addEventListener('ended', nextSong);
