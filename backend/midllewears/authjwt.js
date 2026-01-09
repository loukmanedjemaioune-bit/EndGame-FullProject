const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  if (!authHeader) {
    return res.status(401).json({ message: "No token Provided" });
  }
  const token = authHeader.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token here" });
  }
  jwt.verify(
    token,
    process.env.JWT_SECRET || "ENDGAME_SECRET",
    (err, decode) => {
      if (err) return res.status(403).json({ message: "Unautorized" });

      req.userId = decode.id;
      next();
    }
  );
};
module.exports = verifyToken;
