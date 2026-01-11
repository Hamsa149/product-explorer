// C:\Users\hamsa\product-explorer\src\components\ProductDetails.tsx
'use client';

import { Product } from '@/types/product';
import FavoriteToggle from './FavoriteToggle';
import { Star } from 'lucide-react';
import Image from 'next/image';

interface ProductDetailsProps {
  product: Product;
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="animate-fade-in">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8">
          {/* Image Section */}
          <div className="relative">
            <div className="bg-gray-50 rounded-xl p-8">
              <Image
                src={product.image}
                alt={product.title}
                className="w-full h-auto max-h-96 object-contain"
                width={600}
                height={400}
                priority
              />
            </div>
            <div className="absolute top-4 right-4">
              <FavoriteToggle productId={product.id} />
            </div>
          </div>
          {/* ... rest of the code ... */}
        </div>
      </div>
    </div>
  );
}