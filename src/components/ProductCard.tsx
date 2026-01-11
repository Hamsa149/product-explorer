// C:\Users\hamsa\product-explorer\src\components\ProductCard.tsx
'use client';

import { Star } from 'lucide-react';
import Link from 'next/link';
import FavoriteToggle from './FavoriteToggle';
import { Product } from '@/types/product';
import { useState } from 'react';

// Unsplash fallback images
const UNSPLASH_IMAGES = [
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&h=300&fit=crop',
  'https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=300&fit=crop',
];

// Use the Product type directly
interface ProductCardProps extends Product {}

export default function ProductCard({
  id,
  title,
  price,
  description,
  category,
  image,
  rating,
}: ProductCardProps) {
  const [imgSrc, setImgSrc] = useState(image);
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (!imageError) {
      const fallbackIndex = id % UNSPLASH_IMAGES.length;
      setImgSrc(UNSPLASH_IMAGES[fallbackIndex]);
      setImageError(true);
    }
  };

  // Ensure rating exists with default values
  const safeRating = rating || { rate: 0, count: 0 };

  return (
    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-100">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden bg-gray-50">
        <img
          src={imgSrc}
          alt={title}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          onError={handleImageError}
          loading="lazy"
        />
        
        {/* Favorite Button */}
        <div className="absolute top-3 right-3">
          <FavoriteToggle productId={id} />
        </div>
        
        {/* Category Badge */}
        <span className="absolute top-3 left-3 px-3 py-1 bg-blue-500 text-white text-xs font-semibold rounded-full">
          {category}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Title & Rating */}
        <div className="mb-3">
          <Link href={`/products/${id}`}>
            <h3 className="font-bold text-gray-900 line-clamp-1 mb-2 hover:text-blue-600 transition-colors">
              {title}
            </h3>
          </Link>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(safeRating.rate) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`}
                />
              ))}
              <span className="text-sm text-gray-500 ml-2">
                {safeRating.rate.toFixed(1)} ({safeRating.count})
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {description}
        </p>

        {/* Price & Actions */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <div>
            <span className="text-2xl font-bold text-gray-900">
              ${typeof price === 'number' ? price.toFixed(2) : '0.00'}
            </span>
          </div>
          <div className="flex space-x-2">
            <Link 
              href={`/products/${id}`}
              className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors text-sm"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}