import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import FavoritesList from './components/FavoritesList';
import productsData from './products.json';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [view, setView] = useState('products'); // 'products' | 'cart' | 'favorites'
  const [searchQuery, setSearchQuery] = useState('');
  const [favoriteIds, setFavoriteIds] = useState([]);

  const products = productsData.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const favoriteProducts = productsData.filter(p => favoriteIds.includes(p.id));

  const toggleFavorite = (productId) => {
    setFavoriteIds(prev =>
      prev.includes(productId) ? prev.filter(id => id !== productId) : [...prev, productId]
    );
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
    } else {
      setCartItems(cartItems.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      ));
    }
  };

  return (
    <div className="App">
      <header className="header">
        <div className="header-container">
          <h1>🛍️ Product Store</h1>
          <div className="header-right">
            {view === 'products' && (
              <input
                type="text"
                className="search-input"
                placeholder="Search products..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
              />
            )}
            <button
              className={`nav-button favorites-button${view === 'favorites' ? ' active' : ''}`}
              onClick={() => setView(view === 'favorites' ? 'products' : 'favorites')}
            >
              &#10084; Favorites
              {favoriteIds.length > 0 && (
                <span className="cart-badge">{favoriteIds.length}</span>
              )}
            </button>
            <button
              className={`cart-button${view === 'cart' ? ' active' : ''}`}
              onClick={() => setView(view === 'cart' ? 'products' : 'cart')}
            >
              🛒 Cart
              {cartItems.length > 0 && (
                <span className="cart-badge">
                  {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        {view === 'cart' && (
          <Cart
            items={cartItems}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
            onBack={() => setView('products')}
          />
        )}
        {view === 'favorites' && (
          <FavoritesList
            favorites={favoriteProducts}
            onRemoveFavorite={toggleFavorite}
            onAddToCart={addToCart}
            cartItems={cartItems}
            onBack={() => setView('products')}
          />
        )}
        {view === 'products' && (
          <ProductList
            products={products}
            onAddToCart={addToCart}
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemove={removeFromCart}
            favoriteIds={favoriteIds}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2026 Product Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
