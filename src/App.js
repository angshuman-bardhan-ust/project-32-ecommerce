import React, { useState } from 'react';
import './App.css';
import ProductList from './components/ProductList';
import Cart from './components/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const products = [
    {
      id: 1,
      name: 'Wireless Headphones',
      price: 79.99,
      image: 'https://picsum.photos/200',
      description: 'High-quality wireless headphones with noise cancellation'
    },
    {
      id: 2,
      name: 'Smart Watch',
      price: 199.99,
      image: 'https://picsum.photos/200',
      description: 'Feature-rich smartwatch with fitness tracking'
    },
    {
      id: 3,
      name: 'USB-C Cable',
      price: 15.99,
      image: 'https://picsum.photos/200',
      description: 'Durable and fast charging USB-C cable'
    },
    {
      id: 4,
      name: 'Phone Stand',
      price: 25.99,
      image: 'https://picsum.photos/200',
      description: 'Adjustable phone stand for any device'
    },
    {
      id: 5,
      name: 'Portable Speaker',
      price: 59.99,
      image: 'https://picsum.photos/200',
      description: 'Waterproof Bluetooth speaker with 12-hour battery'
    },
    {
      id: 6,
      name: 'Screen Protector',
      price: 12.99,
      image: 'https://picsum.photos/200',
      description: 'Tempered glass screen protector for smartphones'
    }
  ];

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
          <button
            className="cart-button"
            onClick={() => setShowCart(!showCart)}
          >
            🛒 Cart ({cartItems.length})
          </button>
        </div>
      </header>

      <main className="main-content">
        {showCart ? (
          <Cart
            items={cartItems}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />
        ) : (
          <ProductList products={products} onAddToCart={addToCart} />
        )}
      </main>

      <footer className="footer">
        <p>&copy; 2026 Product Store. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
