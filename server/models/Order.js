const mongoose = require('mongoose');
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  label: { type: mongoose.Schema.Types.ObjectId, ref: 'Label' },
  price: Number,
  status: { type: String, default: 'Pending' },
  artworkFile: String,
}, { timestamps: true });
module.exports = mongoose.model('Order', orderSchema);