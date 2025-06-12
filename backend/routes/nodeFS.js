import express from "express";
const router = express.Router();
import fs from "node:fs/promises";
import path from "node:path";

router.post("/fs", async (req, res) => {
  const { filename } = req.body;

  try {
    const filePath = path.resolve("data/cerita", filename); 
    const content = await fs.readFile(filePath, { encoding: "utf8" });
    res.json({ content });
  } catch (err) {
    console.error("Node FS Error:", err);
    res.status(500).send("Internal server error: " + err.message);
  }
});

export default router;
