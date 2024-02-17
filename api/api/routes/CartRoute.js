const express = require('express');
const {
    getCartsByEmail,
    addCart,
    deleteCart,
    updateCart,
    getSingleCart
} = require('../controllers/CartController');

const router = express.Router();

router.get("/", getCartsByEmail);
router.get("/singleCart/:id", getSingleCart);
router.post("/add", addCart);
router.delete("/delete/:id", deleteCart);
router.put("/update/:id", updateCart);


module.exports = router;