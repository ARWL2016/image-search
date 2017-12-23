require("dotenv").config();

const express = require("express");
const winston = require("winston");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");
const ms = require('ms');

const { getLatestBooks, searchImages } = require("./controllers");

const app = express();

app.use(helmet());
app.use(helmet.contentSecurityPolicy({
  directives: {
    defaultSrc: ["'self'"], 
    styleSrc: ["'self'", 'https://fonts.googleapis.com'],
    fontSrc: ['https://fonts.gstatic.com']
  }
}));

const staticOptions = {
  maxAge: ms('10d')
}; 

const corsOptions = {
  methods: 'GET'
}

app.use(express.static(path.join(__dirname, "public"), staticOptions));

app.use(cors(corsOptions));

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
