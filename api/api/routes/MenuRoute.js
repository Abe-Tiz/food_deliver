const express = require("express");
const Menu = require("../models/Menu");
const { getAllMenu } = require("../controllers/MenuController");
const router = express.Router();

router.get("/", getAllMenu);

module.exports = router;
