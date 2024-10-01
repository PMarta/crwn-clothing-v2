import { ShoppingIcon, CartIconContainer, ItemCount } from './cart-icon.style';
import { selectCartCount, selectIsCartOpen } from '../../store/cart/cart.selector';
import { useDispatch, useSelector } from 'react-redux';
import { setIsCartOpen } from '../../store/cart/cart.action';

const CartIcon = () => {
  const dispatch = useDispatch();
  const isCartOpen = useSelector(selectIsCartOpen);
  const cartCount = useSelector(selectCartCount);
  debugger


  const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));


  return (
    <CartIconContainer onClick={toggleIsCartOpen}>
        <ShoppingIcon />
        <ItemCount>{cartCount}</ItemCount>
    </CartIconContainer>
  )
}

export default CartIcon