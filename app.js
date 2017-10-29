require('dotenv').config();

const express   = require('express');
const winston   = require('winston');
const rp        = require('request-promise');
const path      = require('path');

const { buildUrl } = require('./utils/url-builder.js');
const { logQuery } = require('./utils/query-logger');
const Response = require('./utils/response-class');

const app = express(); 

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT; 

app.get('/api/imagesearch/?', (req, res, next) => {
  const { search } = req.query;
  const offset = (req.query.offset > 0 && req.query.offset <= 100) ? req.query.offset : 1;

  if (!search) {
    res.json({err: 'no search term entered'});
  } else {
    logQuery(search, offset);

    const url = buildUrl(search, offset);

    rp(url).then(jsonString => {
      const result = JSON.parse(jsonString);
      const request = result.queries.request;
      console.log({request});

      if (!+request[0].totalResults) {
        res.send('no results');
      } else {
        const responseArray = [];
        result.items.forEach(item => {
          responseArray.push(new Response(item.link, item.snippet, item.image.contextLink));
        });
  
        res.json(responseArray);
      }

    }).catch(err => {
      winston.log('error', err);
      res.status(500).json({err});
    });
  }
});

app.get('')

app.listen(port, () => {
  winston.log('info', `Listening on PORT ${port}`);
});
