"use strict";
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

  toggleActiveBtn(songBtn) {
    this.songsBtns[this.activeSongInx].classList.remove("font-bold");
    this.songsBtns[this.activeSongInx] = songBtn;
    songBtn.classList.add("font-bold");
  }

  domElement() {
    return this.songBtn;
  }

  createButton() {
    this.songBtn = document.createElement("button");
    this.songBtn.className = "py-2 flex justify-between w-full hover:font-bold";
  }
}
