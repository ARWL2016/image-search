/**
 * This file contains controller methods serving the two API routes in app.js
 * @function getLatestBooks - wrapper around readQueryLog() - returns max last 10 queries
 * @function searchImages - 
 *  1. collects query data from form; 
 *  2. calls log query if data valid 
 *  3. calls buildUrl method
 *  4. makes GET request using Google custom search 
 *  5. parses the results and send res
 */

const rp = require("request-promise");

const { readQueryLog, logQuery } = require("../utils/query-logger");
const { buildUrl } = require("../utils/url-builder.js");
const Response = require("../utils/response-class");

function getLatestBooks(req, res) {
  const queries = readQueryLog();
  res.json(queries);
}

function searchImages(req, res) {
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
          result.items.forEach(item => {
            responseArray.push(new Response(item.link, item.snippet, item.image.contextLink));
          });

          res.json(responseArray);
        }
    }).catch(err => {
        winston.log("error", err);
        res.status(500).send("Something went wrong");
    });
  }
}

module.exports = { getLatestBooks, searchImages };
