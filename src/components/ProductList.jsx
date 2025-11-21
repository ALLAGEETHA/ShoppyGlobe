// ProductList component: displays products with search, category filters, and promotions
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectSearchTerm,
  setSearchTerm,
  selectSelectedCategory,
  setSelectedCategory
} from '../store/productsSlice';
import useProducts from '../hooks/useProducts';
import ProductItem from './ProductItem';
import Promotions from './Promotions';

function ProductList() {
  const dispatch = useDispatch();
  const searchTerm = useSelector(selectSearchTerm);
  const selectedCategory = useSelector(selectSelectedCategory);
  const { products, loading, error } = useProducts();
  const [filters, setFilters] = useState({
    priceRange: 'all',
    rating: 'all'
  });

  const handleSearchChange = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  const handleCategorySelect = (category) => {
    dispatch(setSelectedCategory(category));
  };

  const handleFilterChange = (name, value) => {
    setFilters((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleResetFilters = () => {
    setFilters({
      priceRange: 'all',
      rating: 'all'
    });
  };

  const categoryMap = {
    cosmetics: ['skincare', 'fragrances'],
    furniture: ['furniture', 'home-decoration'],
    vegetables: ['groceries'],
    electronics: ['smartphones', 'laptops']
  };

  const categoryTabs = [
    { id: 'all', label: 'All Products' },
    { id: 'cosmetics', label: 'Cosmetics' },
    { id: 'furniture', label: 'Furniture' },
    { id: 'vegetables', label: 'Vegetables' },
    { id: 'electronics', label: 'Electronics' }
  ];

  const quickLinks = [
    'Eggs, Meat & Fish',
    'NeuPass',
    'Ayurveda',
    'Buy More Save More',
    'Deals of the Week',
    'Combo Store'
  ];

  const matchesPrice = (product) => {
    const price = product.price;
    switch (filters.priceRange) {
      case 'low':
        return price < 500;
      case 'mid':
        return price >= 500 && price <= 1000;
      case 'high':
        return price > 1000;
      default:
        return true;
    }
  };

  const matchesRating = (product) => {
    if (filters.rating === 'all') return true;
    return product.rating >= Number(filters.rating);
  };

  // Filter products by category, search term, price and rating
  const filteredProducts = products.filter((product) => {
    if (selectedCategory !== 'all') {
      const categoryMatches = categoryMap[selectedCategory] || [];
      if (!categoryMatches.includes(product.category)) {
        return false;
      }
    }

    if (searchTerm.trim()) {
      const matchesSearch = product.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase().trim());
      if (!matchesSearch) {
        return false;
      }
    }

    if (!matchesPrice(product) || !matchesRating(product)) {
      return false;
    }

    return true;
  });

  const getCategoryTitle = () => {
    switch (selectedCategory) {
      case 'cosmetics':
        return 'Cosmetics';
      case 'furniture':
        return 'Furniture';
      case 'vegetables':
        return 'Vegetables';
      case 'electronics':
        return 'Electronics';
      default:
        return 'All Products';
    }
  };

  return (
    <section className="product-list">
      <div className="hero-banner">
        <div className="hero-content">
          <p className="hero-label">Daily Essentials</p>
          <h1>Fresh picks delivered faster</h1>
          <p>
            Browse cosmetics, furniture, veggies and more curated from live
            inventory at DummyJSON. Add items to your cart and check out in a
            snap.
          </p>
          <div className="hero-actions">
            <button className="btn primary" onClick={() => handleCategorySelect('vegetables')}>
              Shop Vegetables
            </button>
            <button className="btn secondary" onClick={() => handleCategorySelect('cosmetics')}>
              Explore Cosmetics
            </button>
          </div>
        </div>
      </div>

      <div className="quick-links">
        {quickLinks.map((link) => (
          <button key={link} className="quick-link">
            {link}
          </button>
        ))}
      </div>

      <div className="category-toolbar">
        {categoryTabs.map((tab) => (
          <button
            key={tab.id}
            className={`category-pill ${selectedCategory === tab.id ? 'active' : ''}`}
            onClick={() => handleCategorySelect(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="filter-bar">
        <input
          type="text"
          className="search-input"
          placeholder="Search for products..."
          value={searchTerm}
          onChange={handleSearchChange}
        />

        <div className="filter-selects">
          <label className="select-group">
            <span>Price</span>
            <select
              value={filters.priceRange}
              onChange={(e) => handleFilterChange('priceRange', e.target.value)}
            >
              <option value="all">Any price</option>
              <option value="low">Under ₹500</option>
              <option value="mid">₹500 - ₹1,000</option>
              <option value="high">Above ₹1,000</option>
            </select>
          </label>

          <label className="select-group">
            <span>Rating</span>
            <select
              value={filters.rating}
              onChange={(e) => handleFilterChange('rating', e.target.value)}
            >
              <option value="all">Any rating</option>
              <option value="4">4 ★ & up</option>
              <option value="3">3 ★ & up</option>
            </select>
          </label>

          <button className="btn link" onClick={handleResetFilters}>
            Clear filters
          </button>
        </div>
      </div>

      <Promotions />

      {loading && <p>Loading products...</p>}
      {error && <p className="error">Error: {error}</p>}

      {!loading && !error && (
        <div className="products-grid">
          {filteredProducts.map((product) => (
            <ProductItem key={product.id} product={product} />
          ))}

          {filteredProducts.length === 0 && (
            <p>No products found. Try another search, category, or filter.</p>
          )}
        </div>
      )}
    </section>
  );
}

export default ProductList;
