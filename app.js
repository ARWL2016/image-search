require('dotenv').config();

const express   = require('express');
const winston   = require('winston');
const rp        = require('request-promise');
const path      = require('path');
const { buildUrl } = require('./url-builder.js');

const app = express(); 

app.use(express.static(path.join(__dirname, 'public')));

const port = process.env.PORT || 5000;  

app.get('/api/imagesearch/?', (req, res, next) => {
  const { search } = req.query;
  const offset = (req.query.offset > 0 && req.query.offset <= 100) ? req.query.offset : 1;

  if (!search) {
    res.json({err: 'no search term entered'});
  } else {
    const url = buildUrl(search, offset);
    res.json({url});

  }

  
});

// error handler
app.use('/', function (err, req, res, next) {
  if (err) {
    winston.log('error', err);
    res.status(500).json({err});
  }
})

app.listen(port, () => {
  winston.log('info', `Listening on PORT ${port}`);
});
