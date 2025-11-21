// Header component: navigation menu, cart indicator, and theme toggle
import { NavLink } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectCartTotalQuantity } from '../store/cartSlice';
import { setSelectedCategory, selectSelectedCategory } from '../store/productsSlice';
import { useTheme } from '../context/ThemeContext';

function Header() {
  const totalItems = useSelector(selectCartTotalQuantity);
  const selectedCategory = useSelector(selectSelectedCategory);
  const dispatch = useDispatch();
  const { theme, toggleTheme } = useTheme();

  const handleCategoryClick = (category) => {
    dispatch(setSelectedCategory(category));
  };

  return (
    <header className="header">
      <div className="logo">ShoppyGlobe</div>

      <nav className="nav">
        <NavLink to="/" end onClick={() => handleCategoryClick('all')}>
          Home
        </NavLink>

        <NavLink to="/cart">Cart</NavLink>
        <NavLink to="/checkout">Checkout</NavLink>
      </nav>

      <div className="header-actions">
        <button className="theme-toggle" onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
        </button>
        <div className="cart-indicator">
          <NavLink to="/cart" className="cart-link">
            <span role="img" aria-label="cart">
              🛒
            </span>
            <span className="cart-count">{totalItems}</span>
          </NavLink>
        </div>
      </div>
    </header>
  );
}

export default Header;
