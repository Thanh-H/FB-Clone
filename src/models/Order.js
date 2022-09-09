import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    arrProduct: { type: Array, required: true },
    nameCustomer: { type: String, require: true },
    emailCustomer: { type: String },
    phoneNumber: { type: String, require: true },
    note: { type: String },
    address: { type: String, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true },
    status: { type: String, default: "pending" },
  },
  { timestamps: true },

);

module.exports = mongoose.model("Order", OrderSchema);
