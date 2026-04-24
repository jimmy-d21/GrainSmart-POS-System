import express from "express";

const app = express();

app.get(`/`, (req, res) => {
  res.send(`Server is ready for GrainSmart`);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server is running on PORT: ${PORT}`));
