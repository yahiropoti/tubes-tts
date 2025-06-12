import fs from "fs";
import { v4 as uuidv4 } from "uuid";

const filePath = "./public/gallery.json";

// Baca file JSON
const rawData = fs.readFileSync(filePath);
const data = JSON.parse(rawData);

// Tambahkan UUID hanya jika belum ada
data.stories = data.stories.map((story) => {
  if (!story.id) {
    return { id: uuidv4(), ...story };
  }
  return story; // biarkan jika sudah ada id
});

// Simpan ulang ke file
fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

console.log("UUID berhasil ditambahkan untuk item yang belum memiliki ID.");
