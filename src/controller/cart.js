import Cart from "../models/cart.js";
import CartItem from "../models/cartItem.js";

// GET CART BY USER ID
export const getCartByUserId = async (req, res) => {
    try {

        const { userId } = req.params;

        const cart = await Cart.findOne({
            userId,
            isActive: true
        });

        if (!cart) {
            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        const cartItems = await CartItem.find({
            cartId: cart._id
        });

        return res.status(200).json({
            success: true,
            cart,
            cartItems
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// ADD ITEM TO CART
// ADD ITEM TO CART
export const addToCart = async (req, res) => {

    try {

        console.log("STEP 1");

        const {
            userId,
            productId,
            productName,
            productImage,
            price,
            quantity
        } = req.body;

        // VALIDATION
        if (
            !userId ||
            !productId ||
            !productName ||
            !price ||
            !quantity
        ) {

            return res.status(400).json({
                success: false,
                message: "Required fields are missing"
            });
        }

        console.log("STEP 2");

        const parsedPrice = Number(price);
        const parsedQuantity = Number(quantity);

        let cart = await Cart.findOne({
            userId,
            isActive: true
        });

        console.log("STEP 3");

        // CREATE CART IF NOT EXISTS
        if (!cart) {

            cart = await Cart.create({
                userId,
                totalItems: 0,
                totalPrice: 0,
                isActive: true
            });

            console.log("STEP 4");
        }

        let cartItem = await CartItem.findOne({
            cartId: cart._id,
            productId
        });

        console.log("STEP 5");

        // IF ITEM EXISTS
        if (cartItem) {

            cartItem.quantity += parsedQuantity;

            cartItem.subtotal =
                cartItem.quantity * cartItem.price;

            await cartItem.save();

            console.log("STEP 6");

        } else {

            cartItem = await CartItem.create({
                cartId: cart._id,
                productId,
                productName,
                productImage,
                price: parsedPrice,
                quantity: parsedQuantity,
                subtotal:
                    parsedPrice * parsedQuantity
            });

            console.log("STEP 7");
        }

        // RECALCULATE CART
        const cartItems = await CartItem.find({
            cartId: cart._id
        });

        console.log("STEP 8");

        const totalItems = cartItems.reduce(
            (acc, item) => acc + item.quantity,
            0
        );

        const totalPrice = cartItems.reduce(
            (acc, item) => acc + item.subtotal,
            0
        );

        cart.totalItems = totalItems;
        cart.totalPrice = totalPrice;

        await cart.save();

        console.log("STEP 9");

        return res.status(200).json({
            success: true,
            message: "Item added to cart successfully",
            cart,
            cartItem
        });

    } catch (error) {

        console.error(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



// UPDATE CART ITEM
export const updateCartItem = async (req, res) => {
    try {

        const { itemId } = req.params;
        const { quantity } = req.body;

        const cartItem = await CartItem.findById(itemId);

        if (!cartItem) {

            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        cartItem.quantity = quantity;
        cartItem.subtotal = cartItem.price * quantity;

        await cartItem.save();

        // UPDATE CART TOTALS
        const cartItems = await CartItem.find({
            cartId: cartItem.cartId
        });

        const totalItems = cartItems.reduce(
            (acc, item) => acc + item.quantity,
            0
        );

        const totalPrice = cartItems.reduce(
            (acc, item) => acc + item.subtotal,
            0
        );

        await Cart.findByIdAndUpdate(cartItem.cartId, {
            totalItems,
            totalPrice
        });

        return res.status(200).json({
            success: true,
            message: "Cart updated successfully",
            cartItem
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// REMOVE ITEM FROM CART
export const removeCartItem = async (req, res) => {
    try {

        const { itemId } = req.params;

        const cartItem = await CartItem.findById(itemId);

        if (!cartItem) {

            return res.status(404).json({
                success: false,
                message: "Cart item not found"
            });
        }

        const cartId = cartItem.cartId;

        await CartItem.findByIdAndDelete(itemId);

        // UPDATE CART TOTALS
        const cartItems = await CartItem.find({
            cartId
        });

        const totalItems = cartItems.reduce(
            (acc, item) => acc + item.quantity,
            0
        );

        const totalPrice = cartItems.reduce(
            (acc, item) => acc + item.subtotal,
            0
        );

        await Cart.findByIdAndUpdate(cartId, {
            totalItems,
            totalPrice
        });

        return res.status(200).json({
            success: true,
            message: "Cart item removed successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// CLEAR USER CART
export const clearCart = async (req, res) => {
    try {

        const { userId } = req.params;

        const cart = await Cart.findOne({
            userId,
            isActive: true
        });

        if (!cart) {

            return res.status(404).json({
                success: false,
                message: "Cart not found"
            });
        }

        await CartItem.deleteMany({
            cartId: cart._id
        });

        cart.totalItems = 0;
        cart.totalPrice = 0;

        await cart.save();

        return res.status(200).json({
            success: true,
            message: "Cart cleared successfully"
        });

    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message
        });
    }
};