'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Car, Search, ShieldCheck, Zap, Package, MessageSquare, Wrench, ArrowRight } from 'lucide-react';
import { generateGeneralInquiryWhatsAppLink } from '@/lib/whatsapp';
import { VehicleSelection } from './VehicleSelector';

interface HeroBannerProps {
  currentVehicle: VehicleSelection | null;
  onOpenVehicleModal: () => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export default function HeroBanner({
  currentVehicle,
  onOpenVehicleModal,
  searchQuery,
  onSearchChange,
}: HeroBannerProps) {
  return (
    <section className="w-full">
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative w-full overflow-hidden shadow-2xl group cursor-pointer"
        onClick={onOpenVehicleModal}
      >
        <img 
          src="/images/banner1.png" 
          alt="Banner de Ofertas e Peças"
          className="w-full h-auto object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-in-out"
        />
        
        {/* Overlay sutil para hover */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
      </motion.div>
    </section>
  );
}
