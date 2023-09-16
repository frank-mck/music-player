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

class PlayAlbum {
  constructor(
    songs
  ) {
    this.songs = songs;
    this.titleEl = document.querySelector('#title');
    this.artistEl = document.querySelector('#artist');
    this.thumbnailEl = document.querySelector('#thumbnail');
    this.progressEl = document.querySelector('#progress');
    this.currentTimeEl = document.querySelector('#current-time');
    this.totalTimeEl = document.querySelector('#total-time');
    this.repeatBtn = document.querySelector('#repeat-btn');
    this.previousBtn = document.querySelector('#prev-btn');
    this.toggleBtn = document.querySelector('#toggle-btn');
    this.nextBtn = document.querySelector('#next-btn');
    this.shuffleBtn = document.querySelector('#shuffle-btn');
    this.playlistEl = document.querySelector('#playlist');
    this.playbtn = document.querySelector("[data-target-play]");
    this.pausebtn = document.querySelector("[data-target-pause]");
    this.activeSong = undefined;
    this.songsEls = [];
    this.activeSongInx = undefined;

    this.iterateSongs();
  }

  iterateSongs() {
    this.songs.forEach((song, index) => {
      this.createSong(song, index)
    })
  }

  createSong(song, index) {
    const songBtn = document.createElement('button');
    const songEl = document.createElement('audio');

    this.songsEls.push(songEl)

    songBtn.className = 'py-2 flex justify-between w-full hover:font-bold';
    songEl.src = song.url;
    songEl.controls = true;
    songEl.classList.add('hidden')

    this.playlistEl?.appendChild(songEl);

    songEl.addEventListener('loadedmetadata', () => {
      const time = this.getReadableTime(songEl.duration);
      song.time = time;
  
      songBtn.innerHTML = `${song.title} <span>${time}</span>`;
      this.playlistEl?.appendChild(songBtn);
  
      if (index === 0) {
        this.activeSongInx = index;
        this.setSongDetails(songEl, song);
      }
    })

    songBtn.addEventListener('click', () => {
      this.activeSongInx = index;
      this.activeSong = song;
      this.setSongDetails(songEl, this.activeSong);
    })
  
    songEl.addEventListener("timeupdate", () => {
      const { currentTime } = songEl;
      this.updateProgress(currentTime)
      this.currentTimeEl.innerText = this.getReadableTime(currentTime)
    });

    this.toggleBtn.addEventListener('click', () => {
      this.playbtn.classList.toggle('hidden');
      this.pausebtn.classList.toggle('hidden');
  
      if (this.songsEls[this.activeSongInx].paused) {
        this.songsEls[this.activeSongInx].play();
      } else {
        this.songsEls[this.activeSongInx].pause();
      }
    })
  }

  getReadableTime(duration) {
    return `${Math.floor(duration / 60)}:${`${Math.floor(duration) % 60}`.padStart(2, '0')}`;
  }

  updateProgress(time) {
    this.progressEl.value = time / this.songsEls[this.activeSongInx].duration;
  }
 
  setSongDetails(songEl, song) {
    this.songsEls[this.activeSongInx].currentTime = 0;
    this.currentTimeEl.innerText = '0:00';
    this.activeSong = songEl;
    this.totalTimeEl.innerText = song.time;
    this.thumbnailEl.src = song.thumbnail;
    this.titleEl.innerText = song.title;
    this.artistEl.innerText = song.artist;
  }
}

new PlayAlbum(songs);
