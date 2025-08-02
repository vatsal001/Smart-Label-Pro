const router = require("express").Router();
const {
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/admin.controller");
const { protect, isAdmin } = require("../middleware/authMiddleware");
router.get("/orders", protect, isAdmin, getAllOrders);
router.put("/orders/:id/status", protect, isAdmin, updateOrderStatus);
module.exports = router;
