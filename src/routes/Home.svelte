<script>
  import { isDyslexic } from "../stores/theme.js";
  import Banner from "../lib/Banner.svelte";
  import Card from "../lib/Card.svelte";

  const data = [
    {
      header: "Membaca Jadi Menyenangkan",
      description:
        "Nikmati pengalaman membaca yang lebih mudah dengan bantuan suara dan tampilan teks yang ramah disleksia. Cerita disajikan dengan cara yang menarik dan inklusif.",
    },
    {
      header: "Teknologi Teks-ke-Ucapan",
      description:
        "Dengarkan cerita dibacakan dengan suara alami yang dapat disesuaikan kecepatannya. Fitur ini membantu pengguna memahami teks dengan lebih baik.",
    },
    {
      header: "Desain untuk Semua Usia",
      description:
        "Dibuat dengan antarmuka sederhana, aplikasi ini dapat digunakan oleh anak-anak, remaja, maupun orang dewasa yang memiliki tantangan dalam membaca.",
    },
  ];
</script>

<main>
  <Banner />

  <section
    class="{$isDyslexic
      ? 'font-opendyslexic text-3xl'
      : 'font-urbanist text-4xl'} bg-[#CADCFF] px-10 py-20"
  >
    <h2 class="text-center font-bold  mb-12">
      Mengapa Aplikasi Ini Berbeda?
    </h2>

    <div class="grid grid-cols-3 gap-6">
      <Card {...data[0]} />
      <Card {...data[1]} />
      <Card {...data[2]} />
    </div>
  </section>
</main>
