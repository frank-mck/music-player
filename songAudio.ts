interface ExtendedHTMLAudioElement extends HTMLAudioElement {
  time: string;
}

class SongAudio {
  progressEl: HTMLInputElement;
  currentTimeEl: HTMLElement;
  audio: ExtendedHTMLAudioElement;
  song: Song;
  url: string;
  thumbnail: string;
  title: string;
  artist: string;
  songAudios: SongAudio[];
  activeSongInx: number;
  index: number;
  constructor(
    song: Song,
    songAudios: SongAudio[],
    activeSongInx: number,
    index: number,
  ) {
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

  loadAudioData(songBtn: SongButton) {
    this.audio.addEventListener("loadedmetadata", () => {
      const time = this.getReadableTime(this.audio.duration);
      this.audio.time = time;

      songBtn.element().innerHTML = `${this.title} <span>${time}</span>`;

      if (this.index === 0) {
        new SetSongDetails(
          this.songAudios,
          this.activeSongInx,
          undefined,
          this.song,
          this.index,
          this,
        );
        songBtn.element().classList.add("font-bold");
      }
    });
  }

  element(): ExtendedHTMLAudioElement {
    return this.audio;
  }

  playSong() {
    this.audio.play();
  }

  stopSong() {
    this.audio.pause();
  }

  private updateTime() {
    this.updateProgress(this.audio.currentTime);
    this.currentTimeEl.innerText = this.getReadableTime(this.audio.currentTime);
  }

  private updateProgress(time: number) {
    this.progressEl.value = String(time / this.audio.duration);
  }

  private getReadableTime(duration: number) {
    return `${Math.floor(duration / 60)}:${`${
      Math.floor(duration) % 60
    }`.padStart(2, "0")}`;
  }

  private createSong() {
    this.audio = document.createElement("audio") as ExtendedHTMLAudioElement;
    this.audio.src = this.url;
    this.audio.controls = true;
    this.audio.classList.add("hidden");
  }
}
