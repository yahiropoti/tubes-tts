<script>
  import { onMount } from "svelte";
  import { isDyslexic, changeFont } from "../stores/theme.js";

  const { params } = $props();
  const id = params.id;

  let story = $state(null);
  let quizzes = $state([]);
  let answers = $state([]);
  let submitted = $state(false);
  let correctCount = $state(0);
  let incorrectCount = $state(0);

  onMount(async () => {
    try {
      const res = await fetch("/gallery.json");
      const data = await res.json();
      story = data.stories.find((item) => item.id === id);
      quizzes = story.quizzes;
      answers = Array(quizzes.length).fill(null); // inisialisasi jawaban
    } catch (err) {
      console.error("Failed to load story:", err);
    }
  });

  function selectAnswer(quizIndex, option) {
    answers[quizIndex] = option;
  }

  function submitQuiz() {
    correctCount = 0;
    incorrectCount = 0;

    quizzes.forEach((quiz, i) => {
      if (answers[i] === quiz.answer) {
        correctCount++;
      } else {
        incorrectCount++;
      }
    });

    submitted = true;
  }
</script>

<section
  class="{$isDyslexic
    ? 'font-opendyslexic'
    : 'font-poppins'} bg-[#FDF6E3] mx-auto max-w-screen-xl px-4 py-8 sm:px-14 sm:py-12 lg:px-16"
>
  <header class="text-center">
    <h2
      class="{$isDyslexic
        ? 'font-opendyslexic sm:text-3xl'
        : 'font-urbanist sm:text-4xl'} text-2xl font-bold text-gray-900"
    >
      Kuis Cerita Interaktif
    </h2>

    <p
      class="{$isDyslexic
        ? 'text-sm'
        : 'text-base'} mx-auto mt-4 max-w-md text-gray-600"
    >
      Jawab pertanyaan berdasarkan cerita yang telah kamu dengarkan, dan uji
      pemahamanmu dengan cara yang menyenangkan.
    </p>
  </header>

  <div class="mt-8 grid grid-cols-1 gap-6">
    {#if quizzes.length}
      {#each quizzes as quiz, index}
        <article class="rounded-xl border border-gray-700 bg-[#faedcd] p-6">
          <h3 class="text-lg font-medium text-black mb-4">{quiz.question}</h3>

          <ul class="space-y-2">
            {#each ["a", "b", "c", "d"] as opt}
              <li>
                <button
                  class={`w-full text-left p-4 rounded-lg border ${
                    answers[index] === quiz["option_" + opt]
                      ? "border-[#d4a373] bg-[#ccd5ae]"
                      : "border-gray-700 hover:border-[#e76f51]"
                  }`}
                  onclick={() => selectAnswer(index, quiz["option_" + opt])}
                >
                  <strong class="font-medium text-[#264653]">
                    {opt.toUpperCase()}
                  </strong>
                  <p class="mt-1 text-sm">
                    {quiz["option_" + opt]}
                  </p>
                </button>
              </li>
            {/each}
          </ul>
        </article>
      {/each}

      <button
        onclick={submitQuiz}
        class="group relative inline-block text-sm font-medium text-white focus:ring-3 focus:outline-hidden cursor-pointer"
      >
        <span class="absolute inset-0 border border-[#d4a373]"></span>
        <span
          class="block border border-[#d4a373] bg-[#d4a373] px-12 py-3 transition-transform group-hover:-translate-x-1.5 group-hover:-translate-y-1.5"
        >
          Simpan Jawaban
        </span>
      </button>

      {#if submitted}
        <!-- Divider -->
        <span class="flex items-center my-6">
          <span
            class="h-px flex-1 bg-gradient-to-r from-transparent to-gray-400"
          ></span>

          <span class="shrink-0 px-4 text-gray-900">Hasil Kuis</span>

          <span
            class="h-px flex-1 bg-gradient-to-l from-transparent to-gray-400"
          ></span>
        </span>

        <!-- Hasil Kuis -->
        <div>
          <h2 class="sr-only">Steps</h2>

          <div>
            <ol
              class="grid grid-cols-1 divide-x divide-gray-100 overflow-hidden rounded-lg border border-gray-100 text-sm text-gray-500 sm:grid-cols-3"
            >
              <li
                class="flex items-center justify-center gap-2 bg-[#679289] text-white p-4"
              >
                <span
                  class="absolute top-1/2 -left-2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-s-0 ltr:border-b-0 ltr:bg-white rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-50"
                >
                </span>

                <span
                  class="absolute top-1/2 -right-2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-s-0 ltr:border-b-0 ltr:bg-gray-50 rtl:border-e-0 rtl:border-t-0 rtl:bg-white"
                >
                </span>

                <svg
                  class="size-7 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>

                <p class="leading-none">
                  <strong class="block font-medium"> Jawaban Benar </strong>
                  <small class="mt-1 text-sm">
                    {correctCount}
                  </small>
                </p>
              </li>

              <li
                class="relative flex items-center justify-center gap-2 bg-[#F25C54] text-white p-4"
              >
                <span
                  class="absolute top-1/2 -left-2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-s-0 ltr:border-b-0 ltr:bg-white rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-50"
                >
                </span>

                <span
                  class="absolute top-1/2 -right-2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-s-0 ltr:border-b-0 ltr:bg-gray-50 rtl:border-e-0 rtl:border-t-0 rtl:bg-white"
                >
                </span>

                <svg
                  class="size-7 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2"
                  />
                </svg>

                <p class="leading-none">
                  <strong class="block font-medium"> Jawaban Salah </strong>
                  <small class="mt-1 text-sm"> {incorrectCount} </small>
                </p>
              </li>

              <li
                class="relative flex items-center justify-center gap-2 bg-[#3DA5D9] text-white p-4"
              >
                <span
                  class="absolute top-1/2 -left-2 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-s-0 ltr:border-b-0 ltr:bg-white rtl:border-e-0 rtl:border-t-0 rtl:bg-gray-50"
                >
                </span>

                <span
                  class="absolute top-1/2 -right-5 hidden size-4 -translate-y-1/2 rotate-45 border border-gray-100 sm:block ltr:border-s-0 ltr:border-b-0 ltr:bg-gray-50 rtl:border-e-0 rtl:border-t-0 rtl:bg-white"
                >
                </span>

                <svg
                  class="size-7 shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                  />
                </svg>

                <p class="leading-none">
                  <strong class="block font-medium"> Point </strong>
                  <small class="mt-1 text-sm"> {correctCount * 20} pts </small>
                </p>
              </li>
            </ol>
          </div>
        </div>
      {/if}
    {:else}
      <p class="text-center text-gray-700">Memuat kuis...</p>
    {/if}
  </div>
</section>
