'use client';

import React from 'react';
import Image from 'next/image';
import {
  Car,
  MessageSquare,
  Search,
  ShoppingCart,
  Phone,
  Clock,
  MapPin,
  ChevronDown,
  Wrench,
  ShieldCheck,
  PackageCheck,
  Instagram,
} from 'lucide-react';
import { STORE_NAME, STORE_WHATSAPP_NUMBER, STORE_ADDRESS, generateGeneralInquiryWhatsAppLink } from '@/lib/whatsapp';
import { VehicleSelection } from './VehicleSelector';

interface HeaderProps {
  currentVehicle: VehicleSelection | null;
  onOpenVehicleModal: () => void;
  cartCount: number;
  onOpenCart: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function Header({
  currentVehicle,
  onOpenVehicleModal,
  cartCount,
  onOpenCart,
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  return (
    <header className="relative md:sticky md:top-0 z-40 w-full bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm">
      {/* Top Banner Bar */}
      <div className="hidden sm:block bg-neutral-900 text-white text-xs py-1.5 px-4 sm:px-8 border-b border-neutral-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-4 text-neutral-300 overflow-x-auto scrollbar-none whitespace-nowrap text-[11px] uppercase tracking-wider font-semibold w-full">
            <span className="flex items-center gap-1.5 text-emerald-400 font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Balcão de Atendimento Aberto
            </span>
            <span className="hidden md:flex items-center gap-1 text-neutral-400">
              <Clock className="w-3.5 h-3.5 text-orange-500" /> Seg à Sex: 08:00h - 18:00h | Sáb: 08:00h - 13:00h
            </span>
            <span className="hidden lg:flex items-center gap-1 text-neutral-400">
              <MapPin className="w-3.5 h-3.5 text-orange-500" /> {STORE_ADDRESS}
            </span>
          </div>

          <div className="flex items-center gap-4 shrink-0 text-xs font-bold">
            <a
              href="https://instagram.com/autopecas_paulao"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex items-center gap-1 text-neutral-300 hover:text-orange-400 transition-colors"
            >
              <Instagram className="w-3.5 h-3.5 text-orange-500" /> @autopecas_paulao
            </a>
            <a
              href={`tel:${STORE_WHATSAPP_NUMBER}`}
              className="flex items-center gap-1 text-neutral-300 hover:text-orange-400 transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-orange-500" /> (11) 99988-7766
            </a>
            <a
              href={generateGeneralInquiryWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" /> Falar com Vendedor
            </a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 py-3.5">
        <div className="flex flex-wrap md:flex-nowrap items-center justify-between gap-y-3 gap-x-4 lg:gap-8 w-full">
          {/* Logo */}
          <div className="flex items-center justify-start w-auto gap-2.5 shrink-0 order-1">
            <Image 
              src="/images/logo.png" 
              alt="Paulão Autopeças" 
              width={240} 
              height={80} 
              className="h-12 lg:h-16 w-auto object-contain drop-shadow-sm" 
              priority 
            />
          </div>

          {/* Search Bar: Vehicle Model / Part Name */}
          <div className="w-full md:w-auto md:flex-1 max-w-xl order-3 md:order-2 mt-1 md:mt-0">
            <div className="relative group">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Busque por peça ou modelo de carro (Não trabalhamos com pneus)..."
                className="w-full bg-neutral-100 border-none rounded-full py-2.5 px-5 pl-11 focus:ring-2 focus:ring-orange-500 transition-all text-xs sm:text-sm text-neutral-800 placeholder:text-neutral-400 font-medium"
              />
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400 group-focus-within:text-orange-500 transition-colors" />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-xs text-neutral-400 hover:text-neutral-600 font-bold bg-neutral-200 rounded-full w-4 h-4 flex items-center justify-center"
                >
                  ✕
                </button>
              )}
            </div>
          </div>

          {/* Actions: Vehicle Selector Badge & WhatsApp Quote Button */}
          <div className="flex items-center justify-end gap-3 w-auto shrink-0 order-2 md:order-3">
            {/* Vehicle selector button */}
            <button
              onClick={onOpenVehicleModal}
              className={`hidden md:flex items-center gap-2.5 px-4 py-2.5 rounded-full text-xs font-bold border transition-all ${
                currentVehicle
                  ? 'bg-orange-50 text-orange-900 border-orange-300 hover:bg-orange-100'
                  : 'bg-neutral-100 text-neutral-700 border-transparent hover:bg-neutral-200'
              }`}
            >
              <div className={`w-6 h-6 rounded-full flex items-center justify-center ${
                currentVehicle ? 'bg-orange-600 text-white' : 'bg-neutral-300 text-neutral-700'
              }`}>
                <Car className="w-3.5 h-3.5" />
              </div>

              <div className="text-left max-w-[150px] truncate">
                {currentVehicle ? (
                  <>
                    <div className="text-[9px] text-orange-600 uppercase tracking-widest font-extrabold">
                      Filtrado para
                    </div>
                    <div className="text-xs text-neutral-900 font-extrabold truncate">
                      {currentVehicle.brand} {currentVehicle.model}
                    </div>
                  </>
                ) : (
                  <span className="flex items-center gap-1 font-bold text-neutral-800">
                    Selecione Veículo <ChevronDown className="w-3.5 h-3.5 text-orange-600" />
                  </span>
                )}
              </div>
            </button>

            {/* WhatsApp Quote Button */}
            <a
              href={generateGeneralInquiryWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:flex bg-orange-600 hover:bg-orange-700 text-white font-black py-2.5 px-5 rounded-full items-center gap-2 transition-all shadow-lg shadow-orange-200 text-xs tracking-wide"
            >
              <MessageSquare className="w-4 h-4 fill-white/20" />
              <span>ORÇAMENTO RÁPIDO</span>
            </a>

            {/* Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative bg-neutral-900 hover:bg-neutral-800 text-white p-2.5 sm:px-4 rounded-full font-bold text-xs flex items-center gap-2 shadow-md transition-all"
            >
              <div className="relative">
                <ShoppingCart className="w-4 h-4 text-orange-400" />
                {cartCount > 0 && (
                  <span className="absolute -top-2 -right-2 bg-orange-600 text-white font-black text-[10px] w-4 h-4 rounded-full flex items-center justify-center border-2 border-neutral-900">
                    {cartCount}
                  </span>
                )}
              </div>
              <span className="hidden sm:inline uppercase text-[11px] tracking-wider font-extrabold">
                Lista ({cartCount})
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Vehicle Active Bar if set */}
        {currentVehicle && (
          <div className="mt-2.5 md:hidden bg-orange-50 border border-orange-200 rounded-full px-4 py-1.5 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2 text-orange-950 font-semibold truncate">
              <Car className="w-4 h-4 text-orange-600 shrink-0" />
              <span className="truncate">
                Filtrado para: <strong className="text-orange-600">{currentVehicle.brand} {currentVehicle.model}</strong> {currentVehicle.year ? `(${currentVehicle.year})` : ''}
              </span>
            </div>
            <button
              onClick={onOpenVehicleModal}
              className="text-orange-700 underline font-bold shrink-0 ml-2 text-[11px]"
            >
              Alterar
            </button>
          </div>
        )}
      </div>

      {/* Feature Highlights Subbar */}
      <div className="bg-neutral-50 border-t border-neutral-100 py-2 px-4 text-neutral-600 text-xs hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-around font-medium text-[11px] uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-orange-600" />
            <span>Fotos 100% Reais do Estoque</span>
          </div>
          <div className="flex items-center gap-2">
            <PackageCheck className="w-4 h-4 text-orange-600" />
            <span>Envio Imediato & Retirada em Loja</span>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 text-emerald-600" />
            <span>Suporte via WhatsApp Online</span>
          </div>
        </div>
      </div>
    </header>
  );
}
