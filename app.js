// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const jwtAuth = require("./utils/jwt.auth");
const errorHandler = require("./utils/error.handle");

// include config and connection db
require("dotenv/config");
require("./config/connection");

// defining the Express app
const app = express();

app.use(express.json());
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms")
);

// use JWT auth to secure the api
app.use(jwtAuth.jwt());

// Import User Route
const userRoute = require("./routes/user.route");
app.use("/users", userRoute);

// Import Post Routes
const postsRoute = require("./routes/posts.route");
app.use("/posts", postsRoute);

// global error handler
app.use(errorHandler);

// Listening to the server
app.listen(3000);
