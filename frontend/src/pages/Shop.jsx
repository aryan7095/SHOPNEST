import React, { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import '../styles/product.css';

// Shop page: lists all products with client-side search filtering by name
const Shop = () => {
  // Full unfiltered list of products, fetched once on mount
  const [products, setProducts] = useState([]);
  // Tracks initial fetch state for loading UI
  const [loading, setLoading] = useState(true);
  // Search input value
  const [search, setSearch] = useState('');

  // Fetch all products on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Client-side filter: shows only products whose name contains the search term
  // (case-insensitive). Recomputed on every render as `search`/`products` change.
  const filteredProducts = products.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <div className="shop-container">
      <h2>All Products</h2>
      {/* Search input, filters the grid live as the user types */}
      <input 
        type="text" 
        placeholder="Search products..." 
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="search-bar"
      />
      {/* Loading state vs. filtered product grid */}
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shop;
