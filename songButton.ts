class SongButton {
  songBtn: HTMLElement;
  audio: SongAudio;
  song: Song;
  songsBtns: SongButton[];
  index: number;
  activeSong: Song;
  songAudios: SongAudio[];
  activeSongInx: number;
  constructor(
    audio: SongAudio,
    song: Song,
    index: number,
    activeSong: Song,
    songAudios: SongAudio[],
    activeSongInx: number,
    songsBtns: SongButton[],
  ) {
    this.songBtn;
    this.audio = audio;
    this.song = song;
    this.index = index;
    this.activeSong = activeSong;
    this.songAudios = songAudios;
    this.activeSongInx = activeSongInx;
    this.songsBtns = songsBtns;

    this.initialize();
  }

  private initialize() {
    this.createButton();
  }

  toggleActiveBtn(songBtn: SongButton, activeSongInx: number) {
    this.songsBtns[activeSongInx].element().classList.remove("font-bold");
    songBtn.element().classList.add("font-bold");
  }

  element() {
    return this.songBtn;
  }

  private createButton() {
    this.songBtn = document.createElement("button");
    this.songBtn.className = "py-2 flex justify-between w-full hover:font-bold";
  }
}
