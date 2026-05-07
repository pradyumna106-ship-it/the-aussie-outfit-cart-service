import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
      index: true
    },

    totalItems: {
      type: Number,
      default: 0
    },

    totalPrice: {
      type: Number,
      default: 0
    },

    isActive: {
      type: Boolean,
      default: true
    }
  },
  {
    timestamps: true,
    collection: "carts"
  }
);

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;