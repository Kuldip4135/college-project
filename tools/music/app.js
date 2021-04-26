const music = document.querySelector("audio");
const musicImg = document.querySelector("img");
const musicTitle = document.getElementById("title");
const playButton = document.getElementById("playMusic");
const prevButton = document.getElementById("prevMusic");
const nextButton = document.getElementById("nextMusic");
let currentDuration = document.getElementById("currentDuration");
let totalDuration = document.getElementById("totalDuration");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progressMeter__container");
let isPlaying = false;
let songIndex = 0;

const songs = [
  {
    name: "music-1",
    title: "Music 1",
  },
  {
    name: "music-2",
    title: "Music 2",
  },
  {
    name: "music-3",
    title: "Music 3",
  },
  {
    name: "music-4",
    title: "Music 4",
  },
];

//to play music
const playMusic = () => {
  isPlaying = true;
  music.play();
  playButton.classList.replace("fa-play", "fa-pause");
  musicImg.classList.add("animateImg");
};

//to stop music
const pauseMusic = () => {
  isPlaying = false;
  music.pause();
  playButton.classList.replace("fa-pause", "fa-play");
  musicImg.classList.remove("animateImg");
};

//play & pause funcanality
playButton.addEventListener("click", () => {
  isPlaying ? pauseMusic() : playMusic();
});

//load all the songs & change dynamically by prev & next button
const loadSong = (songs) => {
  title.innerText = songs.title;
  music.src = `Music/${songs.name}.mp3`;
  console.log(music);
  musicImg.src = `Images/${songs.name}.jpg`;
};

const nextSong = () => {
  songIndex = (songIndex + 1) % songs.length;
  // 0 = (0 + 1) % 3 = 1
  // 1 = (1 + 1) % 3 = 2
  // 2 = (2 + 1) % 3 = 1 <-- so if songs finished all then it came back to first song
  loadSong(songs[songIndex]);
  playMusic();
};

const prevSong = () => {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  // 0 = (0 - 1 + 3) % 3 = 2 <-- then directly last song gonna play
  // 1 = (1 - 1 + 3) % 3 = 0 <-- then directly first song gonna play
  // 2 = (2 - 1 + 3) % 3 = 1 <-- then directly second song gonna play
  loadSong(songs[songIndex]);
  playMusic();
};

//The timeupdate event is fired when the time indicated by the currentTime attribute has been updated.
music.addEventListener("timeupdate", (event) => {
  // console.log(event.target.currentTime / 60);
  // console.log(event.target.duration / 60);

  const { currentTime, duration } = event.target;
  let min__duration = Math.floor(duration / 60);
  let sec__duration = Math.floor(duration % 60);

  let min__currentTime = Math.floor(currentTime / 60);
  let sec__currentTime = Math.floor(currentTime % 60);

  if (sec__currentTime < 10) sec__currentTime = `0${sec__currentTime}`;

  //dynamically changing duration
  totalDuration.innerText = `${min__duration} : ${sec__duration}`;
  currentDuration.innerText = `${min__currentTime} : ${sec__currentTime}`;

  //progressbar changing dynamically
  let progress__time = (currentTime / duration) * 100;
  progress.style.width = `${progress__time}%`;
});

//when you click anywhere on progress music will start from there
progressContainer.addEventListener("click", (event) => {
  //where we clicked on progressbar__container
  // console.log(event.offsetX + " here clicked in progressbar");
  //total width of progressbar__container
  // console.log(event.target.clientWidth + " here is total width of progress");

  //to find seconds: 290 total width ex 213 width we click--> 213/290 = 0.73
  //then we convert that to second & then update currentDuration
  //from there automatically our song gonna lay from their

  //here we are fetching total duration of music
  const { duration } = music; //it means const duration = music.duration;
  let move__progress = (event.offsetX / event.target.clientWidth) * duration;
  // console.log("we clicked at here(seconds) : " + move__progress);
  // console.log("total duration(seconds) : " + duration);

  //then music will play from that second which we clicked in progrss bar
  music.currentTime = move__progress;
});

//when music end...new song gonal play automatically
music.addEventListener("ended", nextSong);
nextButton.addEventListener("click", nextSong);
prevButton.addEventListener("click", prevSong);
