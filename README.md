# Never Lost

https://never-lost.vercel.app

## API DOCUMENTATION

### Response Codes:

- 200: Success
- 400: Bad request
- 401: Unauthorized
- 404: Cannot be found
- 500: Server Error

### Animals

- GET /animals - Server sends back all animals
- POST /animals - Server creates a new animal in the database
- GET /animals/:id - Server gets animal with id=:id
- PUT /animals/:id - Server updates animal with id=:id
- DELETE /animals/:id - Server deletes animal with id=:id
- GET /animals/zip/:zip_code - Server gets animals with zip_code=:zip_code and animals with zipcode=:zip_code +- 501 (eg. zip_code 20000 will return all animals with zip codes 19500-20500)

### Organizations

- GET /organizations - Server sends back all organizations
- POST /organizations - Server creates a new organization in the database
- GET /organizations/:id - Server gets organization with id=:id
- PUT /organizations/:id - Server updates organization with id=:id
- DELETE /organizations/:id - Server deletes organization with id=:id
- GET /organizations/zip/:zip_code - Server gets organizations with zip_code=:zip_code and organizations with zipcode=:zip_code +- 501 (eg. zip_code 20000 will return all organizations with zip codes 19500-20500)

### Events

- GET /events - Server sends back all events
- POST /events - Server creates a new event in the database
- GET /events/:id - Server gets event with id=:id
- PUT /events/:id - Server updates event with id=:id
- DELETE /events/:id - Server deletes event with id=:id
- GET /events/zip/:zip_code - Server gets events with zip_code=:zip_code and events with zipcode=:zip_code +- 501 (eg. zip_code 20000 will return all events with zip codes 19500-20500)

### Topics

- GET /topics - Server sends back all topics
- POST /topics - Server creates a new topic in the database
- GET /topics/:id - Server gets topic with id=:id
- PUT /topics/:id - Server updates topic with id=:id
- DELETE /topics/:id - Server deletes topic with id=:id
- GET /topics/zip/:zip_code - Server gets topics with zip_code=:zip_code and topics with zipcode=:zip_code +- 501 (eg. zip_code 20000 will return all topics with zip codes 19500-20500)

### Posts

- GET /posts - Server sends back all posts
- POST /posts - Server creates a new post in the database
- GET /posts/:id - Server gets post with id=:id
- PUT /posts/:id - Server updates post with id=:id
- DELETE /posts/:id - Server deletes post with id=:id
- GET /posts/zip/:zip_code - Server gets posts with zip_code=:zip_code and posts with zipcode=:zip_code +- 501 (eg. zip_code 20000 will return all posts with zip codes 19500-20500)

## Summary

This app allows for pet and animal lovers to get together and talk about events. A user can add animals, pet organizations, events, and topics to the page. A user can then make comments on events and topics on the page. This facilitates the creation of a community in whatever area someone is in, as well as helping people find lost pets.

![Screenshot #1](/screenshots/screenshot1.png)

![Screenshot #2](/screenshots/screenshot2.png)

![Screenshot #3](/screenshots/screenshot3.png)

![Screenshot #4](/screenshots/screenshot4.png)

## Technology

### Client Side:

The main technology used in the client side is React, with a focus on react-router-dom. Context and history is used to optimize the routing.

### Server Side:

The technology used in the server side is Express.js, with a focus on Express.Router(). This facilitates the optimal routing used in this app. PostgreSQL is used to create and manage the database. Postgrator is used to make SQL migrations.
