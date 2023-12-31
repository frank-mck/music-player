class SetSongDetails {
  private currentTimeEl: HTMLElement;
  private titleEl: HTMLElement;
  private artistEl: HTMLElement;
  private totalTimeEl: HTMLElement;
  private thumbnailEl: HTMLImageElement;
  songAudios: SongAudio[];
  activeSongInx: number;
  activeSong: Song;
  song: Song;
  index: number;
  audio: SongAudio;

  constructor(
    songAudios: SongAudio[],
    activeSongInx: number,
    activeSong: Song | undefined,
    song: Song,
    index: number,
    audio: SongAudio,
  ) {
    this.currentTimeEl = document.querySelector("#current-time");
    this.titleEl = document.querySelector("#title");
    this.artistEl = document.querySelector("#artist");
    this.totalTimeEl = document.querySelector("#total-time");
    this.thumbnailEl = document.querySelector("#thumbnail");

    this.songAudios = songAudios;
    this.activeSongInx = activeSongInx;
    this.activeSong = activeSong;
    this.song = song;
    this.index = index;
    this.audio = audio;

    this.setNewSong();
  }

  setNewSong() {
    this.songAudios[this.activeSongInx].element().currentTime = 0;
    this.currentTimeEl.innerText = "0:00";
    this.activeSong = this.song;
    this.totalTimeEl.innerText = this.getReadableTime(
      this.audio.element().duration,
    );
    this.thumbnailEl.src = this.song.thumbnail;
    this.titleEl.innerText = this.song.title;
    this.artistEl.innerText = this.song.artist;
  }

  getReadableTime(duration) {
    return `${Math.floor(duration / 60)}:${`${
      Math.floor(duration) % 60
    }`.padStart(2, "0")}`;
  }
}
