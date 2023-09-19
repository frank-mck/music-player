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

    this.initialize();
  }

  private initialize() {
    this.createButton();
  }

  toggleActiveBtn(songBtn: SongButton, activeSongInx: number) {
    this.songsBtns[activeSongInx].title().className = "";
    songBtn.title().className = "text-gray-900 font-bold";
  }

  element() {
    return this.songBtn;
  }

  title() {
    return this.songTitle;
  }

  private createButton() {
    this.songBtn = document.createElement("button");
    const textContainer = document.createElement("div");
    textContainer.className = "flex flex-col items-start";
    this.songTitle = document.createElement("span");
    const songArtist = document.createElement("span");
    this.songTitle.innerText = `${this.song.title}`;
    songArtist.innerText = `${this.song.artist}`;
    songArtist.className = "text-sm text-gray-800";

    textContainer.appendChild(this.songTitle);
    textContainer.appendChild(songArtist);
    this.songBtn.appendChild(textContainer);
    this.songBtn.className =
      "py-2 flex px-8 justify-between leading-tight w-full mx-auto rounded-md hover:bg-[var(--light-frost)]";
  }
}
