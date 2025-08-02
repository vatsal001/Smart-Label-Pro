const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
  contact: String,
  otp: String,
  expiresAt: Date,
});
module.exports = mongoose.model("Otp", otpSchema);
