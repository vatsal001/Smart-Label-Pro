const router = require('express').Router();
const { createOrder, getUserOrders } = require('../controllers/order.controller');
const { protect } = require('../middleware/authMiddleware');
router.post('/', protect, createOrder);
router.get('/my-orders', protect, getUserOrders);
module.exports = router;