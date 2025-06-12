<script>
  import { isDyslexic } from "../stores/theme.js";
</script>

<section
  id="MainContent"
  class="{$isDyslexic
    ? 'font-opendyslexic'
    : 'font-poppins'} bg-[#101820] lg:grid lg:place-content-center font-inter"
>
  <div
    class="mx-auto w-screen max-w-screen-xl px-4 py-10 sm:px-6 sm:py-18 lg:px-8 {$isDyslexic
      ? 'lg:py-22'
      : 'lg:py-26'}"
  >
    <div class="text-white mx-auto max-w-[80ch] text-center">
      <h1
        class="{$isDyslexic
          ? 'font-opendyslexic'
          : 'font-urbanist'} text-4xl font-bold sm:text-6xl"
      >
        Buku Interaktif untuk
        <a
          href="https://id.wikipedia.org/wiki/Disleksia"
          class="text-[#25D377] underline font-bold font-opendyslexic"
          >disleksia</a
        >
      </h1>

      <p class="my-8 text-base text-pretty sm:text-lg/relaxed">
        Solusi inovatif yang dirancang untuk mendukung anak-anak dan individu
        dengan disleksia melalui teknologi teks-ke-ucapan yang membantu
        meningkatkan kemampuan membaca dan memahami informasi secara lebih mudah
        dan menyenangkan.
      </p>

      <div>
        <a
          class="inline-block rounded border border-gray-200 px-10 py-3 font-medium shadow-sm transition-colors hover:bg-gray-50 hover:text-gray-900"
          href="#/gallery"
        >
          Get Started
        </a>
      </div>
    </div>
  </div>
</section>
