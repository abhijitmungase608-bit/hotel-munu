import React from 'react';
import type { Category } from '../../types';

interface CategoryTabsProps {
  categories: Category[];
  selectedCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryTabs: React.FC<CategoryTabsProps> = ({
  categories,
  selectedCategoryId,
  onSelectCategory,
}) => {
  return (
    <div className="sticky top-14 z-20 bg-white/95 backdrop-blur-md border-b border-slate-100 py-2 px-3 shadow-xs">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth">
        <button
          onClick={() => onSelectCategory('ALL')}
          className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1 shrink-0 ${
            selectedCategoryId === 'ALL'
              ? 'bg-slate-900 text-white shadow-xs'
              : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
          }`}
        >
          <span>✨ All Dishes</span>
        </button>

        {categories.map((cat) => {
          const isSelected = selectedCategoryId === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition flex items-center gap-1.5 shrink-0 ${
                isSelected
                  ? 'bg-orange-500 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
