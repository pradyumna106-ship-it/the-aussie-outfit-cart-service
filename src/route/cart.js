import express from "express";

import {
    getCartByUserId,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
} from "../controller/cart.js";

const router = express.Router();

// ADD TO CART



// UPDATE CART ITEM
router.route("/cartItem/:itemId")
    .put(updateCartItem)
    .delete(removeCartItem);


// CLEAR CART
router.route("/user/:userId")
    .get(getCartByUserId)
    .delete(clearCart);
router.post("/create", addToCart);

export default router;