// C:\Users\hamsa\product-explorer\src\components\ProductGrid.tsx
'use client';

import { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import SearchBar from './SearchBar';
import CategoryFilter from './CategoryFilter';
import LoadingSpinner from './LoadingSpinner';
import { fetchProducts, fetchCategories } from '@/lib/api';
import { Product, ProductCategory } from '@/types/product';
import { isFavorite } from '@/lib/favorites';

// Validation function
const isValidProduct = (item: any): item is Product => {
  return (
    typeof item?.id === 'number' &&
    typeof item?.title === 'string' &&
    typeof item?.price === 'number' &&
    typeof item?.description === 'string' &&
    typeof item?.category === 'string' &&
    typeof item?.image === 'string'
  );
};

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        console.log('Loading products from API...');
        
        const productsData = await fetchProducts();
        console.log('Products loaded:', productsData.length);
        
        const categoriesData = await fetchCategories();
        
        // Filter only valid products
        const validProducts = productsData.filter(isValidProduct);
        console.log('Valid products:', validProducts.length);
        
        setProducts(validProducts);
        setFilteredProducts(validProducts);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load products. Showing demo data instead.');
        
        // Use demo data as fallback
        const demoProducts: Product[] = getDemoProducts();
        setProducts(demoProducts);
        setFilteredProducts(demoProducts);
        setCategories(['electronics', "men's clothing", "women's clothing", 'jewelery']);
      } finally {
        setLoading(false);
      }
    }
    
    loadData();
  }, []);

  useEffect(() => {
    let filtered = products;

    // Apply search filter
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product =>
        product.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply favorites filter
    if (showFavoritesOnly) {
      filtered = filtered.filter(product => isFavorite(product.id));
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, showFavoritesOnly]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error && products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 max-w-md mx-auto">
          <div className="text-red-600 font-semibold mb-2">Error Loading Products</div>
          <p className="text-red-500 text-sm">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-8">
      {/* Filter Bar */}
      <div className="mb-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Discover Products</h2>
            <p className="text-gray-600">
              Showing {filteredProducts.length} of {products.length} products
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4">
            <div className="flex items-center">
              <input 
                type="checkbox" 
                id="favorites" 
                checked={showFavoritesOnly}
                onChange={(e) => setShowFavoritesOnly(e.target.checked)}
                className="w-4 h-4 text-blue-600 rounded" 
              />
              <label htmlFor="favorites" className="ml-2 text-gray-700">Favorites Only</label>
            </div>
            
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />
          </div>
        </div>
        
        <CategoryFilter 
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <div className="bg-gray-50 rounded-xl p-8 max-w-md mx-auto">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-500 font-medium">No products found</p>
            <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filters</p>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      )}
    </div>
  );
}

// Demo products function
function getDemoProducts(): Product[] {
  return [
    {
      id: 1,
      title: "Fjallraven - Foldsack No. 1 Backpack",
      price: 109.95,
      description: "Your perfect pack for everyday use and walks in the forest.",
      category: "men's clothing",
      image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&h=300&fit=crop",
      rating: { rate: 3.9, count: 120 }
    },
    {
      id: 2,
      title: "Mens Casual Premium Slim Fit T-Shirts",
      price: 22.3,
      description: "Slim-fitting style, contrast raglan long sleeve.",
      category: "men's clothing",
      image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop",
      rating: { rate: 4.1, count: 259 }
    },
    {
      id: 3,
      title: "Mens Cotton Jacket",
      price: 55.99,
      description: "Great outerwear jackets for Spring/Autumn/Winter.",
      category: "men's clothing",
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
      rating: { rate: 4.7, count: 500 }
    },
    {
      id: 4,
      title: "Gold Bracelet",
      price: 695,
      description: "From our Legends Collection, inspired by mythical water dragon.",
      category: "jewelery",
      image: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop",
      rating: { rate: 4.6, count: 400 }
    },
    {
      id: 5,
      title: "Smartphone",
      price: 999.99,
      description: "Latest smartphone with advanced features and camera.",
      category: "electronics",
      image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
      rating: { rate: 4.8, count: 890 }
    },
  ];
}