export const existingCartItem = ({
    prevCartItems,
    nextCartItem
}) => {
    return prevCartItems.find(
        cartItem => cartItem.documentID === nextCartItem.documentID
    )
}

export const handleAddToCart = ({
    prevCartItems,
    nextCartItem
}) => {
    const quantityIncrement = 1

    const cartItemExists = existingCartItem({prevCartItems,nextCartItem})

    if (cartItemExists) {
        return prevCartItems.map(cartItem =>
            cartItem.documentID == nextCartItem.documentID ? { ...cartItem, quantity: cartItem.quantity + quantityIncrement } : cartItem
        )
    }

    return [
        ...prevCartItems,
        {
            ...nextCartItem,
            quantity:quantityIncrement
        }
    ]
}

//this file will handle adding items to cart, important for cases of adding duplicate items, or initial items, that way you can have multiples of an item but only represent them once graphically