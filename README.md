# Node.js - RESTful API

## Description

Simple RESTful API implementation on `Node.js`, `Express.js`, `MongoDB` and `JWT Authentication`.

## Installation

For step instalation

```sh
# Clone this project from github
git clone https://github.com/saptarga/rest-api-node-js-mongo-db.git

# Install npm dependencies in project folder
npm install

# if nodemon's dependecy doesn't exist
npm install -g nodemon
```

## Configuration

```sh
# create folder logs
mkdir logs

# setup database
Create New Database on MongoDb

# setup env variable on .env
DB_CONNECTION
ENV
JWT_SECRET_KEY
```

## Run Server

You can start this service using

```sh
npm start
# alias for
nodemon app
```

## Make Requests

Generate Token

```sh
POST /users/generateToken HTTP/1.1
Host: localhost:3000
```

Get Data Profile User

```sh
GET /users/profile HTTP/1.1
Host: localhost:3000
Authorization: your_bearer_token
```

Add New Post

```sh
POST /posts HTTP/1.1
Host: localhost:3000
Content-Type: application/json
Content-Length: 126
Authorization: your_bearer_token

{
    "title": "This is title posts",
    "description": "This is description posts",
    "author": "saptarga",
    "email": "saptarga@gmail.com"
}
```

Get List All Posts

```sh
GET /posts HTTP/1.1
Host: localhost:3000
Authorization: your_bearer_token
```

for more complete requests, please visit `client.http`

## Author

Created and maintained by saptarga ([@saptarga](https://www.linkedin.com/in/saptarga))

Feel free if you have question for this project.
