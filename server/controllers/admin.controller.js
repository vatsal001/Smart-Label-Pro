const Order = require('../models/Order');
exports.getAllOrders = async (req, res) => {
  const orders = await Order.find().populate('label user');
  res.json(orders);
};
exports.updateOrderStatus = async (req, res) => {
  const order = await Order.findById(req.params.id);
  order.status = req.body.status;
  await order.save();
  res.json(order);
};