const songs = [
  {
    title: "Night Vlog",
    artist: "Footsteps on the moon",
    url: "https://raw.githubusercontent.com/florinpop17/stream-songs/master/night-vlog.mp3",
    thumbnail:
      "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=333&q=80",
  },
  {
    title: "Ambient",
    artist: "Footsteps on the moon",
    url: "https://raw.githubusercontent.com/florinpop17/stream-songs/master/ambient.mp3",
    thumbnail:
      "https://images.unsplash.com/photo-1534790021298-16d65d290461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=333&q=80",
  },
  {
    title: "Garage",
    artist: "Footsteps on the moon",
    url: "https://raw.githubusercontent.com/florinpop17/stream-songs/master/garage.mp3",
    thumbnail:
      "https://images.unsplash.com/photo-1551522435-a13afa10f103?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=333&q=80",
  },
  {
    title: "Study",
    artist: "Footsteps on the moon",
    url: "https://raw.githubusercontent.com/florinpop17/stream-songs/master/study.mp3",
    thumbnail:
      "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=333&q=80",
  },
  {
    title: "Forest",
    artist: "Footsteps on the moon",
    url: "https://raw.githubusercontent.com/florinpop17/stream-songs/master/forest.mp3",
    thumbnail:
      "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=333&q=80",
  },
];

class PlayAlbum {
  constructor(songs) {
    this.orderedSongs = songs;
    this.songs = songs;
    this.titleEl = document.querySelector("#title");
    this.artistEl = document.querySelector("#artist");
    this.thumbnailEl = document.querySelector("#thumbnail");
    this.progressEl = document.querySelector("#progress");
    this.currentTimeEl = document.querySelector("#current-time");
    this.totalTimeEl = document.querySelector("#total-time");
    this.repeatBtn = document.querySelector("#repeat-btn");
    this.previousBtn = document.querySelector("#prev-btn");
    this.toggleBtn = document.querySelector("#toggle-btn");
    this.nextBtn = document.querySelector("#next-btn");
    this.shuffleBtn = document.querySelector("#shuffle-btn");
    this.playlistEl = document.querySelector("#playlist");
    this.playbtn = document.querySelector("[data-target-play]");
    this.pausebtn = document.querySelector("[data-target-pause]");
    this.shuffleBtnActive = false;
    this.repeatBtnActive = false;
    this.activeSong = undefined;
    this.activeSongInx = undefined;
    this.activeSongBtn = undefined;
    this.songsEls = [];
    this.songsBtns = [];

    this.iterateSongs = this.iterateSongs.bind(this);
    this.skipSong = this.skipSong.bind(this);
    this.shuffleSongs = this.shuffleSongs.bind(this);
    this.repeatSong = this.repeatSong.bind(this);
    this.togglePlayBtn = this.togglePlayBtn.bind(this);

    this.nextBtn.addEventListener("click", () => this.skipSong("next"));
    this.previousBtn.addEventListener("click", () => this.skipSong("prev"));
    this.shuffleBtn.addEventListener("click", () => this.shuffleSongs());
    this.repeatBtn.addEventListener("click", () => this.repeatSong());
    this.toggleBtn.addEventListener("click", () => this.togglePlayBtn());

    this.iterateSongs();
  }

  iterateSongs() {
    this.songs.forEach((song, index) => {
      const { songBtn, songEl } = this.createSong(song);

      songEl.addEventListener("loadedmetadata", () => {
        const time = this.getReadableTime(songEl.duration);
        song.time = time;

        songBtn.innerHTML = `${song.title} <span>${time}</span>`;

        if (index === 0) {
          this.activeSongInx = index;
          this.setSongDetails(song, songEl);
          this.activeSongBtn = songBtn;
          songBtn.classList.add("font-bold");
        }
      });

      this.playlistEl?.appendChild(songBtn);
      this.playlistEl.classList.add(`h-[220px]`);

      songBtn.addEventListener("click", () => {
        this.stopPlayingSong();
        this.toggleActiveBtn(songBtn);
        this.activeSongInx = index;
        this.activeSong = song;
        this.setSongDetails(this.activeSong, songEl);
        this.songsEls[this.activeSongInx].play();
      });

      songEl.addEventListener("timeupdate", () => {
        const { currentTime } = songEl;
        this.updateProgress(currentTime);
        this.currentTimeEl.innerText = this.getReadableTime(currentTime);
      });
    });
  }

  createSong(song) {
    const songBtn = document.createElement("button");
    const songEl = document.createElement("audio");

    this.songsEls.push(songEl);
    this.songsBtns.push(songBtn);

    songBtn.className = "py-2 flex justify-between w-full hover:font-bold";
    songEl.src = song.url;
    songEl.controls = true;
    songEl.classList.add("hidden");

    this.playlistEl?.appendChild(songEl);

    // load all images
    const hiddenImagesEl = document.createElement("img");
    hiddenImagesEl.src = song.thumbnail;
    hiddenImagesEl.classList.add("hidden");
    document.body.appendChild(hiddenImagesEl);

    return { songBtn, songEl };
  }

  togglePlayBtn() {
    this.playbtn.classList.toggle("hidden");
    this.pausebtn.classList.toggle("hidden");

    if (this.songsEls[this.activeSongInx].paused) {
      this.songsEls[this.activeSongInx].play();
    } else {
      this.songsEls[this.activeSongInx].pause();
    }
  }

  stopPlayingSong() {
    if (!this.songsEls[this.activeSongInx].paused) {
      this.songsEls[this.activeSongInx].pause();
    }
    this.playbtn.classList.add("hidden");
    this.pausebtn.classList.remove("hidden");
  }

  toggleActiveBtn(songBtn) {
    this.activeSongBtn.classList.remove("font-bold");
    this.activeSongBtn = songBtn;
    songBtn.classList.add("font-bold");
  }

  skipSong(type) {
    let index;

    if (type === "next") {
      index =
        this.activeSongInx === this.songs.length - 1
          ? 0
          : this.activeSongInx + 1;
      const songBtn = this.songsBtns[index];
      this.toggleActiveBtn(songBtn);
      this.stopPlayingSong();
      this.activeSongInx++;

      if (this.activeSongInx > songs.length - 1) {
        this.activeSongInx = 0;
      }
    } else if (type === "prev") {
      index =
        this.activeSongInx === 0 ? songs.length - 1 : this.activeSongInx - 1;
      const songBtn = this.songsBtns[index];
      this.toggleActiveBtn(songBtn);
      this.stopPlayingSong();
      this.activeSongInx--;

      if (this.activeSongInx < 0) {
        this.activeSongInx = this.songs.length - 1;
      }
    }

    this.songsEls[index].play();
    this.setSongDetails(this.songs[this.activeSongInx]);
  }

  shuffleSongs() {
    if (this.shuffleBtnActive) {
      this.shuffleBtn.className = "hover:font-bold hover:text-gray-900";
      this.shuffleBtnActive = false;

      return;
    }
    let currentIndex = this.songs.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex > 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [this.songs[currentIndex], this.songs[randomIndex]] = [
        this.songs[randomIndex],
        this.songs[currentIndex],
      ];
    }

    // this.stopPlayingSong();
    this.playlistEl.innerHTML = "";
    this.shuffleBtn.className = "text-[#1DB954] hover:scale-105";
    this.shuffleBtnActive = true;
    this.activeSongBtn = undefined;
    this.activeSong = undefined;
    this.songsBtns = [];
    this.iterateSongs();
  }

  repeatSong() {
    if (this.repeatBtnActive) {
      this.repeatBtnActive = false;
      this.repeatBtn.className = "hover:font-bold hover:text-gray-900";
      return;
    }
    this.repeatBtnActive = true;
    this.repeatBtn.className = "text-[#1DB954] hover:scale-105";
  }

  setSongDetails({ time, thumbnail, title, artist }, songEl) {
    this.songsEls[this.activeSongInx].currentTime = 0;
    this.currentTimeEl.innerText = "0:00";
    this.activeSong = songEl;
    this.totalTimeEl.innerText = time;
    this.thumbnailEl.src = thumbnail;
    this.titleEl.innerText = title;
    this.artistEl.innerText = artist;
  }

  getReadableTime(duration) {
    return `${Math.floor(duration / 60)}:${`${
      Math.floor(duration) % 60
    }`.padStart(2, "0")}`;
  }

  updateProgress(time) {
    this.progressEl.value = time / this.songsEls[this.activeSongInx].duration;
  }
}

new PlayAlbum(songs);
