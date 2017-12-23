require("dotenv").config();

const express = require("express");
const winston = require("winston");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const { getLatestBooks, searchImages } = require("./controllers");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(cors());

const port = process.env.PORT;

// GET - log of previous 10 search queries
app.get("/api/latest/imagesearch", getLatestBooks);

// GET - results of custom image search of imgur
app.get("/api/imagesearch/?", searchImages);

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
})

app.listen(port, () => {
  winston.log("info", `Listening on PORT ${port}`);
});
