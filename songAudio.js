"use strict";
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

    this.audio.addEventListener("timeupdate", (e) => this.updateTime(e));
  }

  loadAudioData(songBtn) {
    this.audio.addEventListener("loadedmetadata", () => {
      const time = this.getReadableTime(this.audio.duration);
      this.audio.time = time;

      songBtn.innerHTML = `${this.title} <span>${time}</span>`;

      if (this.index === 0) {
        new SetSongDetails(
          this.songAudios,
          this.activeSongInx,
          this.activeSong,
          this.song,
          this.index,
          this.audio,
        );
        this.activeSongBtn = songBtn;
        songBtn.classList.add("font-bold");
      }
    });
  }

  updateTime() {
    this.updateProgress(this.audio.currentTime);
    this.currentTimeEl.innerText = this.getReadableTime(this.audio.currentTime);
  }

  updateProgress(time) {
    this.progressEl.value = time / this.audio.duration;
  }

  getReadableTime(duration) {
    return `${Math.floor(duration / 60)}:${`${
      Math.floor(duration) % 60
    }`.padStart(2, "0")}`;
  }

  domElement() {
    return this.audio;
  }

  playSong() {
    this.audio.play();
  }

  stopSong() {
    this.audio.pause();
  }

  private;

  createSong() {
    this.audio = document.createElement("audio");
    this.audio.src = this.url;
    this.audio.controls = true;
    this.audio.classList.add("hidden");
  }

  loadImage() {
    const hiddenImagesEl = document.createElement("img");
    hiddenImagesEl.src = this.thumbnail;
    hiddenImagesEl.classList.add("hidden");
    document.body.appendChild(hiddenImagesEl);
  }
}
