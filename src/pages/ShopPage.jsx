import React, { useState, useMemo, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import ProductGrid from '../components/ProductGrid';

function ShopPage({ cart, addToCart, products }) {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(location.state?.category || 'todos');
  const [priceRange, setPriceRange] = useState(3000);

  useEffect(() => {
    if (location.state?.category) {
      setSelectedCategory(location.state.category);
    }
  }, [location.state?.category]);

  // Filter products based on search, category, and price
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      // Category filter
      const matchesCategory = selectedCategory === 'todos' || product.category === selectedCategory;
      
      // Search filter
      const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            product.description.toLowerCase().includes(searchQuery.toLowerCase());
      
      // Price filter
      const matchesPrice = product.price <= priceRange;

      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [searchQuery, selectedCategory, priceRange, products]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <main className="main-content">
      <Sidebar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
      />
      
      <ProductGrid 
        products={filteredProducts} 
        onAddToCart={handleAddToCart}
      />
    </main>
  );
}

export default ShopPage;
