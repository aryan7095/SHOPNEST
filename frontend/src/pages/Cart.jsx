import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeFromCart, addToCart } from '../redux/cartSlice';
import '../styles/cart.css';

// Shopping cart page: lists items, allows quantity changes/removal, shows total, and links to checkout
const Cart = () => {
  // Cart items from Redux store
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Removes an item from the cart entirely
  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  // Updates an item's quantity by re-adding it with the new qty
  // (only applies if the new quantity is greater than 0, preventing it from going to 0 or negative here)
  const handleUpdateQty = (item, qty) => {
    if (qty > 0) {
      dispatch(addToCart({ ...item, qty }));
    }
  };

  // Computed total price across all items (price * quantity, summed)
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {/* Empty cart state vs. populated cart layout */}
      {cartItems.length === 0 ? (
        <p>Your cart is empty. <Link to="/shop">Go Shopping</Link></p>
      ) : (
        <div className="cart-layout">
          {/* List of cart items with image, price, quantity controls, and remove button */}
          <div className="cart-items">
            {cartItems.map((item) => (
              <div key={item.productId} className="cart-item">
                <img src={item.imageUrl} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p>₹{item.price}</p>
                  <div className="qty-controls">
                    <button onClick={() => handleUpdateQty(item, item.qty - 1)}>-</button>
                    <span>{item.qty}</span>
                    <button onClick={() => handleUpdateQty(item, item.qty + 1)}>+</button>
                  </div>
                  <button onClick={() => handleRemove(item.productId)} className="btn-remove">Remove</button>
                </div>
              </div>
            ))}
          </div>
          {/* Order summary: total price and checkout button */}
          <div className="cart-summary">
            <h3>Total: ₹{totalPrice.toFixed(2)}</h3>
            <button onClick={() => navigate('/checkout')} className="btn btn-checkout">Proceed to Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
