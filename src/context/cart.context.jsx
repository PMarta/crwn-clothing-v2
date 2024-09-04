import { createContext, useEffect, useReducer, useState } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

// const addCartItem = (cartItems, productToAdd) => {
//     const existingCartItem = cartItems.find(
//         (item) => item.id === productToAdd.id);

//     if(existingCartItem) {
//         return cartItems.map(item => item.id === productToAdd.id ? {...item, quantity: item.quantity + 1} : item);
//     }

//     return  [...cartItems, {...productToAdd, quantity:1}];
// }


// const removeItemFromCart = (cartItems, productToReduce) => {
//     //varianta mea
//     // return cartItems.map((item)=>{
//     //     if(item.id === productToReduce.id){
//     //         if(item.quantity > 1){
//     //             return {...item, quantity: item.quantity - 1}
//     //         }else{
//     //             return null;
//     //         }
//     //     }
//     //     return item;
//     // }).filter(item => item !== null);

//     const existingCartItem = cartItems.find(
//         (item) => item.id === productToReduce.id);
    
//     if(existingCartItem.quantity === 1){
//         return cartItems.filter(item => item.id!== productToReduce.id);
//     }

//     return cartItems.map(item => item.id === productToReduce.id ? {...item, quantity: item.quantity - 1} : item);
// }

// const clearItemFromCart = (cartItems, cartItemToClear) => {return cartItems.filter(item => item.id!== cartItemToClear.id)};
// const totalPrice = (cartItems) =>{
//     return cartItems.reduce((total, cartItem) => total + (cartItem.price * cartItem.quantity), 0);
// }

// export const CartContext = createContext({
//     isCartOpen: false,
//     setIsCartOpen: () => {},
//     cartItems: [],
//     addItemToCart: () => {},
//     removeItemFromCart: () => {},
//     clearItemFromCart: () => {},
//     totalPrice: () => {},
//     cartCount: 0,
//     total:0
// });


// export const CartProvider = ({children}) => {
//     const [isCartOpen, setIsCartOpen] = useState(false);
//     const [cartItems, setCartItems] = useState([]);
//     const [cartCount, setCartCount] = useState(0);
//     const [cartTotal, setCartTotal] = useState(0);

//     useEffect(() => {
//         const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity,0);

//         setCartCount(newCartCount);
//     }, [cartItems]);

//     useEffect(() => {
//         setCartTotal(totalPrice(cartItems));
//     }, [cartItems]);

//     const addItemToCart = (productToAdd)  => {
//         setCartItems(addCartItem(cartItems, productToAdd));
//     };

//     const removeItemToCart = (productToReduce) => {
//         setCartItems(removeItemFromCart(cartItems, productToReduce));
//     };

//     const clearItemToCart = (productToClear) => {
//         setCartItems(clearItemFromCart(cartItems, productToClear));
//     };

//     const value = {
//         isCartOpen,
//         cartTotal,
//         setIsCartOpen:()=>{},
//         addItemToCart,
//         removeItemToCart,
//         clearItemToCart,
//         cartItems,
//         cartCount};

//     return <CartContext.Provider value={value}>{children}</CartContext.Provider>
// }
//------------> using react context

//dispatch + useReducer + reducer
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

export const CART_ACTION_TYPE = {
  SET_IS_CART_OPEN: "SET_IS_CART_OPEN",
  SET_CART_ITEMS: "SET_CART_ITEMS",
};


const cartReducer = (state, action) => {
    const {type, payload} = action;
    switch(type){
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
            return {...state, isCartOpen: payload};
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return {
                ...state,
                ...payload
            }
        default:
            throw new Error(`Unhandled type ${type} in cartReducer`);
    }
}
const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    cartTotal: 0
};
export const CartProvider = ({children}) => {
    const [{cartItems, cartTotal, cartCount, isCartOpen}, dispatch] = useReducer(cartReducer, INITIAL_STATE);

    const updateCartItemsReducer = (newCartItems) => {
        const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity,0);
        const newCartTotal = totalPrice(newCartItems);

        dispatch(
          createAction(CART_ACTION_TYPE.SET_CART_ITEMS, {
            cartItems: newCartItems,
            cartTotal: newCartTotal,
            cartCount: newCartCount,
          })
        );
    }

    const addItemToCart = (productToAdd)  => {
       const newCartItems = addCartItem(cartItems, productToAdd);
       updateCartItemsReducer(newCartItems);
    };

    const removeItemToCart = (productToReduce) => {
        const newCartItems = removeItemFromCart(cartItems, productToReduce);
        updateCartItemsReducer(newCartItems);
    };

    const clearItemToCart = (productToClear) => {
        const newCartItems = clearItemFromCart(cartItems, productToClear);
        updateCartItemsReducer(newCartItems);
    };

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN, bool));
    }

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