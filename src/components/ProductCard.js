import React from 'react';
import './ProductCard.css';

function ProductCard({ product, onAddToCart, quantity, onUpdateQuantity, onRemove, isFavorite, onToggleFavorite }) {
  return (
    <div className="product-card">
      <div className="product-image">
        <img src={product.image} alt={product.name} />
        <button
          className={`favorite-btn${isFavorite ? ' active' : ''}`}
          onClick={() => onToggleFavorite(product.id)}
          title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          &#10084;
        </button>
      </div>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="description">{product.description}</p>
        <div className="product-footer">
          <span className="price">${product.price}</span>
          {quantity > 0 ? (
            <div className="quantity-controls">
              <button
                className="qty-btn"
                onClick={() => quantity === 1 ? onRemove(product.id) : onUpdateQuantity(product.id, quantity - 1)}
              >−</button>
              <span className="qty-display">{quantity}</span>
              <button
                className="qty-btn"
                onClick={() => onUpdateQuantity(product.id, quantity + 1)}
              >+</button>
            </div>
          ) : (
            <button
              className="add-to-cart-btn"
              onClick={() => onAddToCart(product)}
            >
              Add to Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
