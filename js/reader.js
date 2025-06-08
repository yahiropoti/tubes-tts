window.onload = () => {
  let voices = [];
  let indoVoices = [];
  let utterance = null;
  let originalText = "";
  let isPaused = false;
  let currentIndex = 0;
  let segments = [];
  let speaking = false;

  const contentElement = document.getElementById("story-content");
  const titleElement = document.getElementById("story-title");

  // Ambil parameter file
  const params = new URLSearchParams(window.location.search);
  const fileName = params.get("file") || "cerita-anak-hebat.pdf";

  // Mapping nama file ke judul
  const fileToTitle = {
    "cerita-anak-hebat.pdf": "20 Cerita Anak Hebat",
    "kumpulan-dongeng.pdf": "Kumpulan Cerita Dongeng Anak",
    "fabel-hewan.pdf": "Cerita Hewan Yang Penuh Makna Kehidupan",
    "petualangan-bebek.pdf": "Petualangan Bebek Dalam Mencintai Lingkungan",
    "Aini Dan Burung Kecil.txt": "Aini Dan Burung Kecil",
    "Balas Budi Burung Bangau.txt": "Balas Budi Burung Bangau",
    "Buaya Yang Tidak Jujur.txt": "Buaya Yang Tidak Jujur",
    "Faiz Sayang Kepada Adik.txt": "Faiz Sayang Kepada Adik",
    "Haydar Tidak Tidur Saat Tarawih.txt": "Haydar Tidak Tidur Saat Tarawih",
    "Keluarga Kelinci.txt": "Keluarga Kelinci",
    "Landak Yang Malang.txt": "Landak Yang Malang",
    "Lebah Yang Sombong Dan Rakus.txt": "Lebah Yang Sombong Dan Rakus",
    "Mendahulukan Posisi Tidur Menghadap Kiblat.txt": "Mendahulukan Tidur Menghadap Kiblat",
    "Menghormati Orang Yang Lebih Tua.txt": "Menghormati Orang Yang Lebih Tua",
    "Perbedaan Salat Laki Dan Perempuan.txt": "Perbedaan Salat Laki dan Perempuan",
    "Persahabatan yang saling Menasihati.txt": "Persahabatan yang Saling Menasihati",
    "Sopan Santun kepada Kakek dan Nenek.txt": "Sopan Santun kepada Kakek dan Nenek",
    "Teman Baru.txt": "Teman Baru",
    "Uswah Cinta Al-Qur’an.txt": "Uswah Cinta Al-Qur’an"
  };

  titleElement.textContent = fileToTitle[fileName] || "Cerita";

  // Ambil isi cerita dari file .txt
  fetch(`data/cerita/${fileName.replace(".pdf", ".txt")}`)
    .then(res => res.text())
    .then(text => {
      originalText = text;
      contentElement.textContent = text;
      segments = splitTextToSentences(text);
    })
    .catch(() => {
      contentElement.textContent = "Cerita tidak ditemukan.";
    });

  function splitTextToSentences(text) {
    return text.match(/[^.!?\n]+[.!?]*/g) || [text];
  }

  function loadVoices() {
    voices = speechSynthesis.getVoices();
    indoVoices = voices.filter(v => v.lang.toLowerCase().startsWith("id"));
    const voiceSelect = document.getElementById("voice-select");
    voiceSelect.innerHTML = "";
    indoVoices.forEach((voice, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = `${voice.name} (${voice.lang})`;
      voiceSelect.appendChild(option);
    });
  }
  speechSynthesis.onvoiceschanged = loadVoices;
  setTimeout(loadVoices, 500); // fallback

  window.playSpeech = function () {
    if (speaking && isPaused) {
      speechSynthesis.resume();
      isPaused = false;
      return;
    }
    if (!speaking) {
      currentIndex = 0;
      speakNextSegment();
    }
  };

  function speakNextSegment() {
    if (currentIndex >= segments.length) {
      contentElement.innerHTML = originalText;
      speaking = false;
      return;
    }

    const segment = segments[currentIndex];
    utterance = new SpeechSynthesisUtterance(segment);

    // ambil pengaturan suara terbaru setiap kali bicara
    const voiceIndex = document.getElementById("voice-select").value;
    utterance.voice = indoVoices[voiceIndex] || null;
    utterance.lang = "id-ID";
    utterance.rate = parseFloat(document.getElementById("rate")?.value || 1);
    utterance.pitch = parseFloat(document.getElementById("pitch")?.value || 1);
    utterance.volume = parseFloat(document.getElementById("volume")?.value || 1);

    // highlight
    const before = segments.slice(0, currentIndex).join(" ");
    const after = segments.slice(currentIndex + 1).join(" ");
    contentElement.innerHTML = `${before} <mark>${segment}</mark> ${after}`;

    utterance.onend = () => {
      currentIndex++;
      if (!isPaused) speakNextSegment();
    };

    speaking = true;
    speechSynthesis.speak(utterance);
  }

  window.pauseSpeech = function () {
    if (speechSynthesis.speaking && !speechSynthesis.paused) {
      speechSynthesis.pause();
      isPaused = true;
    }
  };

  window.stopSpeech = function () {
    speechSynthesis.cancel();
    utterance = null;
    isPaused = false;
    speaking = false;
    currentIndex = 0;
    contentElement.innerHTML = originalText;
  };

  // Personalisasi Tampilan
  document.getElementById("font-size").addEventListener("change", e => {
    contentElement.style.fontSize = e.target.value;
  });
  document.getElementById("bg-color").addEventListener("change", e => {
    contentElement.style.backgroundColor = e.target.value;
  });
  document.getElementById("text-color").addEventListener("change", e => {
    contentElement.style.color = e.target.value;
  });
};
