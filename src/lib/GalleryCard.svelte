<script>
  import { isDyslexic } from "../stores/theme.js";

  const { id, title, image, description } = $props();
</script>

<a
  href="#/gallery/{id}"
  class="{$isDyslexic
    ? 'font-opendyslexic'
    : 'font-poppins'} group relative block rounded-lg shadow-sm transition hover:shadow-lg bg-black"
>
  <img
    alt=""
    src="https://images.unsplash.com/photo-1605721911519-3dfeb3be25e7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80"
    class="absolute inset-0 h-full w-full object-cover opacity-60 transition-opacity group-hover:opacity-35"
  />

  <div class="relative p-4 sm:p-6 lg:p-8">
    <p
      class="{$isDyslexic
        ? 'sm:text-lg'
        : 'sm:text-xl'} text-base font-medium tracking-wider text-white wrap-break-word"
    >
      {title}
    </p>

    <div class=" mt-8 text-justify">
      <div
        class="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100"
      >
        <p class="{$isDyslexic ? 'sm:text-xs' : 'sm:text-sm'} text-white">
          {description}
        </p>
      </div>
    </div>
  </div>
</a>
