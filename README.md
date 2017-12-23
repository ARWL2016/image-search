### Image Search Abstraction Layer 

This API microservice conducts an images search of the `https://imgur.com/*` domain using Google Custom Search. 
Users can enter a search term and an offset value (ie offset=10 will fetch results 11-20), and the API will respond 
with a list of image URLs and alt texts. The last 10 queries are recorded on a log file and can be returned. The API 
is CORS enabled for all origins. 

Project criteria: https://www.freecodecamp.org/challenges/image-search-abstraction-layer 

#### API Usage  
- `/api/imagesearch?search=[cats]&offset=[10]` - query imgur with search term cats and offset of 10  
- `/api/latest/imagesearch`- return last 10 queries  

#### Tech 
- Node 6.11.2    
- Express 4.16   
- Google Custom Search https://support.google.com/customsearch/answer/4513751?hl=en&ref_topic=4513742  
- Test suite: Mocha / Chai  
- Utilities: Helmet, Cors, Dotenv, Request-Promise, Winston  

#### Comments
- UI Tested on Chrome, Opera, Edge  

#### Todos 
- add GET request tests  






