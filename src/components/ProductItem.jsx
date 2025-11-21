// ProductItem component: displays individual product card with add to cart functionality
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

function ProductItem({ product }) {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <article className="product-card">
      <Link to={`/products/${product.id}`} className="product-image-wrapper">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="product-image"
        />
      </Link>

      <div className="product-info">
        <h2 className="product-title">
          <Link to={`/products/${product.id}`}>{product.title}</Link>
        </h2>
        <p className="product-price">₹{product.price}</p>
        <button className="btn primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </article>
  );
}

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    thumbnail: PropTypes.string.isRequired
  }).isRequired
};

export default ProductItem;
