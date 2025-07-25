const mongoose = require("mongoose");

const dishSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  category: {type: mongoose.Schema.Types.ObjectId, ref: "Category" , required: true }
});

module.exports = mongoose.model("Dish", dishSchema);
 