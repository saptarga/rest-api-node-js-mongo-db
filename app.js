// importing the dependencies
const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const basicAuth = require("express-basic-auth");

var staticUserAuth = basicAuth({
	users: {
		Admin: "secret1234",
	},
	challenge: false,
});

// include config and connection db
require("dotenv/config");
require("./config/connection");

// defining the Express app
const app = express();

app.use(express.json());
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms")
);

/**
 * add simple auth with basic auth
 * * please comment if you don't want to use auth
 * * if you want to Custom authorization, you can check in npm express-basic-auth documentation
 * TODO: change response with json response
 * */
app.use(
	basicAuth({
		users: {
			Admin: "secret1234",
		},
		challenge: false,
		unauthorizedResponse: (req) => {
			return "Unauthorized user";
		},
	})
);

// Import Post Routes
const postsRoute = require("./routes/posts.route");
app.use("/posts", postsRoute);

//Default Route
app.get("/", staticUserAuth, (req, res) => {
	res.send("Home");
});

// Listening to the server
app.listen(3000);
