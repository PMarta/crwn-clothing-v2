import { createAction } from "../../utils/reducer/reducer.utils";
import { CART_ACTION_TYPES } from "./cart.types";

const addCartItem = (cartItems, productToAdd) => {
    const existingCartItem = cartItems.find(
        (item) => item.id === productToAdd.id);

    if(existingCartItem) {
        return cartItems.map(item => item.id === productToAdd.id ? {...item, quantity: item.quantity + 1} : item);
    }

    return  [...cartItems, {...productToAdd, quantity:1}];
}


const removeCartItem = (cartItems, productToReduce) => {
    const existingCartItem = cartItems.find(
        (item) => item.id === productToReduce.id);
    
    if(existingCartItem.quantity === 1){
        return cartItems.filter(item => item.id!== productToReduce.id);
    }

    return cartItems.map(item => item.id === productToReduce.id ? {...item, quantity: item.quantity - 1} : item);
}

const clearItemFromCart = (cartItems, cartItemToClear) => {return cartItems.filter(item => item.id!== cartItemToClear.id)};

export const addItemToCart = (cartItems,productToAdd)  => {
    const newCartItems = addCartItem(cartItems, productToAdd);
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
 };

export const removeItemFromCart = (cartItems,productToReduce) => {
     const newCartItems = removeCartItem(cartItems, productToReduce);
     return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems);
 };

export const clearItemToCart = (cartItems,productToClear) => {
     const newCartItems = clearItemFromCart(cartItems, productToClear);
     return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems);
 };

export const setIsCartOpen = (boolean) => {
    return createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean);
}

