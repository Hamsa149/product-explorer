// C:\Users\hamsa\product-explorer\src\app\page.tsx
import ProductGrid from '@/components/ProductGrid';

export default function Home() {
  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <div className="inline-block px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full text-white font-medium mb-4">
          🚀 New Collection
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Find Amazing Products
          <br />
          <span className="text-gradient">That Fit Your Style</span>
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Explore thousands of products from different categories. 
          Find exactly what you're looking for with our powerful search and filters.
        </p>
      </div>

      {/* Stats - You can keep these or remove them */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
        {[
          { label: "Products", value: "20+" },
          { label: "Categories", value: "4" },
          { label: "Avg Rating", value: "4.5★" },
          { label: "Happy Users", value: "1k+" }
        ].map((stat, index) => (
          <div 
            key={index}
            className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 text-center"
          >
            <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
            <div className="text-gray-600">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Product Grid - This is REQUIRED for your assignment */}
      <ProductGrid />

      {/* REMOVE this Weather Widget - It's NOT required for your assignment */}
      {/* <div className="mt-12 p-6 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl text-white">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm opacity-90 mb-1">📍 UTC</div>
            <div className="text-2xl font-bold">Partly Cloudy</div>
            <div className="text-sm opacity-90 mt-1">22°C • Feels like 24°C</div>
          </div>
          <div className="text-5xl">⛅</div>
        </div>
      </div> */}
    </div>
  );
}