'use client';

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoPart } from '@/data/products';
import ProductCard from './ProductCard';
import { VehicleSelection } from './VehicleSelector';
import { Search, SlidersHorizontal, Check, RefreshCw, Car, AlertCircle } from 'lucide-react';

interface ProductGridProps {
  products: AutoPart[];
  selectedCategory: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  currentVehicle: VehicleSelection | null;
  onOpenVehicleModal: () => void;
  onOpenStockModal: (product: AutoPart) => void;
  onAddToCart: (product: AutoPart) => void;
}

export default function ProductGrid({
  products,
  selectedCategory,
  searchQuery,
  onSearchChange,
  currentVehicle,
  onOpenVehicleModal,
  onOpenStockModal,
  onAddToCart,
}: ProductGridProps) {
  const [selectedBrandFilter, setSelectedBrandFilter] = useState<string>('');
  const [onlyCompatible, setOnlyCompatible] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'discount'>('popular');

  // Extract unique brands of auto parts for filter
  const allPartBrands = useMemo(() => {
    const brands = new Set<string>();
    products.forEach((p) => brands.add(p.brand));
    return Array.from(brands).sort();
  }, [products]);

  // Filtered list logic
  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Category filter
      if (selectedCategory && product.category !== selectedCategory) {
        return false;
      }

      // Brand filter
      if (selectedBrandFilter && product.brand !== selectedBrandFilter) {
        return false;
      }

      // Search query filter (matches name, code, brand, compatible models)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const nameMatch = product.name.toLowerCase().includes(query);
        const codeMatch = product.code.toLowerCase().includes(query);
        const brandMatch = product.brand.toLowerCase().includes(query);
        const modelMatch = product.compatibleModels.some((m) => m.toLowerCase().includes(query));
        const brandCarMatch = product.compatibleBrands.some((b) => b.toLowerCase().includes(query));

        if (!nameMatch && !codeMatch && !brandMatch && !modelMatch && !brandCarMatch) {
          return false;
        }
      }

      // Vehicle compatibility filter
      if (currentVehicle && onlyCompatible) {
        const brandMatches = product.compatibleBrands.includes(currentVehicle.brand);
        const modelMatches = !currentVehicle.model || product.compatibleModels.includes(currentVehicle.model);
        if (!brandMatches || !modelMatches) {
          return false;
        }
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'discount') {
        const discA = a.oldPrice ? a.oldPrice - a.price : 0;
        const discB = b.oldPrice ? b.oldPrice - b.price : 0;
        return discB - discA;
      }
      return b.rating - a.rating; // default 'popular'
    });
  }, [products, selectedCategory, selectedBrandFilter, searchQuery, currentVehicle, onlyCompatible, sortBy]);

  const hasActiveFilters = selectedCategory || selectedBrandFilter || searchQuery || (currentVehicle && onlyCompatible);

  const resetAllFilters = () => {
    setSelectedBrandFilter('');
    onSearchChange('');
    setOnlyCompatible(false);
  };

  return (
    <section className="py-6 min-h-[500px]" id="catalogo-produtos">
      <div className="max-w-7xl mx-auto px-4">
        {/* Controls Bar */}
        <div className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 w-full md:w-auto">
            <div className="flex items-center gap-2 font-black text-neutral-900 text-xs uppercase tracking-wider">
              <SlidersHorizontal className="w-4 h-4 text-orange-600" />
              <span>Estoque Físico</span>
              <span className="bg-orange-600 text-white text-[10px] px-2.5 py-0.5 rounded-full font-black">
                {filteredProducts.length} ITENS
              </span>
            </div>

            {/* Filter by Part Brand */}
            <select
              value={selectedBrandFilter}
              onChange={(e) => setSelectedBrandFilter(e.target.value)}
              className="text-xs bg-neutral-100 border-none rounded-full px-4 py-2 font-bold text-neutral-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Todas as Fabricantes (Bosch, Cofap, etc.)</option>
              {allPartBrands.map((b) => (
                <option key={b} value={b}>
                  Fabricante: {b}
                </option>
              ))}
            </select>

            {/* Vehicle Toggle Checkbox */}
            {currentVehicle && (
              <label className="flex items-center gap-2 cursor-pointer bg-orange-50 border border-orange-200 text-orange-950 px-3.5 py-1.5 rounded-full text-xs font-bold hover:bg-orange-100 transition-colors">
                <input
                  type="checkbox"
                  checked={onlyCompatible}
                  onChange={(e) => setOnlyCompatible(e.target.checked)}
                  className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4"
                />
                <span>Compatíveis com {currentVehicle.model}</span>
              </label>
            )}
          </div>

          {/* Sort selector */}
          <div className="flex flex-wrap items-center gap-2 w-full md:w-auto mt-2 md:mt-0">
            <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest whitespace-nowrap">Ordenar:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-neutral-100 border-none rounded-full px-4 py-2 font-bold text-neutral-800 focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="popular">Mais Populares</option>
              <option value="price-asc">Menor Preço</option>
              <option value="price-desc">Maior Preço</option>
              <option value="discount">Maiores Descontos</option>
            </select>

            {hasActiveFilters && (
              <button
                onClick={resetAllFilters}
                className="p-2 text-neutral-400 hover:text-orange-600 hover:bg-orange-50 rounded-full transition-colors text-xs font-bold flex items-center gap-1"
                title="Limpar filtros"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Empty State / Product Grid com AnimatePresence */}
        <AnimatePresence mode="wait">
        {filteredProducts.length === 0 ? (
          <motion.div 
            key="empty-state"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="bg-white p-12 rounded-3xl border border-neutral-100 text-center my-8 max-w-xl mx-auto shadow-sm"
          >
            <div className="w-16 h-16 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mx-auto mb-4">
              <AlertCircle className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-neutral-900 mb-2">
              Nenhuma peça encontrada para estes filtros
            </h3>
            <p className="text-xs text-neutral-500 mb-6 font-medium leading-relaxed">
              Tente buscar por um termo genérico, remover a fabricante ou consultar nosso balcão diretamente via WhatsApp. Temos mais de 15.000 itens físicos em estoque.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-3">
              <button
                onClick={resetAllFilters}
                className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 font-bold text-xs rounded-full transition-colors"
              >
                Limpar Filtros de Busca
              </button>
              <button
                onClick={onOpenVehicleModal}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-full shadow-lg shadow-orange-200 transition-colors flex items-center justify-center gap-1.5"
              >
                <Car className="w-4 h-4" /> Alterar Veículo
              </button>
            </div>
          </motion.div>
        ) : (
          /* Product Grid */
          <motion.div 
            key="product-grid"
            initial="hidden"
            animate="show"
            exit="hidden"
            variants={{
              hidden: { opacity: 0 },
              show: {
                opacity: 1,
                transition: { staggerChildren: 0.05 }
              }
            }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onOpenStockModal={onOpenStockModal}
                onAddToCart={onAddToCart}
                currentVehicle={currentVehicle}
              />
            ))}
          </motion.div>
        )}
        </AnimatePresence>
      </div>
    </section>
  );
}
