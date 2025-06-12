import express from "express";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.post("/tts", async (req, res) => {
  const { text, voice, rate, pitch, volume } = req.body;
  const key = process.env.AZURE_KEY;
  const region = process.env.AZURE_REGION;

  if (!key || !region) {
    return res.status(400).send("Missing Azure TTS credentials");
  }

  const endpoint = `https://${region}.tts.speech.microsoft.com/cognitiveservices/v1`;

  const headers = {
    "Ocp-Apim-Subscription-Key": key,
    "Content-Type": "application/ssml+xml",
    "X-Microsoft-OutputFormat": "audio-16khz-128kbitrate-mono-mp3",
  };

  const body = `
  <speak version='1.0' xml:lang='id-ID'>
    <voice name='${voice}'>
      ${text}
    </voice>
  </speak>`;

  // const rateStr = `${Math.min(Math.max(rate, 0.8), 1.5)}`; // 0.8x–1.5x speed
  // const pitchStr = `${((Math.min(Math.max(pitch, 0.8), 1.2) - 1) * 5).toFixed(
  //   1
  // )}st`; // -1st to +1st
  // const volumeStr = "default"; // hindari volume negatif

  // const body = `
  // <speak version='1.0' xml:lang='id-ID'>
  // <voice name='${voice}'>
  //     <prosody rate="${rateStr}" pitch="${pitchStr}" volume="${volumeStr}">
  //       ${text}
  //     </prosody>
  //   </voice>
  // </speak>
  // `;

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body,
    });

    if (response.status != 200) {
      const errText = await response.text();
      return res.status(500).send("Azure TTS failed: " + errText);
    }
    console.log(response);

    const audioBuffer = await response.arrayBuffer();
    console.log("test");
    res.set("Content-Type", "audio/mpeg");
    res.send(Buffer.from(audioBuffer));
  } catch (err) {
    console.error("TTS Error:", err); // Tambahkan ini
    res.status(500).send("Internal server error: " + err.message);
  }
});

export default router;
