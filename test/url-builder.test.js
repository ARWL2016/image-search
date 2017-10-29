const expect = require('chai').expect;
const { buildUrl } = require('../utils/url-builder');

describe('url-builder method', () => {
  const url = buildUrl('cat', '1'); 

  it('should return a string', () => {
    expect(url).to.be.a('string');
  });

  it('should include the googleAPIs domain string', () => {
    expect(url).to.include('https://www.googleapis.com/customsearch/v1');
  });

  it('should include the API key', () => {
    expect(url).to.include(process.env.API_KEY);
  });

  it('should return null if no search term is passed', () => {
    const nullUrl = buildUrl(undefined, '1');
    expect(nullUrl).to.be.null;
  });
  
});