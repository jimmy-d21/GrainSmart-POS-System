import express from "express";
import ENV from "./utils/ENV.js";

const app = express();
app.get(`/`, (req, res) => {
  res.send(`Server is ready for GrainSmart`);
});

const PORT = ENV.server.port;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
