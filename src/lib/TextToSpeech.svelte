<script>
  import Alert from "./Alert.svelte";

  const { title } = $props();

  let textInput = "";
  let maxTextInput = 10;
  let isSpeaking = false;
  let isError = false;

  function speakText() {
    if (textInput.length > maxTextInput) {
      isError = true;
      return;
    }

    if (!textInput.trim()) return;

    const utterance = new SpeechSynthesisUtterance(textInput);
    utterance.onstart = () => (isSpeaking = true);
    utterance.onend = () => (isSpeaking = false);
    speechSynthesis.speak(utterance);
  }

  function stopSpeaking() {
    speechSynthesis.cancel();
    isSpeaking = false;
  }

  function handleCloseAlert() {
    isError = false;
  }
</script>

<div class="p-10 relative">
  <h1>Text to Speech</h1>

  <div class="bg-white p-6 rounded-lg shadow-md font-inter">
    <div class="flex justify-between items-center mb-4">
      <span class="text-2xl font-semibold text-gray-800">Masukan Teks</span>
      <span class="text-sm font-medium text-gray-600 font-urbanist">
        {textInput.length}/{maxTextInput} karakter
      </span>
    </div>

    <label for="Notes">
      <span class="text-sm font-medium text-gray-700"> {title} </span>

      <textarea
        id="Notes"
        class="mt-0.5 w-full resize-none border-gray-300 sm:text-sm font-mono p-4 text-sm rounded-sm border mb-4"
        placeholder="Cerita akan ditampilkan disini..."
        rows="5"
      ></textarea>
    </label>
  </div>

  {#if isError}
    <Alert on:close={handleCloseAlert} />
  {/if}

  <div class="mt-4 flex justify-center gap-4 sm:mt-6">
    <button
      class="rounded border border-indigo-600 bg-indigo-600 px-5 py-3 font-medium text-white hover:bg-indigo-700"
      on:click={speakText}
      disabled={isSpeaking}
    >
      Ucapkan
    </button>

    <button
      class="rounded border border-gray-200 px-5 py-3 font-medium text-gray-700 hover:bg-gray-50"
      on:click={stopSpeaking}
      disabled={!isSpeaking}
    >
      Stop
    </button>
  </div>
</div>
