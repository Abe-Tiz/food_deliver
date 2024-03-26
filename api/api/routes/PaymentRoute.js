const express = require('express');
const { postPayment } = require('../controllers/PaymentController');
const router = express.Router();

router.post('/request', postPayment);

module.exports = router;