const fs = require('fs');
const path = require('path');

function logQuery(search, offset) {

  // get previous search results from log file or create new array
  const logFile = path.join(__dirname, '../query-log.js');
  const requestRecord = JSON.parse(fs.readFileSync(logFile, 'utf-8')) || [];
  
  if (requestRecord.length > 9) {
    requestRecord.shift();
  }

  // create new log object and push to the main array
  const timestamp = new Date().toLocaleString();
  requestRecord.push({ timestamp, search, offset  });

  fs.writeFileSync(logFile, JSON.stringify(requestRecord));
}

module.exports = { logQuery };