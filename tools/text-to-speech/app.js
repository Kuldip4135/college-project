const textInput = document.getElementById("text");
const speedInput = document.getElementById("speed");
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const stopButton = document.getElementById("stopButton");
let voiceSelect = document.getElementById("selectedVoice");

function loadVoices() {
  // Fetch the available voices.
  let voices = speechSynthesis.getVoices();

  // Loop through each of the voices.
  voices.forEach(function (voice, i) {
    // Create a new option element.
    let option = document.createElement("option");

    // Set the options value and text.
    option.value = voice.name;
    option.innerHTML = voice.name;

    // Add the option to the voice selector.
    voiceSelect.appendChild(option);
  });
}

// Execute loadVoices.
loadVoices();

// Chrome loads voices asynchronously.
window.speechSynthesis.onvoiceschanged = function (e) {
  loadVoices();
};

playButton.addEventListener("click", () => {
  playText(textInput.value);
});

pauseButton.addEventListener("click", pauseText);
stopButton.addEventListener("click", stopText);

function playText(text) {
  //to again resume after doing pause
  if (speechSynthesis.paused && speechSynthesis.speaking) {
    return speechSynthesis.resume();
  }

  //speak back to us
  const utterance = new SpeechSynthesisUtterance();
  utterance.text = text;
  utterance.rate = speedInput.value || 1;

  if (voiceSelect.value) {
    utterance.voice = speechSynthesis.getVoices().filter((voice) => {
      return voice.name == voiceSelect.value;
    })[0];
  }

  utterance.addEventListener("end", () => (textInput.disabled = false));
  textInput.disabled = true;
  speechSynthesis.speak(utterance);
}

function pauseText() {
  //to pause
  if (speechSynthesis.speaking) speechSynthesis.pause();
}

function stopText() {
  //first pause & then cancle
  speechSynthesis.resume();
  speechSynthesis.cancel();
}
