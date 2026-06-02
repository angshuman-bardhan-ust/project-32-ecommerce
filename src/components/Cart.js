import React from 'react';
import CartItem from './CartItem';
import './Cart.css';

function Cart({ items, onRemove, onUpdateQuantity, onBack }) {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className="cart-container">
        <div className="cart-header">
          <button className="back-button" onClick={onBack}>&#8592; Back to Shop</button>
          <h2>Shopping Cart</h2>
        </div>
        <div className="empty-cart">
          <p>Your cart is empty</p>
        </div>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <div className="cart-header">
        <button className="back-button" onClick={onBack}>&#8592; Back to Shop</button>
        <h2>Shopping Cart</h2>
      </div>
      <div className="cart-items">
        {items.map(item => (
          <CartItem
            key={item.id}
            item={item}
            onRemove={onRemove}
            onUpdateQuantity={onUpdateQuantity}
          />
        ))}
      </div>
      <div className="cart-summary">
        <h3>Order Summary</h3>
        <div className="summary-row">
          <span>Subtotal:</span>
          <span>${total.toFixed(2)}</span>
        </div>
        <div className="summary-row">
          <span>Shipping:</span>
          <span>$0.00</span>
        </div>
        <div className="summary-row">
          <span>Tax:</span>
          <span>${(total * 0.1).toFixed(2)}</span>
        </div>
        <hr />
        <div className="summary-row total">
          <span>Total:</span>
          <span>${(total * 1.1).toFixed(2)}</span>
        </div>
        <button className="checkout-btn">Proceed to Checkout</button>
      </div>
    </div>
  );
}

export default Cart;
