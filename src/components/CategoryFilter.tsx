// C:\Users\hamsa\product-explorer\src\components\CategoryFilter.tsx
'use client';

export type ProductCategory = 
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing"
  | "all";

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: ProductCategory;
  onCategoryChange: (category: ProductCategory) => void;
}

export default function CategoryFilter({ 
  categories, 
  selectedCategory, 
  onCategoryChange 
}: CategoryFilterProps) {
  const allCategories: ProductCategory[] = ['all', ...categories as ProductCategory[]];

  return (
    <div className="flex flex-wrap gap-2">
      {allCategories.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
            selectedCategory === category
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          {category === 'all' ? 'All Products' : category}
        </button>
      ))}
    </div>
  );
}