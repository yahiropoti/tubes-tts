const urlParams = new URLSearchParams(window.location.search);
const title = urlParams.get("title");
document.getElementById("title").textContent = title;

fetch("data/stories.json")
  .then(res => res.json())
  .then(data => {
    const story = data.stories.find(s => s.title === title);
    const container = document.getElementById("story-container");

    if (!story) {
      container.textContent = "Cerita tidak ditemukan.";
      return;
    }

    const text = story.text;
    container.textContent = text;
    speakText(text, container);
  });

// Personalisasi Tampilan
const storyContainer = document.getElementById("story-container");

document.getElementById("font-size-selector").addEventListener("change", (e) => {
  storyContainer.style.fontSize = e.target.value;
});

document.getElementById("bg-color-selector").addEventListener("change", (e) => {
  storyContainer.style.backgroundColor = e.target.value;
});

document.getElementById("text-color-selector").addEventListener("change", (e) => {
  storyContainer.style.color = e.target.value;
});

let currentUtterance;
function speakText(text, container) {
  if (!window.speechSynthesis) {
    alert("Browser tidak mendukung TTS.");
    return;
  }

  currentUtterance = new SpeechSynthesisUtterance(text);
  currentUtterance.lang = "id-ID";
  currentUtterance.rate = 1;

  currentUtterance.onboundary = (event) => {
    const index = event.charIndex;
    if (index < text.length) {
      const pre = text.slice(0, index);
      const word = text.slice(index).split(" ")[0];
      const post = text.slice(index + word.length);
      container.innerHTML = `${pre}<mark>${word}</mark>${post}`;
    }
  };

  speechSynthesis.cancel(); // pastikan tidak ada bacaan sebelumnya
  speechSynthesis.speak(currentUtterance);
}

function toggleSpeech() {
  if (speechSynthesis.speaking) {
    if (speechSynthesis.paused) {
      speechSynthesis.resume();
    } else {
      speechSynthesis.pause();
    }
  }
}
