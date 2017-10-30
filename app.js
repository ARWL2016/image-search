require("dotenv").config();

const express = require("express");
const winston = require("winston");
const rp = require("request-promise");
const helmet = require("helmet");
const cors = require("cors");
const path = require("path");

const {buildUrl} = require("./utils/url-builder.js");
const {logQuery, readQueryLog} = require("./utils/query-logger");
const Response = require("./utils/response-class");

const app = express();

app.use(express.static(path.join(__dirname, "public")));
app.use(helmet());
app.use(cors());

const port = process.env.PORT;

// GET - log of previous 10 search queries
app.get("/api/latest/imagesearch", (req, res) => {
  const queries = readQueryLog();
  res.json(queries);
});

// GET - results of custom image search of imgur
app.get("/api/imagesearch/?", (req, res) => {
  const {search} = req.query;

  // limit offset value to 1-50 (0 offset returns error)
  const offset = (req.query.offset > 0 && req.query.offset <= 50) ?
    req.query.offset : 1;

  if (!search) {
    res.json({err: "no search term entered"});
  } else {
    logQuery(search, offset);

    const url = buildUrl(search, offset);

    rp(url)
      .then((jsonString) => {
        const result = JSON.parse(jsonString);
        const {request} = result.queries;

        // totalResults is a string - coerce to number then check if 0
        if (!+request[0].totalResults) {
          res.json({result: "No results found"});
        } else {
          const responseArray = [];
          result.items.forEach((item) => {
            responseArray.push(new Response(item.link, item.snippet, item.image.contextLink));
          });

          res.json(responseArray);
        }
    }).catch((err) => {
        winston.log("error", err);
        res.status(500).send("Something went wrong");
    });
  }
});

app.listen(port, () => {
  winston.log("info", `Listening on PORT ${port}`);
});
