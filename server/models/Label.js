const mongoose = require("mongoose");

const labelSchema = new mongoose.Schema(
  {
    width: Number,
    height: Number,
    unit: { type: String, enum: ["mm", "in"] },
    material: String,
    quantity: Number,
    finishing: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Label", labelSchema);
