// Custom hook for fetching products from API with error handling
import { useEffect, useState } from 'react';

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      try {
        setLoading(true);
        
        // Fetch products from multiple categories to get variety
        const categories = [
          'https://dummyjson.com/products', // All products
          'https://dummyjson.com/products/category/skincare', // Cosmetics
          'https://dummyjson.com/products/category/fragrances', // Cosmetics
          'https://dummyjson.com/products/category/furniture', // Furniture
          'https://dummyjson.com/products/category/home-decoration', // Furniture
          'https://dummyjson.com/products/category/groceries' // Vegetables
        ];

        const responses = await Promise.all(
          categories.map(url => fetch(url).then(res => res.json()))
        );

        // Combine all products and remove duplicates by ID
        const allProducts = [];
        const seenIds = new Set();
        
        responses.forEach(response => {
          const productsList = response.products || [];
          productsList.forEach(product => {
            if (!seenIds.has(product.id)) {
              seenIds.add(product.id);
              allProducts.push(product);
            }
          });
        });

        if (isMounted) {
          setProducts(allProducts);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unexpected error while fetching products.');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, []);

  return { products, loading, error };
}

export default useProducts;
