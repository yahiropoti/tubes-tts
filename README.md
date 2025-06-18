# **Buku Interaktif Disleksia**

Aplikasi web yang inklusif dan edukatif untuk membantu anak-anak dan individu dengan disleksia membaca cerita secara lebih menyenangkan dan mudah, menggunakan teknologi *Text-to-Speech* dari [Microsoft Azure](https://azure.microsoft.com/en-us/), dan kuis interaktif untuk pemahaman interaktif.

## Fitur Utama
- Text‑to‑Speech — Cerita dibacakan dengan suara alami dari Microsoft Azure Cognitive Services.
- Tipografi Ramah Disleksia — Menggunakan font OpenDyslexic, jarak huruf & spasi yang dapat disesuaikan.
- Galeri Cerita Interaktif — Pilih dari berbagai kisah, siap didengar & dibaca.
- Kuis Pemahaman — Pertanyaan adaptif setelah cerita untuk melatih ingatan & pemahaman.
- Responsif & Aksesibel — Bekerja mulus di desktop, tablet, maupun perangkat seluler.
- REST API — Backend Node.js/Express untuk data cerita, kuis, dan pengguna.

## Mulai Cepat
1. Clone & Install
```bash
# Clone repositori
git clone -b svelte-ui https://github.com/yahiropoti/tubes-tts.git
cd tubes-tts

# Instal dependensi
npm install
```

2. Konfigurasi Environment
```bash
cp .env.example .env
```
Lalu isi variabel berikut:
| Key            | Deskripsi   |
| -------------- | ----------- |
| AZURE_KEY      | Azure Cognitive Services key      |
| AZURE_REGION   | Azure Region (mis. *southeastasia*) |

3. Run Development Mode (run in separate terminal)
```bash
# Front‑end
npm run dev

# Back‑end
npm run server
```

## Menambah Cerita Baru
1. Menambahkan cerita baru ke [public/gallery.json](public/gallery.json).
2. Gambar disimpan di [public/storyImages](public/storyImages).
3. Jalankan ```npm run add-uuid``` – untuk menambahkan id unik pada cerita baru.


## Lisensi
Proyek ini menggunakan lisensi MIT License. Anda bebas untuk menggunakan, memodifikasi, dan mendistribusikan ulang proyek ini sesuai dengan ketentuan lisensi.