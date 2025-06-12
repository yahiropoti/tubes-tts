import fs from "node:fs/promises";

export const getFileContent = async (filename) => {
  try {
    const data = await fs.readFile(filename, {
      encoding: "utf8",
    });
    return data;
  } catch (error) {
    console.error(`Error reading ${filename}: ${error}`);
    return;
  }
};

