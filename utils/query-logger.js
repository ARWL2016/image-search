/**
 * The time and arguments of the last 10 user search queries are stored in query-log.js as JSON
 * For demonstration purposes, we are storing logs directly on the server
 * @function logQuery - adds a log to the query-log.js file
 * @function getQueries - gets all queries (max 10) 
 */

const fs = require('fs');
const path = require('path');

const logFile = path.join(__dirname, '../query-log.js');

function logQuery(search, offset) {

  const requestRecord = getQueries();
  
  // retain history of 10 search logs
  if (requestRecord.length > 9) {
    requestRecord.shift();
  }

  // create new log object and push to the main array
  const timestamp = new Date().toLocaleString();
  requestRecord.push({ timestamp, search, offset  });

  fs.writeFileSync(logFile, JSON.stringify(requestRecord));
}

function getQueries() {
  // get previous search results from log file or create new array
  return JSON.parse(fs.readFileSync(logFile, 'utf-8')) || [];
}

module.exports = { logQuery, getQueries };