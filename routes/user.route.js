const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const jwtAuth = require("../utils/jwt.auth");

router.get("/profile", jwtAuth.currentUser, (req, res) => {
	res.json({
		status: 200,
		result: req.authData,
	});
});

router.post("/generateToken", (req, res) => {
	// Mock user, you can adjust with data from your database
	const user = {
		id: Date.now(),
		username: "saptarga",
		email: "saptarga@gmail.com",
		password: "12345678901",
	};

	// create a jwt token that is valid for 7 days
	const token = jwt.sign({ user }, "yourSecretKey", { expiresIn: "7d" });

	res.json({
		token: token,
	});
});

module.exports = router;
