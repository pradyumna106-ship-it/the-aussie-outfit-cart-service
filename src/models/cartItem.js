import mongoose from "mongoose";

const cartItemSchema = new mongoose.Schema(
  {
    cartId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Cart",
      index: true
    },

    productId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "Product"
    },

    productName: {
      type: String,
      required: true,
      trim: true
    },

    productImage: {
      type: String
    },

    price: {
      type: Number,
      required: true,
      min: 0
    },

    quantity: {
      type: Number,
      required: true,
      min: 1,
      default: 1
    },

    subtotal: {
      type: Number,
      required: true,
      min: 0
    },

    isSelected: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    collection:"cartItems"
  }
);

const CartItem = mongoose.model("CartItem", cartItemSchema);
export default CartItem