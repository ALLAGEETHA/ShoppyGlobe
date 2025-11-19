import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';
import {
  selectCartItems,
  selectCartTotalPrice,
  clearCart
} from '../store/cartSlice';

function Cart() {
  const dispatch = useDispatch();
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);

  const handleClearCart = () => {
    if (items.length && window.confirm('Clear all items from the cart?')) {
      dispatch(clearCart());
    }
  };

  if (items.length === 0) {
    return (
      <section className="cart">
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>
        <Link to="/" className="btn">
          Go Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="cart">
      <h1>Your Cart</h1>

      <div className="cart-items">
        {items.map((item) => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="cart-summary">
        <p>
          <strong>Total: </strong>₹{totalPrice.toFixed(2)}
        </p>
        <div className="cart-actions">
          <button className="btn secondary" onClick={handleClearCart}>
            Clear Cart
          </button>
          <Link to="/checkout" className="btn primary">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Cart;
