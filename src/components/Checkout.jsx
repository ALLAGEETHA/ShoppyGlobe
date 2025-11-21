// Checkout component: form for user details and order summary with cart clearing
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import {
  selectCartItems,
  selectCartTotalPrice,
  clearCart
} from '../store/cartSlice';

function Checkout() {
  const items = useSelector(selectCartItems);
  const totalPrice = useSelector(selectCartTotalPrice);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);

  if (items.length === 0) {
    return (
      <section className="checkout">
        <h1>Checkout</h1>
        <p>Your cart is empty. Add products before checking out.</p>
        <Link to="/" className="btn">
          Back to Home
        </Link>
      </section>
    );
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      dispatch(clearCart());
      alert('Order placed');
      navigate('/');
    }, 800);
  };

  return (
    <section className="checkout">
      <h1>Checkout</h1>

      <div className="checkout-grid">
        <form className="checkout-form" onSubmit={handleSubmit}>
          <h2>Shipping Details</h2>

          <label>
            Full Name
            <input type="text" name="name" required />
          </label>

          <label>
            Email
            <input type="email" name="email" required />
          </label>

          <label>
            Address
            <input type="text" name="address" required />
          </label>

          <label>
            City
            <input type="text" name="city" required />
          </label>

          <label>
            Postal Code
            <input type="text" name="postalCode" required />
          </label>

          <button className="btn primary" type="submit" disabled={submitting}>
            {submitting ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <span>
                  {item.title} × {item.quantity}
                </span>
                <span>₹{(item.price * item.quantity).toFixed(2)}</span>
              </li>
            ))}
          </ul>
          <p className="checkout-total">
            <strong>Total: ₹{totalPrice.toFixed(2)}</strong>
          </p>
        </aside>
      </div>
    </section>
  );
}

export default Checkout;
