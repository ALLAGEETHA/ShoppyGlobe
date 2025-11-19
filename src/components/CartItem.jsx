import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  removeFromCart,
  increaseQuantity,
  decreaseQuantity
} from '../store/cartSlice';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const handleRemove = () => dispatch(removeFromCart(item.id));
  const handleIncrease = () => dispatch(increaseQuantity(item.id));
  const handleDecrease = () => dispatch(decreaseQuantity(item.id));

  return (
    <article className="cart-item">
      <div className="cart-item-image-wrapper">
        <img
          src={item.thumbnail}
          alt={item.title}
          loading="lazy"
          className="cart-item-image"
        />
      </div>

      <div className="cart-item-info">
        <h2>{item.title}</h2>
        <p>₹{item.price}</p>

        <div className="cart-item-controls">
          <button className="quantity-btn" onClick={handleDecrease}>
            −
          </button>
          <span className="quantity-value">{item.quantity}</span>
          <button className="quantity-btn" onClick={handleIncrease}>
            +
          </button>

          <button className="btn link" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    </article>
  );
}

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired
  }).isRequired
};

export default CartItem;
