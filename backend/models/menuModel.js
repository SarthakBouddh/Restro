const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  bgColor: { type: String, required: true },
  icon: { type: String, required: true },
  items: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }]
});

module.exports = mongoose.model("Menu", menuSchema);
