const mongoose = require("mongoose");
const cartSchema = mongoose.Schema({
  menuItemId: String,
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
  },
  recipe: String,
  image: String,
  price: Number,
  quantity: Number,
  email: {
    type: String,
    trim: true,
    required: true,
  },
});
const Cart = mongoose.model("Cart", cartSchema);
module.exports = Cart;
