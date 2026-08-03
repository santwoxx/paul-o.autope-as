'use client';

import React from 'react';
import { Home, Car, Grid, ShoppingCart, MessageSquare } from 'lucide-react';
import { generateGeneralInquiryWhatsAppLink } from '@/lib/whatsapp';
import { VehicleSelection } from './VehicleSelector';

interface MobileNavProps {
  currentVehicle: VehicleSelection | null;
  onOpenVehicleModal: () => void;
  onOpenCategories: () => void;
  cartCount: number;
  onOpenCart: () => void;
  onScrollToTop: () => void;
}

export default function MobileNav({
  currentVehicle,
  onOpenVehicleModal,
  onOpenCategories,
  cartCount,
  onOpenCart,
  onScrollToTop,
}: MobileNavProps) {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-slate-200 shadow-2xl md:hidden pb-safe">
      <div className="grid grid-cols-5 items-center py-2 text-center text-[10px]">
        {/* Início */}
        <button
          onClick={onScrollToTop}
          className="flex flex-col items-center justify-center gap-1 text-slate-600 hover:text-orange-600 transition-colors py-1"
        >
          <Home className="w-5 h-5 text-slate-700" />
          <span className="font-semibold">Início</span>
        </button>

        {/* Meu Carro */}
        <button
          onClick={onOpenVehicleModal}
          className={`flex flex-col items-center justify-center gap-1 transition-colors py-1 relative ${
            currentVehicle ? 'text-orange-600 font-extrabold' : 'text-slate-600 hover:text-orange-600'
          }`}
        >
          <div className="relative">
            <Car className={`w-5 h-5 ${currentVehicle ? 'text-orange-600' : 'text-slate-700'}`} />
            {currentVehicle && (
              <span className="absolute -top-1 -right-1.5 w-2.5 h-2.5 rounded-full bg-orange-600 border border-white"></span>
            )}
          </div>
          <span className="font-semibold">{currentVehicle ? currentVehicle.model : 'Meu Carro'}</span>
        </button>

        {/* Categorias */}
        <button
          onClick={onOpenCategories}
          className="flex flex-col items-center justify-center gap-1 text-slate-600 hover:text-orange-600 transition-colors py-1"
        >
          <Grid className="w-5 h-5 text-slate-700" />
          <span className="font-semibold">Categorias</span>
        </button>

        {/* Lista de Orçamento */}
        <button
          onClick={onOpenCart}
          className="flex flex-col items-center justify-center gap-1 text-slate-600 hover:text-orange-600 transition-colors py-1 relative"
        >
          <div className="relative">
            <ShoppingCart className="w-5 h-5 text-slate-700" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2.5 bg-orange-600 text-white font-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center border border-white">
                {cartCount}
              </span>
            )}
          </div>
          <span className="font-semibold">Orçamento</span>
        </button>

        {/* WhatsApp Direto */}
        <a
          href={generateGeneralInquiryWhatsAppLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center gap-1 text-emerald-600 font-bold hover:text-emerald-700 transition-colors py-1"
        >
          <MessageSquare className="w-5 h-5 text-emerald-600 fill-emerald-100" />
          <span>WhatsApp</span>
        </a>
      </div>
    </nav>
  );
}
