class SongAudio {
  constructor(song, songAudios, activeSongInx, index) {
    this.progressEl = document.querySelector("#progress");
    this.currentTimeEl = document.querySelector("#current-time");
    this.audio;
    this.song = song;
    this.url = song.url;
    this.thumbnail = song.thumbnail;
    this.title = song.title;
    this.artist = song.artist;
    this.songAudios = songAudios;
    this.activeSongInx = activeSongInx;
    this.index = index;
    this.initialize();
  }
  initialize() {
    this.createSong();
    this.audio.addEventListener("timeupdate", (e) => this.updateTime());
  }
  loadAudioData(songBtn) {
    this.audio.addEventListener("loadedmetadata", () => {
      const time = this.getReadableTime(this.audio.duration);
      this.audio.time = time;
      const span = document.createElement("span");
      span.innerText = time;
      span.className = "text-sm";
      songBtn.element().appendChild(span);
      if (this.index === 0) {
        new SetSongDetails(
          this.songAudios,
          this.activeSongInx,
          undefined,
          this.song,
          this.index,
          this,
        );
        songBtn.title().className = "text-[var(--active-color)] font-bold";
        songBtn.activeSongIcon.classList.remove("hidden");
      }
    });
  }
  element() {
    return this.audio;
  }
  playSong() {
    this.audio.play();
  }
  stopSong() {
    this.audio.pause();
  }
  updateTime() {
    this.updateProgress(this.audio.currentTime);
    this.currentTimeEl.innerText = this.getReadableTime(this.audio.currentTime);
  }
  updateProgress(time) {
    this.progressEl.value = String(time / this.audio.duration);
  }
  getReadableTime(duration) {
    return `${Math.floor(duration / 60)}:${`${
      Math.floor(duration) % 60
    }`.padStart(2, "0")}`;
  }
  createSong() {
    this.audio = document.createElement("audio");
    this.audio.src = this.url;
    this.audio.controls = true;
    this.audio.classList.add("hidden");
  }
}
