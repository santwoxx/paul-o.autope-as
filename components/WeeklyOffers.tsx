'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { AutoPart } from '@/data/products';
import { Clock, Eye, MessageSquare, Percent, Sparkles, Tag, Check, ShieldCheck } from 'lucide-react';
import { generateSingleProductWhatsAppLink } from '@/lib/whatsapp';
import { VehicleSelection } from './VehicleSelector';
import Link from 'next/link';

interface WeeklyOffersProps {
  products: AutoPart[];
  onOpenStockModal: (product: AutoPart) => void;
  onAddToCart: (product: AutoPart) => void;
  currentVehicle: VehicleSelection | null;
}

export default function WeeklyOffers({
  products,
  onOpenStockModal,
  onAddToCart,
  currentVehicle,
}: WeeklyOffersProps) {
  const offerProducts = products.filter((p) => p.isWeeklyOffer);

  // Live countdown timer mock state for the week's end
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 14,
    minutes: 32,
    seconds: 45,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: 59, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (offerProducts.length === 0) return null;

  return (
    <section className="py-8 my-6 max-w-7xl mx-auto px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
        <div>
          <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest block mb-1">
            Ofertas em Destaque
          </span>
          <h2 className="text-2xl lg:text-3xl font-black text-neutral-900 tracking-tight">
            Descontos Especiais no Estoque
          </h2>
        </div>

        {/* Countdown timer card */}
        <div className="bg-neutral-900 text-white p-3.5 px-5 rounded-2xl flex items-center gap-3.5 shadow-lg border border-neutral-800 shrink-0">
          <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white shrink-0">
            <Clock className="w-4 h-4 animate-pulse" />
          </div>
          <div>
            <div className="text-[10px] uppercase font-bold text-neutral-400 tracking-widest">
              Termina em:
            </div>
            <div className="flex items-center gap-1 text-sm font-black font-mono">
              <span className="text-orange-400">{String(timeLeft.days).padStart(2, '0')}d</span>:
              <span className="text-orange-400">{String(timeLeft.hours).padStart(2, '0')}h</span>:
              <span className="text-orange-400">{String(timeLeft.minutes).padStart(2, '0')}m</span>:
              <span className="text-orange-400">{String(timeLeft.seconds).padStart(2, '0')}s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Offers Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {offerProducts.map((product, index) => {
          const discountPercent = product.oldPrice
            ? Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)
            : null;

          const isCompatible = currentVehicle
            ? product.compatibleBrands.includes(currentVehicle.brand) &&
              (!currentVehicle.model || product.compatibleModels.includes(currentVehicle.model))
            : null;

          const whatsappUrl = generateSingleProductWhatsAppLink(product, currentVehicle);

          return (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1, ease: "easeOut" }}
              key={product.id}
              className="bg-white p-4 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:-translate-y-1"
            >
              <div>
                {/* Product Image Box */}
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

                  {/* Top Badges */}
                  <div className="absolute top-2 left-2 right-2 flex items-center justify-between pointer-events-none z-10">
                    {discountPercent && (
                      <span className="bg-orange-600 text-white font-black text-[10px] px-2 py-0.5 rounded-full shadow uppercase">
                        -{discountPercent}% OFF
                      </span>
                    )}

                    {product.stockPhotos && product.stockPhotos.length > 0 && (
                      <span className="bg-neutral-900/90 text-white font-bold text-[9px] px-2 py-0.5 rounded-full backdrop-blur-sm shadow ml-auto">
                        📸 FOTO REAL
                      </span>
                    )}
                  </div>
                </div>
                </Link>

                {/* Category & Brand Tag */}
                <p className="text-xs text-orange-600 font-bold uppercase tracking-wider mb-1">
                  {product.brand} • {product.category.toUpperCase()}
                </p>

                {/* Title */}
                <Link href={`/produto/${product.id}`} className="block">
                  <h4
                    className="font-bold text-neutral-800 text-sm line-clamp-2 hover:text-orange-600 transition-colors cursor-pointer mb-3"
                  >
                    {product.name}
                  </h4>
                </Link>

                {/* Compatibility Pill */}
                {isCompatible !== null && (
                  <div
                    className={`text-[11px] font-bold py-1 px-2.5 rounded-lg mb-3 flex items-center gap-1.5 ${
                      isCompatible
                        ? 'bg-emerald-50 text-emerald-800 border border-emerald-200'
                        : 'bg-amber-50 text-amber-800 border border-amber-200'
                    }`}
                  >
                    {isCompatible ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        <span>Compatível com seu {currentVehicle?.model}</span>
                      </>
                    ) : (
                      <>
                        <Tag className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                        <span>Confirmar no WhatsApp</span>
                      </>
                    )}
                  </div>
                )}
              </div>

              {/* Price & Actions */}
              <div className="pt-2 border-t border-neutral-100 mt-2">
                <div className="flex items-baseline justify-between mb-3">
                  <div>
                    {product.oldPrice && (
                      <span className="text-xs text-neutral-400 line-through mr-1.5">
                        R$ {product.oldPrice.toFixed(2).replace('.', ',')}
                      </span>
                    )}
                    <span className="text-xl font-black text-neutral-900">
                      R$ {product.price.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                  <span className="text-[10px] text-neutral-400 uppercase font-semibold">
                    Em Estoque ({product.stockCount})
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
                    className="w-10 h-10 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center hover:bg-orange-600 hover:text-white transition-colors shrink-0 font-bold"
                    title="Adicionar à Lista de Orçamento"
                  >
                    +
                  </button>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
