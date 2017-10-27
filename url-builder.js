const baseUrl = 'https://www.googleapis.com/customsearch/v1';

// id of custom search engine 
// see https://cse.google.com/cse/setup/basic?cx=017625680317875473405:k-0n9qcflqu for details
const cx = '017625680317875473405%3Ak-0n9qcflqu';
const searchType = 'image';

// url of site to be searched for images (https://imgur.com/*) 
const siteSearch = 'https%3A%2F%2Fimgur.com%2F*';

function buildUrl (searchTerm, offset) {
  if (!searchTerm) {
    return null;
  }
  return `${baseUrl}?q=${searchTerm}&cx=${cx}&searchType=${searchType}&siteSearch=${siteSearch}&start=${offset}&key=${process.env.API_KEY}`;
}

module.exports = { buildUrl };