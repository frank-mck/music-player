class SongButton {
  songBtn: HTMLElement;
  audio: SongAudio;
  song: Song;
  songsBtns: SongButton[];
  index: number;
  activeSong: Song;
  songAudios: SongAudio[];
  activeSongInx: number;
  songTitle: HTMLElement | undefined;
  activeSongIcon: HTMLElement | undefined;
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
    this.songTitle = undefined;
    this.activeSongIcon = undefined;

    this.initialize();
  }

  private initialize() {
    this.createButton();
  }

  toggleActiveBtn(songBtn: SongButton, activeSongInx: number) {
    this.songsBtns[activeSongInx].title().className = "";
    this.songsBtns[activeSongInx].activeIcon().classList.add("hidden");
    songBtn.title().className = "text-[var(--active-color)] font-bold";
    songBtn.activeIcon().classList.remove("hidden");
  }

  element() {
    return this.songBtn;
  }

  title() {
    return this.songTitle;
  }

  activeIcon() {
    return this.activeSongIcon;
  }

  private createButton() {
    this.songBtn = document.createElement("button");
    this.songTitle = document.createElement("span");
    const textContainer = document.createElement("div");
    const songArtist = document.createElement("span");
    this.activeSongIcon = document.createElement("span");

    this.songTitle.innerText = `${this.song.title}`;
    songArtist.innerText = `${this.song.artist}`;

    songArtist.className = "text-sm text-gray-800";
    textContainer.className = "flex flex-col items-start";
    this.activeSongIcon.className =
      "w-2 h-2 rounded-full bg-[var(--active-color)] absolute left-3 top-[50%] -translate-y-[50%] hidden";
    this.songBtn.className =
      "py-[5px] flex relative px-8 justify-between m-0 p-0 items-center leading-tight w-full mx-auto rounded-md hover:bg-[var(--light-frost)]";

    textContainer.appendChild(this.activeSongIcon);
    textContainer.appendChild(this.songTitle);
    textContainer.appendChild(songArtist);
    this.songBtn.appendChild(textContainer);
  }
}
