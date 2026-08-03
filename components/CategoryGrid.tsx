'use client';

import React from 'react';
import { CATEGORIES, Category } from '@/data/categories';
import {
  Disc,
  Cog,
  GitCommitVertical,
  Zap,
  Droplet,
  Wind,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  Filter,
} from 'lucide-react';

interface CategoryGridProps {
  selectedCategory: string | null;
  onSelectCategory: (categoryId: string | null) => void;
}

const ICON_MAP: Record<string, React.ReactNode> = {
  Disc: <Disc className="w-5 h-5" />,
  Cog: <Cog className="w-5 h-5" />,
  GitCommitVertical: <GitCommitVertical className="w-5 h-5" />,
  Zap: <Zap className="w-5 h-5" />,
  Droplet: <Droplet className="w-5 h-5" />,
  Wind: <Wind className="w-5 h-5" />,
  ShieldAlert: <ShieldAlert className="w-5 h-5" />,
  Sparkles: <Sparkles className="w-5 h-5" />,
};

export default function CategoryGrid({
  selectedCategory,
  onSelectCategory,
}: CategoryGridProps) {
  return (
    <section id="categorias-section" className="py-4 max-w-7xl mx-auto px-4">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-0.5">
            Categorias
          </h3>
          <h2 className="text-xl sm:text-2xl font-bold text-neutral-900">
            Navegue por Sistemas Automotivos
          </h2>
        </div>

        {selectedCategory && (
          <button
            onClick={() => onSelectCategory(null)}
            className="text-xs text-orange-600 hover:text-orange-700 font-bold underline transition-colors"
          >
            Limpar Categoria
          </button>
        )}
      </div>

      {/* Scrollable category pills on mobile, flex wrap on desktop */}
      <div className="flex items-center gap-2.5 overflow-x-auto pb-2 scrollbar-none snap-x">
        <button
          onClick={() => onSelectCategory(null)}
          className={`snap-start shrink-0 px-4 py-2.5 rounded-full font-bold text-xs transition-all flex items-center gap-2.5 border ${
            selectedCategory === null
              ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20'
              : 'bg-white text-neutral-700 border-neutral-200 hover:border-orange-300 hover:bg-orange-50/50'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${selectedCategory === null ? 'bg-white' : 'bg-neutral-300'}`}></div>
          <span>Todas as Categorias</span>
        </button>

        {CATEGORIES.map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(isSelected ? null : cat.id)}
              className={`snap-start shrink-0 px-4 py-2.5 rounded-full font-bold text-xs transition-all flex items-center gap-2.5 border ${
                isSelected
                  ? 'bg-orange-600 text-white border-orange-600 shadow-md shadow-orange-600/20'
                  : 'bg-white text-neutral-700 border-neutral-200 hover:border-orange-300 hover:bg-orange-50/50'
              }`}
            >
              <div
                className={`w-2 h-2 rounded-full ${
                  isSelected ? 'bg-white' : 'bg-orange-600'
                }`}
              ></div>
              <span className={isSelected ? 'text-white' : 'text-orange-600'}>
                {ICON_MAP[cat.iconName] || <Cog className="w-4 h-4" />}
              </span>
              <span>{cat.name}</span>
              <span
                className={`text-[10px] px-2 py-0.5 rounded-full font-black ${
                  isSelected ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-500'
                }`}
              >
                {cat.count}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}
