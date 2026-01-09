const express = require("express");
const router = express.Router();
const wordController = require("../controllers/word.controller");

router.get("/", wordController.getAllWords);
router.get("/Categories", wordController.getAllCategories);

router.get("/:Category", wordController.getWordByCategory);

module.exports = router;
