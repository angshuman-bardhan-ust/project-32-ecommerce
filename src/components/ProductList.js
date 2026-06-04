import React from 'react';
import ProductCard from './ProductCard';
import './ProductList.css';

function ProductList({ products, onAddToCart, cartItems, onUpdateQuantity, onRemove, favoriteIds, onToggleFavorite }) {
  return (
    <div className="product-list-container">
      <h2>Our Products</h2>
      <div className="product-grid">
        {products.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            quantity={(cartItems.find(i => i.id === product.id) || {}).quantity || 0}
            onUpdateQuantity={onUpdateQuantity}
            onRemove={onRemove}
            isFavorite={favoriteIds.includes(product.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default ProductList;
