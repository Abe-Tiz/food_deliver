const express = require("express");
const cors = require("cors");
const app = express();

const port = process.env.PORT || 6000;
app.use(cors());

app.get("/", (req, res) => {
  res.send("<h1>hello world</h1>");
});

app.listen(port, () => {
  console.log(`server started on port ${port}`);
});
