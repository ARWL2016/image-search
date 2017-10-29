const expect = require('chai').expect;
const { readQueryLog, logQuery } = require('../utils/query-logger');

describe('readQueryLog method', () => {
  const queries = readQueryLog(); 

  it('should return an array of length <= 10', () => {
    expect(queries).to.be.an('array');
    expect(queries).to.have.length.below(11);
  });

  it('should array objects to have properties timestamp, offset and search', () => {
    expect(queries[0]).to.have.property('timestamp');
    expect(queries[0]).to.have.property('offset');
    expect(queries[0]).to.have.property('search');
  });
});

describe('logQuery method', () => {
  
 logQuery('fish', '1');
 const postQueryLogs = readQueryLog();
 
 it('should change the values inside the query-log.js file', () => {
   const last = postQueryLogs.length -1;
   expect(postQueryLogs[last].search).to.equal('fish');
 });

});