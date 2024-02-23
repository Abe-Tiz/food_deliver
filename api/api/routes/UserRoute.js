const express = require('express');
const { getAllUser, createUser, deleteUser, getAdmin, makeAdmin } = require('../controllers/UserController');
const verifyToken = require('../middlware/verifyToken');
const verifyAdmin = require('../middlware/verifyAdmin');
const router = express.Router();

router.get("/", verifyToken, verifyAdmin, getAllUser);
router.post('/create', createUser);
router.delete("/delete/:id", verifyToken, verifyAdmin, deleteUser);
router.get("/admin/:email",verifyToken, getAdmin);
router.put("/admin/:id", verifyToken, verifyAdmin, makeAdmin);

module.exports = router;