# Airbean API Documentation

This Airbean API was created using different "often used" technologies for example:

- Node.js

- Express

- MongoDB Atlas

- Mongoose

- JWT Token

- bcrypt

- Validator

## The application is divided by

- Routes

- Models

- Middleware

- Controllers

### Start Application

**Install dependencies using npm :**

`npm install`

### Available scripts in `package.json`

#### Start server using nodemon as filewatcher

`nodemon server.js`

#### _Start server without filewatcher (with node command)_

`node server.js`

## Api Routes

### Routes that dont require authorization.

- GET Menu - api/beans

- POST Sign up - api/user/signup

- Body:

>      {
>      "username": "username",
>      "password": "password",
>      "passwordConfirm": "password",
>      }

- Response:

>     {
>     "status": "success",
>     "token": "token",
>     "data": {
>     "user": {
>     "username": "username",
>     "id": "objectId",
>     }
>     }
>     }

- POST Sign in - /api/sign/signin

- Body:

>     {
>     "username": "username",
>     "password": "password"
>     }

- Response:

>     {
>     "status": "success",
>     "token": "token",
>     "data": {
>     "user": {
>     "username": "username",
>     "id": "objectId",
>     }
>     }
>     }

- POST Post order as guest - api/beans/order-guest

- Body:

>     [{
>     "_id": "objectId",
>     "quantity": 2
>     },
>     {
>     "_id": "ObjectId",
>     "quantity": 1
>     }
>     ]

- Response:

>     {
>     "status": "success",
>     "data": {
>     "order": {
>     "id": "ObjectId",
>     "finishedAt": "createdAt + random x minutes",
>     "eta": Number,
>     "totalPrice": totalProductPrice + totalProductPrice,
>     "createdAt": "Date",
>     "products": [
>     {
>     "_id": "ObjectId",
>     "title": "title",
>     "price": xx,
>     "quantity": 2,
>     "totalProductPrice": price x quantity
>     },
>     {
>     "_id": "ObjectId",
>     "title": "title",
>     "price": xx,
>     "quantity": 1,
>     "totalProductPrice": price x quantity
>     }
>     ],
>     }
>     }
>     }

- GET Get orderstatus - /api/beans/order/status/:id

- Response

>     {
>     "status": "success",
>     "data": {
>     "updatedEta": Number
>     }
>     }

## Signed In Routes

#### Include Header Authorization Bearer Token in following routes!

##### Token is validated in each request.

- POST Order as user - /api/beans/order

- Body

> `Same as guest order requst.`

- Response

> `Same as guest order requst.`

- GET Order history - /api/beans/order/history

- Response

>     {
>     "status": "success",
>     "results": 1,
>     "data": {
>     "allDocs": [
>     {
>     "id": "ObjectId",
>     "user": "ObjectId",
>     "finishedAt": "Date",
>     "eta": Number,
>     "totalPrice": totalProductPrice + totalProductPrice,
>     "createdAt": "Date",
>     "products": [
>     {
>     "_id": "ObjectId",
>     "title": "title",
>     "price": price,
>     "quantity": 2,
>     "totalProductPrice": price x quantity
>     },
>     {
>     "_id": "ObjectId",
>     "title": "title",
>     "price": 3price9,
>     "quantity": 1,
>     "totalProductPrice": price x quantity
>     }
>     ],
>     },
>     ]
>     }
>     }

- GET Active orders - /api/beans/order/active-orders

- Response

>     {
>     "status": "success",
>     "results": 1,
>     "data": {
>     "updatedDocs": [
>     {
>     "id": "ObjectId",
>     "user": "ObjectId",
>     "finishedAt": "Date",
>     "eta": updatedEta,
>     "totalPrice": totalProductPrice + totalProductPrice,
>     "products": [
>     {
>     "_id": "ObjectId",
>     "title": "Title",
>     "price": Number,
>     "quantity": Number,
>     "totalProductPrice": price x qauntity
>     },
>     {
>     "id": "ObjectId",
>     "title": "Title",
>     "price": Number,
>     "quantity": Number,
>     "totalProductPrice": price x quantity
>     }
>     ],
>     "createdAt": "Date",
>     },
>     ]
>     }
>     }
