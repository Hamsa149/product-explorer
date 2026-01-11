// C:\Users\hamsa\product-explorer\src\lib\api.ts
import { Product } from '@/types/product';

// Unsplash images by category
const CATEGORY_IMAGES: Record<string, string[]> = {
  "men's clothing": [
    'https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop',
  ],
  "women's clothing": [
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&h=300&fit=crop',
  ],
  "jewelery": [
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=400&h=300&fit=crop',
  ],
  "electronics": [
    'https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop',
    'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=300&fit=crop',
  ],
};

const API_BASE = 'https://fakestoreapi.com';

export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE}/products`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }
    
    const data: any[] = await response.json();
    
    // Transform data to ensure it matches Product interface
    const products: Product[] = data.map((item, index) => {
      // Get appropriate image based on category
      const categoryImages = CATEGORY_IMAGES[item.category] || CATEGORY_IMAGES["men's clothing"];
      const imageIndex = index % categoryImages.length;
      
      return {
        id: item.id || index + 1,
        title: item.title || 'Untitled Product',
        price: typeof item.price === 'number' ? item.price : 0,
        description: item.description || 'No description available',
        category: item.category || 'uncategorized',
        image: categoryImages[imageIndex],
        rating: item.rating ? {
          rate: typeof item.rating.rate === 'number' ? item.rating.rate : 0,
          count: typeof item.rating.count === 'number' ? item.rating.count : 0
        } : undefined
      };
    });
    
    console.log(`API returned ${products.length} products`);
    return products;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

export async function fetchProduct(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE}/products/${id}`);
    
    if (!response.ok) {
      throw new Error(`Failed to fetch product ${id}`);
    }
    
    const item = await response.json();
    
    // Transform to match Product interface
    const categoryImages = CATEGORY_IMAGES[item.category] || CATEGORY_IMAGES["men's clothing"];
    const imageIndex = id % categoryImages.length;
    
    return {
      id: item.id || id,
      title: item.title || 'Untitled Product',
      price: typeof item.price === 'number' ? item.price : 0,
      description: item.description || 'No description available',
      category: item.category || 'uncategorized',
      image: categoryImages[imageIndex],
      rating: item.rating ? {
        rate: typeof item.rating.rate === 'number' ? item.rating.rate : 0,
        count: typeof item.rating.count === 'number' ? item.rating.count : 0
      } : undefined
    };
  } catch (error) {
    console.error(`Error fetching product ${id}:`, error);
    throw error;
  }
}

export async function fetchCategories(): Promise<string[]> {
  try {
    const response = await fetch(`${API_BASE}/products/categories`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch categories');
    }
    
    return response.json();
  } catch (error) {
    console.error('Error fetching categories:', error);
    return ["men's clothing", "women's clothing", "jewelery", "electronics"];
  }
}