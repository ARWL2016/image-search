/**
 * @class Response - defines properties extracted from search result and sent back to user as JSON
 */

module.exports = class Response {
  constructor(imageUrl, altText, context) {
    this.imageUrl = imageUrl;
    this.altText = altText;
    this.context = context;
  } 
}

