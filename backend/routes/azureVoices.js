import express from "express";
const router = express.Router();

router.get("/voices", async (req, res) => {
  const key = process.env.AZURE_KEY;
  const region = process.env.AZURE_REGION;
  try {
    const response = await fetch(
      `https://${region}.tts.speech.microsoft.com/cognitiveservices/voices/list`,
      {
        headers: {
          "Ocp-Apim-Subscription-Key": key,
        },
      }
    );

    const voices = await response.json();

    // Filter hanya voice untuk bahasa Indonesia
    const filtered = voices.filter((v) => v.Locale === "id-ID");
    res.json(filtered);
  } catch (err) {
    console.error("Error fetching voices from Azure:", err);
    res.status(500).send("Failed to fetch voices");
  }
});

export default router;
