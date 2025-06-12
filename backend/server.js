import express from "express";
import cors from "cors";

import azureTTS from "./routes/azureTTS.js";
import azureVoices from "./routes/azureVoices.js";
import nodeFS from "./routes/nodeFS.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", [azureTTS, azureVoices, nodeFS]);

app.listen(8000, () => {
  console.log("Server running on port 8000");
});
