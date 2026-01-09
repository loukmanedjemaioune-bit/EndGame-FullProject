const express = require("express");
const router = express.Router();
const LoginAdmin = require("../controllers/auth.Admin.js");
router.post("/login", LoginAdmin.AdminLog);
router.get("/allAdmins", LoginAdmin.allAdmins);

module.exports = router;
