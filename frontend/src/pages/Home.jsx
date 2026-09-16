import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';

// Landing page: hero banner + a preview grid of featured products
const Home = () => {
  const [products, setProducts] = useState([]);
  // Tracks initial fetch state for loading UI
  const [loading, setLoading] = useState(true);

  // Fetch products on mount, showing only the first 4 as "featured"
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data.slice(0, 4)); // Featured products
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="home-container">
      {/* Static hero/welcome banner */}
      <div className="hero-banner">
        <h1>Welcome to ShopNest</h1>
        <p>Discover the best products at unbeatable prices.</p>
      </div>
      <h2>Featured Products</h2>
      {/* Loading state vs. product grid */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
