import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import '../styles/navbar.css';

// Site-wide navigation bar: branding, shop/cart links, and auth-dependent options
const Navbar = () => {
  // Auth state and logout function from context
  const { user, logout } = useContext(AuthContext);
  // Cart items pulled from Redux store (used to show item count badge)
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  // Log the user out and redirect to the login page
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar">
      {/* Brand/logo, links back to home */}
      <div className="navbar-brand">
        <Link to="/">
          <img src="/ShopNestLogo.png" alt="ShopNest" style={{ height: '36px', width: '36px', borderRadius: '8px', objectFit: 'cover', filter: 'drop-shadow(0 2px 8px rgba(249, 115, 22, 0.35))' }} />
          ShopNest
        </Link>
      </div>
      <ul className="navbar-links">
        {/* Always-visible links */}
        <li><Link to="/shop">Shop</Link></li>
        {/* Cart link shows live item count from Redux state */}
        <li><Link to="/cart">Cart ({cartItems.length})</Link></li>

        {/* Conditional rendering based on auth state */}
        {user ? (
          // Shown when a user is logged in
          <>
            <li><Link to="/profile">Hi, {user.name}</Link></li>
            {/* Admin link only shown to users with the admin role */}
            {user.role === 'admin' && <li><Link to="/admin">Admin</Link></li>}
            <li><button onClick={handleLogout} className="btn-logout">Logout</button></li>
          </>
        ) : (
          // Shown when no user is logged in
          <li><Link to="/login">Login</Link></li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
