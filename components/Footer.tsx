'use client';

import React from 'react';
import Image from 'next/image';
import { Wrench, Phone, MapPin, Clock, ShieldCheck, Heart, Instagram } from 'lucide-react';
import { STORE_NAME, STORE_ADDRESS, STORE_WHATSAPP_NUMBER, generateGeneralInquiryWhatsAppLink } from '@/lib/whatsapp';

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-800 pt-12 pb-24 md:pb-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Col */}
          <div className="space-y-3">
            <div className="flex items-center gap-2.5">
              <Image 
                src="/images/logo.png" 
                alt="Paulão Autopeças" 
                width={180} 
                height={60} 
                className="h-10 w-auto object-contain" 
              />
            </div>
            <p className="text-neutral-400 text-xs leading-relaxed">
              Sua distribuidora de peças automotivas com estoque físico garantido, entregas expressas e confirmação por foto no WhatsApp. <strong className="text-orange-400">Atenção: Não comercializamos pneus.</strong>
            </p>
            <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs pt-1">
              <ShieldCheck className="w-4 h-4" /> Garantia de Origem & NF-e
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3">
              Linhas de Peças
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#catalogo-produtos" className="hover:text-orange-400 transition-colors">
                  Pastilhas & Discos de Freio
                </a>
              </li>
              <li>
                <a href="#catalogo-produtos" className="hover:text-orange-400 transition-colors">
                  Amortecedores & Suspensão
                </a>
              </li>
              <li>
                <a href="#catalogo-produtos" className="hover:text-orange-400 transition-colors">
                  Correias Dentadas & Motor
                </a>
              </li>
              <li>
                <a href="#catalogo-produtos" className="hover:text-orange-400 transition-colors">
                  Óleos & Lubrificantes
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-widest mb-3">
              Atendimento Balcão
            </h4>
            <ul className="space-y-2.5">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-orange-500 shrink-0 mt-0.5" />
                <span>{STORE_ADDRESS}</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-orange-500 shrink-0" />
                <span>WhatsApp: (11) 99988-7766</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-orange-500 shrink-0" />
                <span>Seg-Sex: 08h-18h | Sáb: 08h-13h</span>
              </li>
              <li className="flex items-center gap-2 pt-1">
                <a
                  href="https://instagram.com/autopecas_paulao"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-orange-400 transition-colors"
                >
                  <Instagram className="w-4 h-4 text-orange-500 shrink-0" />
                  <span>@autopecas_paulao</span>
                </a>
              </li>
            </ul>
          </div>

          {/* WhatsApp fast CTA */}
          <div className="bg-neutral-900 p-5 rounded-2xl border border-neutral-800 space-y-3">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">
              Dúvidas de Compatibilidade?
            </h4>
            <p className="text-[11px] text-neutral-400 leading-relaxed">
              Envie a placa ou modelo do carro e receba a confirmação com foto real do estoque no WhatsApp.
            </p>
            <a
              href={generateGeneralInquiryWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs rounded-full shadow-lg shadow-orange-600/30 transition-all uppercase tracking-wide"
            >
              Consultar no Balcão
            </a>
          </div>
        </div>
      </div>

      {/* Immersive UI Bottom Status Bar */}
      <div className="bg-neutral-900 border-t border-neutral-800 text-neutral-300 px-4 sm:px-8 py-3 text-[10px] uppercase tracking-[0.2em] flex flex-col sm:flex-row justify-between items-center gap-2 font-bold">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span>SISTEMA DE ESTOQUE INTEGRADO • AUTO PEÇAS BRASIL</span>
        </div>
        <div>
          <span>LOJA FÍSICA & ATENDIMENTO ONLINE</span>
        </div>
      </div>
    </footer>
  );
}
