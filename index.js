const songs = [
  {
    title: 'Ambient',
    artist: 'Foot steps on the moon',
    url: 'https://raw.githubusercontent.com/florinpop17/stream-songs/master/ambient.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1534790021298-16d65d290461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1770&q=80',
  },
  {
    title: 'Garage',
    artist: 'No name',
    url: 'https://raw.githubusercontent.com/florinpop17/stream-songs/master/garage.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1551522435-a13afa10f103?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2340&q=80',
  },{
    title: 'Night Vlog',
    artist: 'No name',
    url: 'https://raw.githubusercontent.com/florinpop17/stream-songs/master/night-vlog.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2187&q=80',
  },
  {
    title: 'Study',
    artist: 'No name',
    url: 'https://raw.githubusercontent.com/florinpop17/stream-songs/master/study.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2273&q=80',
  },
  {
    title: 'Forest',
    artist: 'No name',
    url: 'https://raw.githubusercontent.com/florinpop17/stream-songs/master/forest.mp3',
    thumbnail: 'https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2232&q=80',
  }
]

let activeSong = undefined;

const titleEl = document.querySelector('#title');
const artistEl = document.querySelector('#artist');
const thumbnailEl = document.querySelector('#thumbnail');
const progressEl = document.querySelector('#progress');
const currentTimeEl = document.querySelector('#current-time');
const totalTimeEl = document.querySelector('#total-time');
const repeatBtn = document.querySelector('#repeat-btn');
const previousBtn = document.querySelector('#prev-btn');
const toggleBtn = document.querySelector('#toggle-btn');
const nextBtn = document.querySelector('#next-btn');
const shuffleBtn = document.querySelector('#shuffle-btn');
const playlistEl = document.querySelector('#playlist');
const playbtn = document.querySelector("[data-target-play]");
const pausebtn = document.querySelector("[data-target-pause]");

songs.forEach((song, index) => {
  const songBtn = document.createElement('button');
  const songEl = document.createElement('audio');

  songBtn.className = 'py-2 flex justify-between w-full hover:font-bold';
 
  songEl.src = song.url;
  songEl.controls = true;

  playlistEl.appendChild(songEl);

  songEl.addEventListener('loadedmetadata', () => {
    const time = getReadableTime(songEl.duration);
    song.time = time;

    songBtn.innerHTML = `${song.title} <span>${time}</span>`;
    playlistEl.appendChild(songBtn);

    if (index === 0) {
      currentTimeEl.innerText =`0:00`;
      totalTimeEl.innerText = time;
      getSongDetails(song);
    }
  })

  songEl.addEventListener("timeupdate", () => {
    const { currentTime } = songEl;
    updateProgress(currentTime)
    currentTimeEl.innerText = getReadableTime(currentTime)
  });

  toggleBtn.addEventListener('click', () => {
    playbtn.classList.toggle('hidden');
    pausebtn.classList.toggle('hidden');

    if (activeSong.paused) {
      activeSong.play();
    } else {
      activeSong.pause();
    }
  })

  function updateProgress(time) {
    progressEl.value = time / (activeSong.duration * 100);
  }

  function getSongDetails(song) {
    activeSong = songEl;
    totalTimeEl.innerText = song.time;
    thumbnailEl.src = song.thumbnail;
    titleEl.innerText = song.title;
    artistEl.innerText = song.artist;
  }

  function getReadableTime(duration) {
    return `${Math.floor(duration / 60)}:${`${Math.floor(duration) % 60}`.padStart(2, '0')}`;
  }
  
})