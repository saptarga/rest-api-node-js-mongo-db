const expressJwt = require("express-jwt");
const jsonwebtoken = require("jsonwebtoken");
module.exports.jwt = jwt;
module.exports.currentUser = currentUser;

function jwt() {
	const secret = "yourSecretKey";
	return expressJwt({ secret, algorithms: ["HS256"] }).unless({
		path: [
			// public routes that don't require authentication
			"/users/generateToken",
		],
	});
}

function currentUser(req, res, next) {
	//Auth header value = > send token into header
	const bearerHeader = req.headers["authorization"];
	//check if bearer is undefined
	if (typeof bearerHeader !== "undefined") {
		//split the space at the bearer
		const bearer = bearerHeader.split(" ");
		//Get token from string
		const bearerToken = bearer[1];

		//set the token
		req.token = bearerToken;

		jsonwebtoken.verify(req.token, "yourSecretKey", (err, authData) => {
			if (err) return null;
			else {
				req.authData = authData;
			}
		});

		//next middleware
		next();
	} else {
		return null;
	}
}
