# webshop-2021-autumn
Final advanced coding project

To run the REST API:
 - Navigate to the `/api` folder
 - Run `npm install` to install all the dependencies
 - `node index.js` to run it

API endpoints:
 - `GET /api/shoes`
   - Returns a list of shoes based on filter criteria
   - It is possible to pass a filter object in the body of the request that will be used to filter shoes

```json
{
   "maxPrice": 50,        // The maximum price a shoe has to have
   "minPrice": 40,        // The minimum price of a shoe
   "search": "Natural",   // Search term, searches on title and brand properties
   "pageSize": 10,         // The number of shoes that the current page of results will contain 
   "pageNumber": 5,       // The page index, numeration starts with 1
   "categories": [2, 4]   // The categories of the shoes that have to be included in the result

}
```
 - `GET /api/shoes/id`
   - Get details about a single shoe

 - `GET /api/categories`
   - Returns all categories the database has
   - They are in a flat tree structure, for example:
     -  Shoes -> Boys' Shoes -> Boots are all the shoes that are boys' boots.
     -  The dictionary would show that relationship as 1 -> 2 -> 45
     -  If we were to search for all boys' shoes, we would get all the boys's boots including boy's sandals

 - `POST /api/purchase`
   - Creates a purchase
   - The body has to contain a `shoes` array of shoe ids to purchase. For example:
  ```json
  {
    "shoes": [1, 2, 3]
  }
  ```
  
The files `shoes.js` and `categories.js` contain the website data. Feel free to explore the files to get a grip on what data is provided. For especially brave readers, you can even take a look on `index.js` and see how the REST API is implemented.