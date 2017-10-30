const path = require('path');

const logFilePath = (process.env.NODE_ENV === 'test') ? 
  '../query-log-mock.js' : 
  '../query-log.js';

const logFile = path.join(__dirname, logFilePath);

module.exports = { logFile };