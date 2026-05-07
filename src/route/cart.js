import express from "express";

import {
    getCartByUserId,
    addToCart,
    updateCartItem,
    removeCartItem,
    clearCart
} from "../controller/cart.js";

const router = express.Router();


// GET CART
router.get("/user/:userId", getCartByUserId);


// ADD TO CART
router.post("/", addToCart);


// UPDATE CART ITEM
router.put("/cartItem/:itemId", updateCartItem);


// REMOVE CART ITEM
router.delete("/cartItem/:itemId", removeCartItem);


// CLEAR CART
router.delete("/user/:userId", clearCart);


export default router;