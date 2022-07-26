// server.js
const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static("dist"));

app.get("*", (req, res) =>
  res.sendFile("index.html", { root: __dirname + "/dist" })
);

app.listen(PORT, () => {
  console.log(`Server running  http://localhost:${PORT}`);
});
