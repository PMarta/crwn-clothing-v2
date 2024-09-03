import { createContext, useEffect, useState } from "react";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (item) => item.id === productToAdd.id);

    if(existingCartItem) {
        return cartItems.map(item => item.id === productToAdd.id ? {...item, quantity: item.quantity + 1} : item);
    }

    return  [...cartItems, {...productToAdd, quantity:1}];
}


const removeItemFromCart = (cartItems, productToReduce) => {
    //varianta mea
    // return cartItems.map((item)=>{
    //     if(item.id === productToReduce.id){
    //         if(item.quantity > 1){
    //             return {...item, quantity: item.quantity - 1}
    //         }else{
    //             return null;
    //         }
    //     }
    //     return item;
    // }).filter(item => item !== null);

    const existingCartItem = cartItems.find(
        (item) => item.id === productToReduce.id);
    
    if(existingCartItem.quantity === 1){
        return cartItems.filter(item => item.id!== productToReduce.id);
    }

    return cartItems.map(item => item.id === productToReduce.id ? {...item, quantity: item.quantity - 1} : item);
}

const clearItemFromCart = (cartItems, cartItemToClear) => {return cartItems.filter(item => item.id!== cartItemToClear.id)};
const totalPrice = (cartItems) =>{
    return cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    totalPrice: () => {},
    cartCount: 0,
    total:0
});


export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
        const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0);

        setCartCount(newCartCount);
    }, [cartItems]);

    useEffect(() => {
        setCartTotal(totalPrice(cartItems));
    }, [cartItems]);

    const addItemToCart = (productToAdd)  => {
        setCartItems(addCartItem(cartItems, productToAdd));
    };

    const removeItemToCart = (productToReduce) => {
        setCartItems(removeItemFromCart(cartItems, productToReduce));
    };

    const clearItemToCart = (productToClear) => {
        setCartItems(clearItemFromCart(cartItems, productToClear));
    };

    const value = {
        isCartOpen,
        cartTotal,
        setIsCartOpen,
        addItemToCart,
        removeItemToCart,
        clearItemToCart,
        cartItems,
        cartCount};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}