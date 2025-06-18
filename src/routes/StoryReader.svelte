<script>
  import { onMount } from "svelte";
  import { isDyslexic } from "../stores/theme.js";

  const { params } = $props();
  const quizId = params.id;

  let story = $state(null);
  let textareaEl = $state("");
  // let voiceSelectEl;

  // let selectedAzureGender;
  let audioEl;

  let rate = $state(1);
  let pitch = $state(1);
  let volume = $state(1);
  let isPlaying = $state(false);
  let isPaused = $state(false);
  // let voices = $state([]);

  let azureVoices = $state([]);
  let selectedAzureVoice = $state("");

  // let utterance;

  onMount(async () => {
    try {
      // Ambil data cerita
      const resStory = await fetch("/gallery.json");
      const dataStory = await resStory.json();
      story = dataStory.stories.find((item) => item.id === quizId);

      // Ambil data konten/isi cerita
      const resFS = await fetch("http://localhost:8000/api/fs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ filename: story.file }),
      });
      const dataFS = await resFS.json();
      textareaEl = dataFS.content || "Gagal menampilkan isi cerita";

      // Ambil daftar model suara microsoft azure
      const resVoices = await fetch("http://localhost:8000/api/voices");
      const dataVoices = await resVoices.json();
      azureVoices = dataVoices;
      selectedAzureVoice = azureVoices[0]?.ShortName;

      // Ambil daftar suara
      // const loadVoices = () => {
      //   voices = speechSynthesis.getVoices();
      //   // console.log(
      //   // "Available voices:",
      //   //   voices.map((v) => `${v.name} - ${v.lang}`)
      //   // );
      //   // console.log(voices);
      // };

      // speechSynthesis.onvoiceschanged = loadVoices;
      // loadVoices();
    } catch (err) {
      console.error("Failed to load:", err);
      return;
    }
  });

  async function speakWithAzure() {
    const text = textareaEl;
    if (!text) return;
    if (!selectedAzureVoice) return;

    isPlaying = true;

    try {
      const res = await fetch("http://localhost:8000/api/tts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text,
          voice: selectedAzureVoice,
          rate,
          pitch,
          volume,
        }),
      });

      if (!res.ok) {
        const err = await res.text();
        throw new Error(err);
      }

      const audioBlob = await res.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      audioEl.src = audioUrl;
      audioEl.play();

      audioEl.onended = () => {
        isPlaying = false;
      };
    } catch (err) {
      console.error("TTS Error:", err);
      isPlaying = false;
    }
  }

  // function speakStory() {
  //   const text = textareaEl?.value;
  //   if (!text) return;

  //   utterance = new SpeechSynthesisUtterance(text);
  //   const selectedVoiceIndex = parseInt(voiceSelectEl?.value || 0);
  //   utterance.voice = voices[selectedVoiceIndex] || voices[0];
  //   utterance.rate = rate;
  //   utterance.pitch = pitch;
  //   utterance.volume = volume;

  //   speechSynthesis.cancel();
  //   isPlaying = true;

  //   utterance.onend = () => {
  //     isPlaying = false;
  //   };

  //   speechSynthesis.speak(utterance);
  // }

  function stopSpeech() {
    if (audioEl && !audioEl.paused) {
      audioEl.pause();
    }

    speechSynthesis.cancel(); // hanya berlaku untuk Web Speech API
    isPlaying = false;
    isPaused = true;
  }

  function resumeSpeech() {
    if (audioEl && audioEl.paused) {
      audioEl.play();

      isPlaying = true;
      isPaused = false;
    }
  }
</script>

<section>
  <div
    class="{$isDyslexic
      ? 'font-opendyslexic'
      : 'font-poppins'} bg-[#FDF6E3] mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8"
  >
    <header class="text-center">
      <h2
        class="{$isDyslexic
          ? 'font-opendyslexic sm:text-3xl'
          : 'font-urbanist sm:text-4xl'} text-2xl font-bold text-gray-900"
      >
        Pembaca Cerita Interaktif
      </h2>

      <p
        class="{$isDyslexic
          ? 'text-sm'
          : 'text-base'} mx-auto mt-4 max-w-md text-gray-600"
      >
        Dengarkan cerita favoritmu dibacakan dengan suara yang jernih dan nyaman
        melalui teknologi text-to-speech.
      </p>
    </header>

    {#if story}
      <div class="mt-8 grid grid-cols-1 gap-2 lg:gap-6 mb-24">
        <!-- Konten Cerita -->
        <div class="bg-white p-6 rounded-xl shadow">
          <label for="Notes">
            <span
              class="{$isDyslexic
                ? 'text-lg'
                : 'text-xl'}  font-semibold text-[#212529]"
            >
              <i class="fa-solid fa-book-open me-1"></i>
              {story.title}
            </span>

            <textarea
              id="Notes"
              bind:value={textareaEl}
              readonly
              class="{$isDyslexic
                ? 'text-xs'
                : 'sm:text-sm'} w-full resize-none border-gray-300 p-4 text-sm rounded-sm border mt-5 whitespace-pre-line"
              placeholder="Cerita akan ditampilkan disini..."
              rows="25"
            ></textarea>
          </label>
        </div>

        <div class="grid grid-cols-1 gap-2 lg:grid-cols-3 lg:gap-6">
          <!-- Pengaturan Suara -->
          <div class="h-52 rounded lg:col-span-2">
            <div class=" bg-white p-6 rounded-xl shadow">
              <span
                class="{$isDyslexic
                  ? 'text-lg'
                  : 'text-xl'}  font-semibold text-[#212529]"
              >
                <i class="fa-solid fa-sliders me-1"></i> Pengaturan Suara
              </span>

              <!-- Voice Select -->
              <div class="flex justify-evenly items-center my-6">
                <div>
                  <label for="voiceSelect">
                    <span class={$isDyslexic ? "text-sm" : "text-base"}>
                      Pilihan Suara
                    </span>
                    <select
                      id="voiceSelect"
                      bind:value={selectedAzureVoice}
                      class="{$isDyslexic
                        ? 'sm:text-xs'
                        : 'sm:text-sm'} mt-2 w-full rounded-md border border-gray-300 shadow px-4 py-3"
                    >
                      <option value="">Silakan pilih</option>
                      {#each azureVoices as voice (voice.Name)}
                        <option value={voice.ShortName}>
                          Microsoft {voice.DisplayName} ({voice.Gender}) - {voice.LocaleName}
                        </option>
                      {/each}
                    </select>
                  </label>
                </div>

                <!-- Gender Select -->
                <!-- <div>
                  <label for="genderSelect">
                    <span class="text-md"> Gender Suara </span>

                    <select
                      id="genderSelect"
                      bind:value={selectedAzureGender}
                      class="mt-2 w-full rounded-md border border-gray-300 shadow sm:text-sm px-4 py-3"
                    >
                      <option value="Female">Perempuan</option>
                      <option value="Male">Laki-laki</option>
                    </select>
                  </label>
                </div> -->
              </div>

              <!-- Divider -->
              <!-- <span class="flex items-center">
                <span class="h-px flex-1 bg-gray-300"></span>
                <span class="h-px flex-1 bg-gray-300"></span>
              </span> -->

              <!-- Slider -->
              <!-- <div class="flex justify-evenly items-center gap-3 my-6">
                <div class="flex flex-col gap-4">
                  <label for="rate">
                    <i class="fa-solid fa-gauge"></i> Kecepatan:
                    <span>{rate.toFixed(1)}</span>x
                  </label>
                  <input
                    type="range"
                    id="rate"
                    min="0.5"
                    max="2"
                    step="0.1"
                    bind:value={rate}
                  />
                </div>

                <div class="flex flex-col gap-4">
                  <label for="pitch">
                    <i class="fas fa-wave-square"></i> Nada:
                    <span>{pitch.toFixed(1)}</span>
                  </label>
                  <input
                    type="range"
                    id="pitch"
                    min="0.5"
                    max="2"
                    step="0.1"
                    bind:value={pitch}
                  />
                </div>

                <div class="flex flex-col gap-4">
                  <label for="volume">
                    <i class="fa-solid fa-volume-high"></i> Volume:
                    <span>{Math.round(volume * 100)}</span>%
                  </label>
                  <input
                    type="range"
                    id="volume"
                    min="0"
                    max="1"
                    step="0.1"
                    bind:value={volume}
                  />
                </div>
              </div> -->
            </div>
          </div>

          <!-- Pratinjau dan Kontrol -->
          <div class="h-52 rounded">
            <audio bind:this={audioEl} style="display: none;"></audio>

            <div class="bg-white p-6 rounded-xl shadow">
              <span
                class="{$isDyslexic
                  ? 'text-lg'
                  : 'text-xl'} font-semibold text-[#212529]"
              >
                <i class="fa-solid fa-play me-1"></i> Pratinjau & Kontrol
              </span>

              <div class="flex justify-around items-center gap-5 my-6">
                <!-- Tombol Mendengarkan -->
                <button
                  onclick={speakWithAzure}
                  disabled={isPlaying}
                  class="{isPlaying
                    ? 'opacity-50 cursor-not-allowed'
                    : 'cursor-pointer'} inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:ring-3 focus:outline-hidden"
                >
                  Dengarkan
                </button>

                <!-- Tombol Berhenti -->
                <button
                  onclick={stopSpeech}
                  class="{isPaused
                    ? 'hidden'
                    : 'inline-block'} rounded-sm border border-current px-8 py-3 text-sm font-medium text-indigo-600 transition hover:bg-gray-200 focus:ring-3 focus:outline-hidden cursor-pointer"
                >
                  Berhenti
                </button>

                <!-- Tombol Lanjutkan -->
                {#if isPaused}
                  <button
                    onclick={resumeSpeech}
                    class="{isPaused
                      ? 'hidden'
                      : 'inline-block'} inline-block rounded-sm border border-current px-8 py-3 text-sm font-medium text-green-600 transition hover:bg-gray-200 focus:ring-3 focus:outline-hidden cursor-pointer"
                  >
                    Lanjutkan
                  </button>
                {/if}
              </div>

              <!-- Divider -->
              <span class="flex items-center">
                <span class="h-px flex-1 bg-gray-300"></span>
                <span class="h-px flex-1 bg-gray-300"></span>
              </span>

              <div class=" items-center my-6">
                <label
                  for="voiceSelect"
                  class="flex flex-col justify-between gap-4"
                >
                  <span
                    class="{isDyslexic ? 'text-sm' : 'text-base'} text-center"
                  >
                    Uji pemahaman dengan mengerjakan kuis
                  </span>
                  <a
                    class="inline-block rounded-sm bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-105 hover:shadow-xl focus:ring-3 focus:outline-hidden text-center"
                    href="#/gallery/{quizId}/quiz"
                  >
                    Kerjakan kuis
                  </a>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    {/if}
  </div>
</section>
