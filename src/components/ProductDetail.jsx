import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../store/cartSlice';

function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProduct() {
      try {
        setLoading(true);
        const res = await fetch(`https://dummyjson.com/products/${id}`);

        if (!res.ok) {
          throw new Error(`Failed to fetch product. Status: ${res.status}`);
        }

        const data = await res.json();
        if (isMounted) {
          setProduct(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unexpected error while fetching product.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [id]);

  const handleAddToCart = () => {
    if (product) dispatch(addToCart(product));
  };

  if (loading) return <p>Loading product...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!product) return <p>Product not found.</p>;

  return (
    <section className="product-detail">
      <div className="detail-image-wrapper">
        <img
          src={product.thumbnail}
          alt={product.title}
          loading="lazy"
          className="detail-image"
        />
      </div>

      <div className="detail-info">
        <h1>{product.title}</h1>
        <p className="detail-category">{product.category}</p>
        <p className="detail-description">{product.description}</p>
        <p className="detail-price">₹{product.price}</p>
        <p className="detail-rating">Rating: {product.rating}</p>

        <button className="btn primary" onClick={handleAddToCart}>
          Add to Cart
        </button>
      </div>
    </section>
  );
}

export default ProductDetail;
