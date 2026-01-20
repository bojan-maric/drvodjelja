// src/components/gallery/GalleryFilter.tsx
'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type Category = 'sve' | 'kuhinje' | 'vrata' | 'namjestaj' | 'stepenice' | 'ostalo';

interface GalleryFilterProps {
  activeCategory: Category;
  onCategoryChange: (category: Category) => void;
}

const categories: { value: Category; label: string }[] = [
  { value: 'sve', label: 'Sve' },
  { value: 'kuhinje', label: 'Kuhinje' },
  { value: 'vrata', label: 'Vrata i prozori' },
  { value: 'namjestaj', label: 'Namještaj' },
  { value: 'stepenice', label: 'Stepenice' },
  { value: 'ostalo', label: 'Ostalo' },
];

export default function GalleryFilter({ activeCategory, onCategoryChange }: GalleryFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2 md:gap-3">
      {categories.map((category) => (
        <button
          key={category.value}
          onClick={() => onCategoryChange(category.value)}
          className={cn(
            'relative px-4 py-2 md:px-6 md:py-2.5 rounded-full text-sm md:text-base font-medium transition-colors duration-300',
            activeCategory === category.value
              ? 'text-white'
              : 'text-wood-darker/70 hover:text-wood-darker bg-white/50 hover:bg-white/80'
          )}
        >
          {/* Active background pill */}
          {activeCategory === category.value && (
            <motion.div
              layoutId="activeCategory"
              className="absolute inset-0 bg-wood rounded-full shadow-md"
              transition={{ type: 'spring', stiffness: 400, damping: 30 }}
            />
          )}
          <span className="relative z-10">{category.label}</span>
        </button>
      ))}
    </div>
  );
}
