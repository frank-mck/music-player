"use strict";

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
    this.songs = songs;
    this.repeatBtn = document.querySelector("#repeat-btn");
    this.previousBtn = document.querySelector("#prev-btn");
    this.toggleBtn = document.querySelector("#toggle-btn");
    this.nextBtn = document.querySelector("#next-btn");
    this.shuffleBtn = document.querySelector("#shuffle-btn");
    this.playlistEl = document.querySelector("#playlist");
    this.shuffleBtnActive = false;
    this.repeatBtnActive = false;
    this.activeSong = undefined;
    this.activeSongInx = undefined;
    this.activeSongBtn = undefined;
    this.songAudios = [];
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
      if (index === 0) {
        this.activeSongInx = 0;
      }

      const songAudio = new SongAudio(
        song,
        this.songAudios,
        this.activeSongInx,
        index,
      );
      const songBtn = new SongButton(
        songAudio,
        song,
        index,
        this.activeSong,
        this.songAudios,
        this.activeSongInx,
        this.songsBtns,
      );

      this.songAudios.push(songAudio.domElement());
      this.songsBtns.push(songBtn.domElement());

      songAudio.loadAudioData(songBtn.domElement());

      this.playlistEl?.appendChild(songAudio.domElement());
      this.playlistEl?.appendChild(songBtn.domElement());
      this.playlistEl.classList.add(`h-[220px]`);

      songBtn.domElement().addEventListener("click", () => {
        this.toggleActiveBtn(this.songsBtns[index]);
        this.playSelectedSong(song, index);
      });
    });
  }

  playSelectedSong(song, index) {
    if (index === this.activeSongInx) {
      return;
    }

    this.songAudios[this.activeSongInx].pause();
    this.activeSongInx = index;

    new SetSongDetails(
      this.songAudios,
      this.activeSongInx,
      this.activeSong,
      song,
      index,
      this.songAudios[index],
    );
    this.togglePlayBtn();
  }

  togglePlayBtn() {
    if (this.songAudios[this.activeSongInx].paused) {
      this.songAudios[this.activeSongInx].play();
      this.toggleBtn.classList.add("play");
    } else {
      this.songAudios[this.activeSongInx].pause();
      this.toggleBtn.classList.remove("play");
    }
  }

  stopPlayingSong() {
    if (!this.songAudios[this.activeSongInx].paused) {
      this.songAudios[this.activeSongInx].pause();
      this.toggleBtn.classList.remove("play");
    }
  }

  playSong() {
    if (this.songAudios[this.activeSongInx].paused) {
      this.songAudios[this.activeSongInx].play();
      this.toggleBtn.classList.add("play");
    }
  }

  toggleActiveBtn(songBtn) {
    this.songsBtns[this.activeSongInx].classList.remove("font-bold");
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

    this.playSong();
    new SetSongDetails(
      this.songAudios,
      this.activeSongInx,
      this.activeSong,
      this.songs[this.activeSongInx],
      this.index,
      this.songAudios[this.activeSongInx]
    );
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

    this.stopPlayingSong();
    this.playlistEl.innerHTML = "";
    this.shuffleBtn.className = "text-[#1DB954] hover:scale-105";
    this.shuffleBtnActive = true;
    this.activeSongBtn = undefined;
    this.activeSong = undefined;
    this.songsBtns = [];
    this.songAudios = [];
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

  getReadableTime(duration) {
    return `${Math.floor(duration / 60)}:${`${
      Math.floor(duration) % 60
    }`.padStart(2, "0")}`;
  }
}

new PlayAlbum(songs);
