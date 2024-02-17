const Cart = require("../models/Cart");

// get carts by email
const getCartsByEmail = async (req, res) => {
    try {
        const email = req.query.email;
        const query = { email: email };
       const result = await Cart.find(query).exec();
        res.status(200).json(result);
    } catch (error) {
      res.status(500).json({message: error.message});  
    }
}

// add carts to db
const addCart = async (req, res) => {
  const { menuItemId, name, recipe, image, price, quantity, email } = req.body;

  const existingProduct = await Cart.findOne({ menuItemId });

  if (existingProduct) {
    return res.status(400).json({ message: "Product already exists!" });
  } else {
        try {
            const cartItem = await Cart.create({
                menuItemId,
                name,
                recipe,
                image,
                price,
                quantity,
                email,
            });

            res.status(200).json({ cartItem, message: "Ok" });
        } catch (error) {
          res.status(500).json({ message: error.message });
        }
  }
};

// delete product from carts
const deleteCart = async (req, res) => {
    const cartId = req.params.id;
    try {
        const deleteCart = await Cart.findByIdAndDelete(cartId);
        if (!deleteCart) {
            return res.ststus(404).json({message: 'Cart not found'})
        }

        res.status(200).json({message: 'Cart successfully deleted',status:"ok"})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// update cart items 
const updateCart = async (req, res) => {
    const cartId = req.params.id;
    const { menuItemId, name, recipe, image, price, quantity, email } = req.body;

    try {
        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            {
                menuItemId,
                name,
                recipe,
                image,
                price,
                quantity,
                email,
            },
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedCart) {
            res.status(404).json({ message: "Cart not found" });
        }

        res.status(200).json(updatedCart)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// get single cart
const getSingleCart = async (req, res) => { 
    const cartId = req.params.id;
    try {
        const cartItem = await Cart.findById(cartId);
        res.status(200).json(cartItem);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}






module.exports = {
    getCartsByEmail,
    addCart,
    deleteCart,
    updateCart,
    getSingleCart,
};