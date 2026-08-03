'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AutoPart } from '@/data/products';
import { X, MessageSquare, Shield, Check, MapPin, Tag, Camera, ChevronRight, Layers } from 'lucide-react';
import { generateSingleProductWhatsAppLink } from '@/lib/whatsapp';
import { VehicleSelection } from './VehicleSelector';

interface StockPhotoModalProps {
  product: AutoPart | null;
  onClose: () => void;
  onAddToCart: (product: AutoPart) => void;
  currentVehicle: VehicleSelection | null;
}

export default function StockPhotoModal({
  product,
  onClose,
  onAddToCart,
  currentVehicle,
}: StockPhotoModalProps) {
  if (!product) return null;

  const photos = product.stockPhotos && product.stockPhotos.length > 0
    ? product.stockPhotos
    : [{ url: product.mainImage, caption: 'Foto Principal do Produto em Estoque' }];

  const [activePhotoIndex, setActivePhotoIndex] = useState<number>(0);
  const currentPhoto = photos[activePhotoIndex] || photos[0];

  const isCompatible = currentVehicle
    ? product.compatibleBrands.includes(currentVehicle.brand) &&
      (!currentVehicle.model || product.compatibleModels.includes(currentVehicle.model))
    : null;

  const whatsappUrl = generateSingleProductWhatsAppLink(product, currentVehicle);

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-900/75 backdrop-blur-sm"
            onClick={onClose}
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="relative bg-white w-full max-w-4xl rounded-3xl shadow-2xl overflow-hidden my-auto border border-orange-200 z-10"
          >
        {/* Modal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 bg-slate-900/80 hover:bg-slate-900 text-white rounded-full p-2 transition-colors shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Left Column: Gallery */}
          <div className="lg:col-span-7 bg-slate-950 p-4 sm:p-6 flex flex-col justify-between">
            {/* Active Image Display */}
            <div className="relative aspect-4/3 w-full bg-slate-900 rounded-2xl overflow-hidden border border-slate-800 flex items-center justify-center mb-3">
              <img
                src={currentPhoto.url}
                alt={currentPhoto.caption}
                className="w-full h-full object-contain"
              />
              <div className="absolute top-3 left-3 bg-orange-600 text-white text-[10px] font-extrabold px-2.5 py-1 rounded-lg uppercase tracking-wider shadow">
                Estoque Físico Confirmado
              </div>
            </div>

            {/* Photo Caption */}
            <div className="bg-slate-900/80 p-2.5 rounded-xl border border-slate-800 text-xs text-slate-300 font-medium flex items-center gap-2 mb-3">
              <Camera className="w-4 h-4 text-orange-400 shrink-0" />
              <span>{currentPhoto.caption}</span>
            </div>

            {/* Thumbnails */}
            {photos.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {photos.map((photo, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActivePhotoIndex(idx)}
                    className={`relative w-16 h-16 rounded-xl overflow-hidden border-2 transition-all shrink-0 ${
                      activePhotoIndex === idx
                        ? 'border-orange-500 ring-2 ring-orange-500/50 scale-105'
                        : 'border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={photo.url} alt={photo.caption} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Product details & WhatsApp quote */}
          <div className="lg:col-span-5 p-5 sm:p-6 flex flex-col justify-between bg-white">
            <div>
              {/* Category & Code */}
              <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                <span className="bg-orange-100 text-orange-800 font-bold px-2.5 py-0.5 rounded-lg text-[10px] uppercase">
                  {product.brand}
                </span>
                <span className="font-mono text-slate-600 font-bold">SKU: {product.code}</span>
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl font-extrabold text-slate-900 leading-snug mb-3">
                {product.name}
              </h2>

              {/* Shelf Location Badge */}
              <div className="bg-slate-50 border border-slate-200 p-3 rounded-2xl mb-4 flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 font-bold">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    Localização no Balcão
                  </div>
                  <div className="text-xs font-bold text-slate-800">
                    {product.shelfLocation || 'Corredor Central - Prateleira A'}
                  </div>
                </div>
              </div>

              {/* Vehicle Compatibility Banner */}
              {isCompatible !== null && (
                <div
                  className={`p-3 rounded-2xl text-xs font-bold mb-4 flex items-center gap-2 ${
                    isCompatible
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200'
                      : 'bg-amber-50 text-amber-900 border border-amber-200'
                  }`}
                >
                  {isCompatible ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Peça 100% testada e compatível com {currentVehicle?.model}</span>
                    </>
                  ) : (
                    <>
                      <Tag className="w-4 h-4 text-amber-600 shrink-0" />
                      <span>Consulte nosso vendedor para confirmar compatibilidade com seu veículo</span>
                    </>
                  )}
                </div>
              )}

              {/* Specifications Table */}
              <div className="mb-4">
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2 flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5 text-orange-600" /> Ficha Técnica
                </h4>
                <div className="bg-slate-50 rounded-xl p-3 border border-slate-100 space-y-1.5 text-xs">
                  {Object.entries(product.specifications).map(([key, val]) => (
                    <div key={key} className="flex justify-between border-b border-slate-200/60 pb-1 last:border-0 last:pb-0">
                      <span className="text-slate-500 font-medium">{key}:</span>
                      <span className="text-slate-900 font-bold text-right ml-2">{val}</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500 font-medium">Garantia:</span>
                    <span className="text-emerald-700 font-black">{product.warrantyMonths} Meses com Nota Fiscal</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="pt-4 border-t border-slate-100">
              <div className="mb-3">
                <div className="text-2xl font-black text-orange-600">
                  R$ {product.price.toFixed(2).replace('.', ',')}
                  <span className="text-xs font-medium text-slate-500 ml-1.5">à vista no Pix/Dinheiro</span>
                </div>
                {product.oldPrice && (
                  <div className="text-xs text-slate-400 line-through">
                    De: R$ {product.oldPrice.toFixed(2).replace('.', ',')}
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2"
                >
                  <MessageSquare className="w-4 h-4" /> Solicitar Orçamento no WhatsApp
                </a>

                <button
                  onClick={() => {
                    onAddToCart(product);
                    onClose();
                  }}
                  className="w-full py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
                >
                  + Adicionar à Lista de Orçamento
                </button>
              </div>
            </div>
          </div>
        </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
