import React from 'react';
import './FavoritesList.css';

function FavoritesList({ favorites, onRemoveFavorite, onAddToCart, cartItems, onBack }) {
  if (favorites.length === 0) {
    return (
      <div className="favorites-container">
        <div className="favorites-header">
          <button className="back-button" onClick={onBack}>&#8592; Back to Shop</button>
          <h2>&#10084; Favorites</h2>
        </div>
        <div className="empty-favorites">
          <p>No favorites yet. Click the &#10084; on a product to save it here!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-container">
      <div className="favorites-header">
        <button className="back-button" onClick={onBack}>&#8592; Back to Shop</button>
        <h2>&#10084; Favorites ({favorites.length})</h2>
      </div>
      <div className="favorites-grid">
        {favorites.map(product => {
          const cartItem = cartItems.find(i => i.id === product.id);
          const quantity = cartItem ? cartItem.quantity : 0;
          return (
            <div key={product.id} className="favorite-card">
              <button
                className="remove-favorite-btn"
                onClick={() => onRemoveFavorite(product.id)}
                title="Remove from favorites"
              >&#10084;</button>
              <img src={product.image} alt={product.name} />
              <div className="favorite-info">
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="favorite-footer">
                  <span className="fav-price">${product.price}</span>
                  <button
                    className={`fav-add-btn${quantity > 0 ? ' in-cart' : ''}`}
                    onClick={() => onAddToCart(product)}
                  >
                    {quantity > 0 ? `In Cart (${quantity})` : 'Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default FavoritesList;
