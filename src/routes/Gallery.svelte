<script>
  import { onMount } from "svelte";
  import { isDyslexic } from "../stores/theme.js";
  import GalleryCard from "../lib/GalleryCard.svelte";

  let stories = [];
  let currentPage = 1;
  let itemsPerPage = 4;

  onMount(async () => {
    const res = await fetch("/gallery.json");
    const data = await res.json();

    stories = data.stories;
  });

  $: totalPages = Math.ceil(stories.length / itemsPerPage);

  $: paginatedStories = stories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  function goToPage(page) {
    if (page >= 1 && page <= totalPages) {
      currentPage = page;
    }
  }
</script>

<section>
  <div
    class="{$isDyslexic
      ? 'font-opendyslexic'
      : 'font-poppins'} bg-[#FDF6E3] mx-auto max-w-screen-xl px-4 py-4 sm:px-6 sm:py-8 lg:px-8"
  >
    <header>
      <h2
        class="{$isDyslexic
          ? 'font-opendyslexic sm:text-3xl'
          : 'font-urbanist sm:text-4xl'} text-2xl font-bold text-gray-900 "
      >
        Koleksi Cerita Interaktif
      </h2>

      <p class="{$isDyslexic
          ? 'font-opendyslexic text-sm'
          : 'text-base'} mt-4  max-w-md text-gray-600">
        Jelajahi berbagai cerita menarik yang bisa kamu dengarkan dan baca
        dengan mudah. Pilih cerita favoritmu dan mulai membaca!
      </p>
    </header>

    <div class="mt-8">
      <p class="text-sm text-gray-600">
        Menampilkan {paginatedStories.length} dari {stories.length} cerita
      </p>
    </div>

    <ul class="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {#each paginatedStories as story}
        <li>
          <GalleryCard
            id={story.id}
            title={story.title}
            image={story.image}
            description={story.description}
          />
        </li>
      {/each}
    </ul>

    <!-- PAGINATION -->
    <ol class="mt-8 flex justify-center gap-1 text-xs font-medium">
      <li>
        <button
          on:click={() => goToPage(currentPage - 1)}
          class="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 hover:bg-zinc-500 hover:text-white cursor-pointer"
          disabled={currentPage === 1}
        >
          <span class="sr-only">Prev Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </li>

      {#each Array(totalPages) as _, i}
        <li>
          <button
            on:click={() => goToPage(i + 1)}
            class="block size-8 rounded-sm border text-center leading-8 hover:bg-[#292828] hover:text-white
              {currentPage === i + 1
              ? 'border-black bg-black text-white'
              : 'border-gray-100 text-gray-700'}"
          >
            {i + 1}
          </button>
        </li>
      {/each}

      <li>
        <button
          on:click={() => goToPage(currentPage + 1)}
          class="inline-flex size-8 items-center justify-center rounded-sm border border-gray-100 hover:bg-zinc-500 hover:text-white cursor-pointer"
          disabled={currentPage === totalPages}
        >
          <span class="sr-only">Next Page</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </li>
    </ol>
  </div>
</section>
