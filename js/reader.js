const storyMap = {
  "cerita-anak-hebat.pdf": "20 Cerita Anak Hebat",
  "kumpulan-dongeng.pdf": "Kumpulan Cerita Dongeng Anak",
  "fabel-hewan.pdf": "Cerita Hewan Yang Penuh Makna Kehidupan",
  "petualangan-bebek.pdf": "Petualangan Bebek Dalam Mencintai Lingkungan"
};

// Ambil file dari URL
const params = new URLSearchParams(window.location.search);
const file = params.get("file");
document.getElementById("story-title").textContent = storyMap[file] || "Cerita";

const storyText = document.getElementById("story-text");
storyText.textContent = "Loading cerita...";

fetch("data/cerita/" + file.replace(".pdf", ".txt"))
  .then(res => res.text())
  .then(text => {
    storyText.textContent = text;
  })
  .catch(() => {
    storyText.textContent = "Cerita tidak ditemukan.";
  });

// TTS
let utterance;
function speakStory() {
  const text = storyText.textContent;
  if (!text) return;

  utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = speechSynthesis.getVoices()[document.getElementById("voiceSelect").value];
  utterance.rate = parseFloat(document.getElementById("rate").value);
  utterance.pitch = parseFloat(document.getElementById("pitch").value);
  utterance.volume = parseFloat(document.getElementById("volume").value);
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function stopSpeech() {
  speechSynthesis.cancel();
}

// Load suara
speechSynthesis.onvoiceschanged = () => {
  const select = document.getElementById("voiceSelect");
  select.innerHTML = "";
  speechSynthesis.getVoices().forEach((v, i) => {
    const opt = document.createElement("option");
    opt.value = i;
    opt.textContent = `${v.name} (${v.lang})`;
    select.appendChild(opt);
  });
};
