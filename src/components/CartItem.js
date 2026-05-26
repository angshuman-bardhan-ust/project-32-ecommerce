import React from 'react';
import './CartItem.css';

function CartItem({ item, onRemove, onUpdateQuantity }) {
  return (
    <div className="cart-item">
      <div className="item-image">
        <img src={item.image} alt={item.name} />
      </div>
      <div className="item-details">
        <h4>{item.name}</h4>
        <p className="item-price">${item.price}</p>
      </div>
      <div className="item-quantity">
        <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}>-</button>
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value) || 1)}
          min="1"
        />
        <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}>+</button>
      </div>
      <div className="item-total">
        <span>${(item.price * item.quantity).toFixed(2)}</span>
      </div>
      <button
        className="remove-btn"
        onClick={() => onRemove(item.id)}
        title="Remove from cart"
      >
        ✕
      </button>
    </div>
  );
}

export default CartItem;