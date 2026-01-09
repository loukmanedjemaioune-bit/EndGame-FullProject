const jwt = require("jsonwebtoken");

const playload = { email: "louka@gmail.com", password: "felfel" };
//test
const secret = process.env.JWT_SECRET || "ENDGAME_SECRET";
const option = { expiresIn: "1h" };
const token = jwt.sign(playload, secret, option);
console.log("Your test JWT:");
console.log(token);
