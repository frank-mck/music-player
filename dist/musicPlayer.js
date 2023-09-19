const songs = [
    {
        title: "Night Vlog",
        artist: "Footsteps on the moon",
        url: "https://raw.githubusercontent.com/florinpop17/stream-songs/master/night-vlog.mp3",
        thumbnail: "https://images.unsplash.com/photo-1489549132488-d00b7eee80f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=333&q=80",
    },
    {
        title: "Ambient",
        artist: "Footsteps on the moon",
        url: "https://raw.githubusercontent.com/florinpop17/stream-songs/master/ambient.mp3",
        thumbnail: "https://images.unsplash.com/photo-1534790021298-16d65d290461?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=333&q=80",
    },
    {
        title: "Garage",
        artist: "Footsteps on the moon",
        url: "https://raw.githubusercontent.com/florinpop17/stream-songs/master/garage.mp3",
        thumbnail: "https://images.unsplash.com/photo-1551522435-a13afa10f103?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=333&q=80",
    },
    {
        title: "Study",
        artist: "Footsteps on the moon",
        url: "https://raw.githubusercontent.com/florinpop17/stream-songs/master/study.mp3",
        thumbnail: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=333&q=80",
    },
    {
        title: "Forest",
        artist: "Footsteps on the moon",
        url: "https://raw.githubusercontent.com/florinpop17/stream-songs/master/forest.mp3",
        thumbnail: "https://images.unsplash.com/photo-1511497584788-876760111969?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=333&q=80",
    },
];
class MusicPlayer {
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
            var _a, _b, _c, _d;
            if (index === 0) {
                this.activeSongInx = 0;
            }
            const songAudio = new SongAudio(song, this.songAudios, this.activeSongInx, index);
            const songBtn = new SongButton(songAudio, song, index, this.activeSong, this.songAudios, this.activeSongInx, this.songsBtns);
            (_a = this.songAudios) === null || _a === void 0 ? void 0 : _a.push(songAudio);
            (_b = this.songsBtns) === null || _b === void 0 ? void 0 : _b.push(songBtn);
            songAudio.loadAudioData(songBtn);
            this.playlistEl.classList.add(`h-[220px]`);
            (_c = this.playlistEl) === null || _c === void 0 ? void 0 : _c.appendChild(songAudio.element());
            (_d = this.playlistEl) === null || _d === void 0 ? void 0 : _d.appendChild(songBtn.element());
            songBtn.element().addEventListener("click", () => {
                songBtn.toggleActiveBtn(this.songsBtns[index], this.activeSongInx);
                this.playSelectedSong(song, index);
            });
        });
    }
    playSelectedSong(song, index) {
        if (index === this.activeSongInx) {
            return;
        }
        this.songAudios[this.activeSongInx].element().pause();
        this.activeSongInx = index;
        new SetSongDetails(this.songAudios, this.activeSongInx, this.activeSong, song, index, this.songAudios[index]);
        this.togglePlayBtn();
    }
    togglePlayBtn() {
        if (this.songAudios[this.activeSongInx].element().paused) {
            this.songAudios[this.activeSongInx].element().play();
            this.toggleBtn.classList.add("play");
        }
        else {
            this.songAudios[this.activeSongInx].element().pause();
            this.toggleBtn.classList.remove("play");
        }
    }
    skipSong(type) {
        let index;
        if (type === "next") {
            index = this.skipNextSong();
        }
        else if (type === "prev") {
            index = this.skipPrevSong();
        }
        this.songAudios[this.activeSongInx].playSong();
        new SetSongDetails(this.songAudios, this.activeSongInx, this.activeSong, this.songs[this.activeSongInx], index, this.songAudios[this.activeSongInx]);
    }
    skipPrevSong() {
        const index = this.activeSongInx === 0 ? songs.length - 1 : this.activeSongInx - 1;
        const songBtn = this.songsBtns[index];
        songBtn.toggleActiveBtn(songBtn, this.activeSongInx);
        this.songAudios[this.activeSongInx].stopSong();
        this.toggleBtn.classList.add("play");
        this.activeSongInx--;
        if (this.activeSongInx < 0) {
            this.activeSongInx = this.songs.length - 1;
        }
        return index;
    }
    skipNextSong() {
        const index = this.activeSongInx === this.songs.length - 1 ? 0 : this.activeSongInx + 1;
        const songBtn = this.songsBtns[index];
        songBtn.toggleActiveBtn(songBtn, this.activeSongInx);
        this.songAudios[this.activeSongInx].stopSong();
        this.toggleBtn.classList.add("play");
        this.activeSongInx++;
        if (this.activeSongInx > songs.length - 1) {
            this.activeSongInx = 0;
        }
        return index;
    }
    shuffleSongs() {
        if (this.shuffleBtnActive) {
            this.shuffleBtn.className = "hover:font-bold hover:text-gray-900";
            this.shuffleBtnActive = false;
            return;
        }
        let currentIndex = this.songs.length, randomIndex;
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
        this.songAudios[this.activeSongInx].stopSong();
        this.toggleBtn.classList.remove("play");
        this.playlistEl.innerHTML = "";
        this.shuffleBtn.className = "text-[var(--active-color)] hover:scale-105";
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
        this.repeatBtn.className = "text-[var(--active-color)] hover:scale-105";
    }
}
new MusicPlayer(songs);
