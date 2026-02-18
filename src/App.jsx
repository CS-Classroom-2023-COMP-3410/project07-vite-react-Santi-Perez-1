import { useState } from 'react';
import Header from './components/Header';
import ShoppingCart from './components/ShoppingCart';

import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProfilePage from './pages/ProfilePage';
import CartPage from './pages/CartPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  const [products, setProducts] = useState([
    { id: 1, title: 'Smartphone', description: 'Latest model with advanced features', price: 699, stock: 15, imageUrl: 'https://via.placeholder.com/300x150?text=Smartphone' },
    { id: 2, title: 'Laptop', description: 'Powerful laptop for work and gaming', price: 1299, stock: 8, imageUrl: 'https://via.placeholder.com/300x150?text=Laptop' },
    { id: 3, title: 'Headphones', description: 'Noise-cancelling wireless headphones', price: 249, stock: 23, imageUrl: 'https://via.placeholder.com/300x150?text=Headphones' },
    { id: 4, title: 'Smartwatch', description: 'Fitness tracking and notifications', price: 199, stock: 12, imageUrl: 'https://via.placeholder.com/300x150?text=Smartwatch' }
  ]);

  const [sortBy, setSortBy] = useState('default');
  const [cartItems, setCartItems] = useState([]);

  const handleNavigate = (pageId) => setCurrentPage(pageId);

  const addToCart = (productId) => {
    const product = products.find((p) => p.id === productId);
    if (!product || product.stock <= 0) return;

    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, stock: p.stock - 1 } : p)));

    setCartItems((prev) => {
      const found = prev.find((item) => item.id === productId);
      if (found) {
        return prev.map((item) => (item.id === productId ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeOneFromCart = (productId) => {
    const item = cartItems.find((i) => i.id === productId);
    if (!item) return;

    setProducts((prev) => prev.map((p) => (p.id === productId ? { ...p, stock: p.stock + 1 } : p)));

    setCartItems((prev) => {
      const found = prev.find((i) => i.id === productId);
      if (!found) return prev;
      if (found.quantity > 1) {
        return prev.map((i) => (i.id === productId ? { ...i, quantity: i.quantity - 1 } : i));
      }
      return prev.filter((i) => i.id !== productId);
    });
  };

  const clearCart = () => {
    setProducts((prevProducts) =>
      prevProducts.map((p) => {
        const inCart = cartItems.find((c) => c.id === p.id);
        return inCart ? { ...p, stock: p.stock + inCart.quantity } : p;
      })
    );
    setCartItems([]);
  };

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderPage = () => {
    switch (currentPage) {
      case 'products':
        return (
          <ProductsPage
            products={products}
            sortBy={sortBy}
            setSortBy={setSortBy}
            onAddToCart={addToCart}
            cartCount={cartCount}
          />
        );
      case 'profile':
        return <ProfilePage />;
      case 'cart':
        return <CartPage cartItems={cartItems} onRemove={removeOneFromCart} onClear={clearCart} />;
      case 'home':
      default:
        return <HomePage />;
    }
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px' }}>
      <Header currentPage={currentPage} onNavigate={handleNavigate} cartCount={cartCount} />

      {cartItems.length > 0 && (
        <ShoppingCart cartItems={cartItems} onRemove={removeOneFromCart} onClear={clearCart} />
      )}

      <main>{renderPage()}</main>
    </div>
  );
}

export default App;
