const express = require("express");
const router = express.Router();

const ScoreController = require("../controllers/score.controller");
router.get("/:id", ScoreController.GetScore);
router.put("/update/:id", ScoreController.UpdateScore);
module.exports = router;
