const express = require("express");
const Menu = require("../models/Menu");
const { getAllMenu, postMenuItem, deleteMenuItem, singleMenuItem, updateMenuItem } = require("../controllers/MenuController");
const router = express.Router();

router.get("/", getAllMenu);
// post a menu item
router.post('/add-menu',  postMenuItem);

// delete a menu item
router.delete('/delete/:id', deleteMenuItem);

// get single menu item
router.get('/single-item:id',  singleMenuItem);

// update single menu item
router.put('/update/:id',  updateMenuItem)
 
module.exports = router;
