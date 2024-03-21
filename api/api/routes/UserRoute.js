const express = require('express');
const { getAllUser, createUser, deleteUser, getAdmin, makeAdmin } = require('../controllers/UserController');
const verifyToken = require('../middlware/verifyToken');
const verifyAdmin = require('../middlware/verifyAdmin');
const router = express.Router();

router.get("/",  getAllUser);
router.post('/create', createUser);
router.delete("/delete/:id", deleteUser);
router.get("/admin/:email", getAdmin);
router.put("/admin/:id", makeAdmin);

module.exports = router;