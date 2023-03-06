const express = require("express");
const path = require("path");
const con = require("./controllers/database");
const { port } = require("./config");
const cors = require("cors");

const app = express();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Works");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
