/**
 * The time and arguments of the last 10 user search queries are stored in query-log.js as JSON
 * For demonstration purposes, we are storing logs directly on the server
 * @function logQuery - adds a log to the query-log.js file
 * @function readQueryLog - gets all queries (max 10) 
 */

const fs = require("fs");
const { logFile } = require("../config");

function logQuery(search, offset) {

  const requestRecord = readQueryLog();
  
  // retain history of 10 search logs
  if (requestRecord.length > 9) {
    requestRecord.shift();
  }

  // create new log object and push to the main array
  const timestamp = new Date().toLocaleString();
  requestRecord.push({ timestamp, search, offset  });

  fs.writeFileSync(logFile, JSON.stringify(requestRecord));
}

function readQueryLog() {
  // get previous search results from log file or create new array
  // JSON.parse will throw error if log file is empty
  try {
    const logs = JSON.parse(fs.readFileSync(logFile, "utf-8"));
    return logs;
  } catch (e) {
    return [];
  } 
}

module.exports = { logQuery, readQueryLog };