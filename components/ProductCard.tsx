'use client';

import React from 'react';
import { motion } from 'motion/react';
import { AutoPart } from '@/data/products';
import { Check, Eye, MessageSquare, Shield, Tag, Camera, MapPin } from 'lucide-react';
import { generateSingleProductWhatsAppLink } from '@/lib/whatsapp';
import { VehicleSelection } from './VehicleSelector';
import Link from 'next/link';

interface ProductCardProps {
  product: AutoPart;
  onOpenStockModal: (product: AutoPart) => void;
  onAddToCart: (product: AutoPart) => void;
  currentVehicle: VehicleSelection | null;
}

export default function ProductCard({
  product,
  onOpenStockModal,
  onAddToCart,
  currentVehicle,
}: ProductCardProps) {
  const isCompatible = currentVehicle
    ? product.compatibleBrands.includes(currentVehicle.brand) &&
      (!currentVehicle.model || product.compatibleModels.includes(currentVehicle.model))
    : null;

  const whatsappUrl = generateSingleProductWhatsAppLink(product, currentVehicle);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
      className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl transition-shadow flex flex-col justify-between group"
    >
      <div>
        {/* Top Image area */}
        <Link href={`/produto/${product.id}`} className="block">
          <div
            className="h-36 bg-neutral-100 rounded-xl mb-3 relative overflow-hidden cursor-pointer"
          >
          <img
            src={product.mainImage}
            alt={product.name}
            className="w-full h-full object-contain p-2 group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />

          {/* Floating Stock Photos Count Badge */}
          {product.stockPhotos && product.stockPhotos.length > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onOpenStockModal(product);
              }}
              className="absolute top-2 right-2 bg-neutral-900/90 hover:bg-neutral-900 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-full backdrop-blur-sm shadow transition-all flex items-center gap-1 z-10"
            >
              <Camera className="w-3 h-3 text-orange-400" />
              <span>Fotos Estoque ({product.stockPhotos.length})</span>
            </button>
          )}

          {/* Condition Tag */}
          <div className="absolute top-2 left-2 z-10">
            <span className="bg-orange-600 text-white font-bold text-[9px] px-2 py-0.5 rounded-full shadow uppercase tracking-wider">
              {product.condition}
            </span>
          </div>

          {/* Hover View overlay */}
          <div className="absolute inset-0 bg-neutral-900/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
            <span className="bg-white/95 text-neutral-900 font-bold text-xs px-3 py-1.5 rounded-full shadow backdrop-blur-sm flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5 text-orange-600" /> Ver Detalhes
            </span>
          </div>
        </div>
        </Link>

        {/* Category Tag */}
        <p className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">
          {product.brand} • {product.category.toUpperCase()}
        </p>

        {/* Title */}
        <Link href={`/produto/${product.id}`} className="block">
          <h4
            className="font-bold text-neutral-800 text-sm line-clamp-2 hover:text-orange-600 transition-colors cursor-pointer mb-2.5"
          >
            {product.name}
          </h4>
        </Link>

        {/* Compatibility Pill */}
        {isCompatible !== null && (
          <div
            className={`text-[11px] font-extrabold py-1 px-2.5 rounded-lg mb-2.5 flex items-center gap-1.5 ${
              isCompatible
                ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                : 'bg-amber-50 text-amber-800 border border-amber-200'
            }`}
          >
            {isCompatible ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>Compatível com {currentVehicle?.model}</span>
              </>
            ) : (
              <>
                <Tag className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Verificar compatibilidade</span>
              </>
            )}
          </div>
        )}

        {/* Shelf location & Warranty */}
        <div className="flex items-center justify-between text-[11px] text-neutral-500 mb-3 bg-neutral-50 p-2 rounded-xl border border-neutral-100">
          <span className="flex items-center gap-1 text-neutral-600 font-medium truncate">
            <MapPin className="w-3.5 h-3.5 text-orange-600 shrink-0" />
            <span className="truncate">{product.shelfLocation || 'Estoque Físico'}</span>
          </span>
          <span className="flex items-center gap-1 text-neutral-700 font-bold shrink-0 ml-1">
            <Shield className="w-3 h-3 text-emerald-600" /> {product.warrantyMonths}m Gar.
          </span>
        </div>
      </div>

      {/* Pricing & Actions */}
      <div className="pt-2 border-t border-neutral-100">
        <div className="flex items-baseline justify-between mb-3">
          <span className="text-xl font-black text-neutral-900">
            R$ {product.price.toFixed(2).replace('.', ',')}
          </span>
          <span className="text-[10px] text-neutral-400 font-mono">
            SKU: {product.code}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-xl shadow transition-colors flex items-center justify-center gap-1.5"
          >
            <MessageSquare className="w-3.5 h-3.5" /> WhatsApp
          </a>

          <button
            onClick={() => onAddToCart(product)}
            className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-colors shrink-0 font-bold"
            title="Adicionar à Lista de Orçamento"
          >
            +
          </button>
        </div>
      </div>
    </motion.div>
  );
}
