// C:\Users\hamsa\product-explorer\src\app\products\[id]\page.tsx
import { notFound } from 'next/navigation';
import { fetchProduct, fetchProducts } from '@/lib/api';
import ProductDetails from '@/components/ProductDetails';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const products = await fetchProducts();
  return products.map((product) => ({
    id: product.id.toString(),
  }));
}

export async function generateMetadata({ params }: PageProps) {
  const { id } = await params;
  const product = await fetchProduct(parseInt(id)).catch(() => null);
  
  if (!product) {
    return {
      title: 'Product Not Found',
    };
  }
  
  return {
    title: `${product.title} | Product Explorer`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: PageProps) {
  const { id } = await params;
  const product = await fetchProduct(parseInt(id)).catch(() => null);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-7xl mx-auto">
      <Link 
        href="/" 
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Products
      </Link>
      
      <ProductDetails product={product} />
    </div>
  );
}