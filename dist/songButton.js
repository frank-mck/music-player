class SongButton {
  constructor(
    audio,
    song,
    index,
    activeSong,
    songAudios,
    activeSongInx,
    songsBtns,
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
  initialize() {
    this.createButton();
  }
  toggleActiveBtn(songBtn, activeSongInx) {
    this.songsBtns[activeSongInx].element().classList.remove("font-bold");
    songBtn.element().classList.add("font-bold");
  }
  element() {
    return this.songBtn;
  }
  createButton() {
    this.songBtn = document.createElement("button");
    this.songBtn.className = "py-2 flex justify-between w-full hover:font-bold";
  }
}
