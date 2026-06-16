import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import FavoritesList from './components/FavoritesList';
import Notification from './components/Notification';
import ConfirmModal from './components/ConfirmModal';
import productsData from './products.json';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [view, setView] = useState('products'); // 'products' | 'cart' | 'favorites'
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('default');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [notification, setNotification] = useState(null);
  const [confirmModal, setConfirmModal] = useState(null);

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
    const isFavorite = favoriteIds.includes(productId);
    if (isFavorite) {
      const product = productsData.find(p => p.id === productId);
      setConfirmModal({
        type: 'favorite',
        productId,
        onConfirm: () => {
          setFavoriteIds(prev => prev.filter(id => id !== productId));
          setConfirmModal(null);
          setNotification({ message: `${product.name} removed from favorites!`, type: 'info' });
        },
        onCancel: () => setConfirmModal(null)
      });
    } else {
      setFavoriteIds(prev => [...prev, productId]);
      const product = productsData.find(p => p.id === productId);
      setNotification({ message: `${product.name} added to favorites!`, type: 'success' });
    }
  };

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);
    if (existingItem) {
      setCartItems(cartItems.map(item =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ));
      setNotification({ message: `${product.name} quantity updated!`, type: 'success' });
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      setNotification({ message: `${product.name} added to cart!`, type: 'success' });
    }
  };

  const removeFromCart = (productId, showConfirm = true) => {
    if (showConfirm) {
      const item = cartItems.find(item => item.id === productId);
      setConfirmModal({
        type: 'cart',
        productId,
        onConfirm: () => {
          setCartItems(cartItems.filter(item => item.id !== productId));
          setConfirmModal(null);
          setNotification({ message: `${item.name} removed from cart!`, type: 'info' });
        },
        onCancel: () => setConfirmModal(null)
      });
    } else {
      setCartItems(cartItems.filter(item => item.id !== productId));
    }
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId, true);
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
          <div style={{ display: 'flex', alignItems: 'center', gap: '18px', padding: '12px 0' }}>
            <img
              src="https://cdn-icons-png.flaticon.com/512/263/263142.png"
              alt="Shopping Logo"
              style={{ width: '60px', height: '60px', borderRadius: '12px', boxShadow: '0 4px 12px rgba(0,0,0,0.15)' }}
            />

            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <h1
                style={{
                  marginRight: '4rem',
                  fontSize: '2rem',
                  fontWeight: 800,
                  background: 'linear-gradient(90deg, #4f46e5, #7c3aed, #ec4899)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  letterSpacing: '-1px',
                  fontFamily: "'Poppins', sans-serif",
                }}
              >
                OneStopShop
              </h1>
              <p style={{ margin: '6px 0 0 0', color: '#000000', fontSize: '0.95rem', fontWeight: 500 }}>
                Everything You Need, All in One Place
              </p>
            </div>
          </div>
          <div className="header-right">
            <input
              type="text"
              className={`search-input${view === 'products' ? '' : ' hidden'}`}
              placeholder="Search products..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
            />
            <select
              className={`sort-select${view === 'products' ? '' : ' hidden'}`}
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat === 'all' ? 'All Categories' : cat}</option>
              ))}
            </select>
            <select
              className={`sort-select${view === 'products' ? '' : ' hidden'}`}
              value={sortOption}
              onChange={e => setSortOption(e.target.value)}
            >
              <option value="default">Sort: Default</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A → Z</option>
              <option value="name-desc">Name: Z → A</option>
            </select>
            <button
  className={`nav-button favorites-button${view === 'favorites' ? ' active' : ''}`}
  onClick={() => setView(view === 'favorites' ? 'products' : 'favorites')}
>
  <img
    src="https://cdn-icons-png.flaticon.com/512/833/833472.png"
    alt="Favorites"
    style={{ width: "24px", height: "24px" }}
  />
  {favoriteIds.length > 0 && (
    <span className="cart-badge">{favoriteIds.length}</span>
  )}
</button>

<button
  className={`cart-button${view === 'cart' ? ' active' : ''}`}
  onClick={() => setView(view === 'cart' ? 'products' : 'cart')}
>
  <img
    src="https://cdn-icons-png.flaticon.com/512/3144/3144456.png"
    alt="Cart"
    style={{ width: "24px", height: "24px" }}
  />
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
            onUpdateQuantity={updateQuantity}
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

      {notification && (
        <Notification
          message={notification.message}
          type={notification.type}
          onClose={() => setNotification(null)}
        />
      )}

      {confirmModal && (
        <ConfirmModal
          title={confirmModal.type === 'favorite' ? 'Remove Favorite' : 'Remove Item'}
          message={confirmModal.type === 'favorite' ? 'Are you sure you want to remove this item from your favorites?' : 'Are you sure you want to remove this item from your cart?'}
          onConfirm={confirmModal.onConfirm}
          onCancel={confirmModal.onCancel}
          confirmText="Remove"
          cancelText="Keep"
        />
      )}
    </div>
  );
}

export default App;
