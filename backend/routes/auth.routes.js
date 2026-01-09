const express = require("express");
const verifytoken = require("../midllewears/authjwt");
const gameController = require("../controllers/gameController");
const router = express.Router();
const RLRoutes = require("../controllers/auth.controller");
router.post("/register", RLRoutes.register);
router.post("/login", RLRoutes.login);
router.delete("/DeleteUser/:id", RLRoutes.Delete);
router.put("/UpdatePassword/:id", RLRoutes.UpdatePassword);
router.put("/UpdateEmail/:id", RLRoutes.UpdateEmail);

router.get("/allUsers", RLRoutes.allUsers);

console.log(gameController);

router.get("/status", verifytoken, gameController.status);
module.exports = router;
