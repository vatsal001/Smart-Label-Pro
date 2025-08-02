const Order = require("../models/Order");
const Label = require("../models/Label");
const sendEmail = require("../utils/sendEmail");
const whatsapp = require("../utils/whatsappNotification");

exports.createOrder = async (req, res) => {
  const { labelData, artworkFile, price } = req.body;
  const label = await Label.create(labelData);
  const order = await Order.create({
    user: req.user.id,
    label: label._id,
    price,
    artworkFile,
  });
  sendEmail(req.user.email, "Order Confirmed", `Order ID: ${order._id}`);
  whatsapp(`New Order: ${order._id}`);
  res.status(201).json(order);
};

exports.getUserOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).populate("label");
  res.json(orders);
};
