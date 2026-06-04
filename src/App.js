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
  const [sortOption, setSortOption] = useState('default');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [favoriteIds, setFavoriteIds] = useState([]);

  const products = productsData.filter(p =>
    (p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase())) &&
    (categoryFilter === 'all' || p.category === categoryFilter)
  );

  const categories = ['all', ...Array.from(new Set(productsData.map(p => p.category)))];

  const sortedProducts = (() => {
    const list = [...products];
    switch (sortOption) {
      case 'price-asc':
        return list.sort((a, b) => a.price - b.price);
      case 'price-desc':
        return list.sort((a, b) => b.price - a.price);
      case 'name-asc':
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return list.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return list;
    }
  })();

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
            {view === 'products' && (
              <select
                className="sort-select"
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value)}
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
                ))}
              </select>
            )}
            {view === 'products' && (
              <select
                className="sort-select"
                value={sortOption}
                onChange={e => setSortOption(e.target.value)}
              >
                <option value="default">Sort: Default</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="name-asc">Name: A → Z</option>
                <option value="name-desc">Name: Z → A</option>
              </select>
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
            products={sortedProducts}
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
