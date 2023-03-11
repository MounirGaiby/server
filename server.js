const express = require("express");
const { port } = require("./config");
const router = require("./routes/indexRouter");

const app = express();

app.use(router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
