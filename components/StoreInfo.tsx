'use client';

import React from 'react';
import {
  MapPin,
  Clock,
  ShieldCheck,
  Truck,
  CreditCard,
  QrCode,
  Building2,
  PhoneCall,
  CheckCircle2,
  Store,
  Wrench,
} from 'lucide-react';
import { STORE_NAME, STORE_ADDRESS, STORE_WHATSAPP_NUMBER, generateGeneralInquiryWhatsAppLink } from '@/lib/whatsapp';

export default function StoreInfo() {
  return (
    <section className="py-12 bg-neutral-50 border-t border-neutral-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-xs font-black text-orange-600 bg-orange-100 px-3.5 py-1 rounded-full uppercase tracking-widest inline-block mb-2">
            Balcão & Atendimento Físico
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-neutral-900 tracking-tight">
            Retirada Imediata em Loja ou Envio Express
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 font-medium mt-1.5 leading-relaxed">
            Mais de 15 anos fornecendo peças originais para motoristas, oficinas e frotas comerciais.
          </p>
        </div>

        {/* 4 Feature Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Box 1 */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-600 text-white rounded-xl flex items-center justify-center mb-4 shadow-md shadow-orange-600/20">
              <Store className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 mb-2">
              Retirada no Balcão
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed mb-3">
              Confirme a peça pelo WhatsApp e retire no balcão com estacionamento próprio em até 15 minutos.
            </p>
            <div className="text-[11px] font-bold text-orange-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Sem taxa de manuseio
            </div>
          </div>

          {/* Box 2 */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center mb-4 shadow-md">
              <Truck className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 mb-2">
              Entrega via Motoboy
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed mb-3">
              Entregas expressas para oficinas e residências em toda a região metropolitana no mesmo dia.
            </p>
            <div className="text-[11px] font-bold text-orange-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Despacho em até 2 horas
            </div>
          </div>

          {/* Box 3 */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-orange-600 text-white rounded-xl flex items-center justify-center mb-4 shadow-md shadow-orange-600/20">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 mb-2">
              Garantia de Encaixe
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed mb-3">
              Conferimos a compatibilidade pelo chassi (VIN) do seu veículo antes de despachar.
            </p>
            <div className="text-[11px] font-bold text-orange-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Troca fácil e rápida
            </div>
          </div>

          {/* Box 4 */}
          <div className="bg-white p-6 rounded-2xl border border-neutral-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="w-12 h-12 bg-neutral-900 text-white rounded-xl flex items-center justify-center mb-4 shadow-md">
              <Building2 className="w-6 h-6 text-orange-400" />
            </div>
            <h3 className="text-base font-bold text-neutral-900 mb-2">
              Atendimento Frotas / CNPJ
            </h3>
            <p className="text-xs text-neutral-500 leading-relaxed mb-3">
              Condições especiais para oficinas e frotas de empresas com faturamento faturado via boleto.
            </p>
            <div className="text-[11px] font-bold text-orange-600 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Descontos progressivos
            </div>
          </div>
        </div>

        {/* Location & Hours Card */}
        <div className="bg-neutral-900 text-white rounded-3xl p-6 lg:p-8 shadow-2xl border border-neutral-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="inline-flex items-center gap-2 text-orange-400 font-extrabold text-xs uppercase tracking-widest">
              <MapPin className="w-4 h-4" /> LOCALIZAÇÃO & HORÁRIOS
            </div>

            <h3 className="text-2xl font-black text-white tracking-tight">
              TURBO PEÇAS - Unidade Matriz
            </h3>

            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed">
              {STORE_ADDRESS}. Estacionamento amplo para clientes no local com balcão de atendimento e testes de bateria na hora.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="bg-neutral-800/80 p-3.5 rounded-2xl border border-neutral-700 flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Horário Semanal</div>
                  <div className="text-xs font-bold text-white">Segunda a Sexta: 08h às 18h</div>
                </div>
              </div>

              <div className="bg-neutral-800/80 p-3.5 rounded-2xl border border-neutral-700 flex items-center gap-3">
                <Clock className="w-5 h-5 text-orange-400 shrink-0" />
                <div>
                  <div className="text-[10px] text-neutral-400 uppercase font-bold tracking-wider">Horário de Sábado</div>
                  <div className="text-xs font-bold text-white">Sábados: 08h às 13h</div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex flex-wrap gap-3">
              <a
                href={generateGeneralInquiryWhatsAppLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs rounded-full shadow-lg shadow-orange-600/30 transition-all flex items-center gap-2 uppercase tracking-wide"
              >
                <PhoneCall className="w-4 h-4" /> WhatsApp do Balcão
              </a>
            </div>
          </div>

          {/* Payment methods list */}
          <div className="lg:col-span-5 bg-neutral-800/90 p-6 rounded-2xl border border-neutral-700 space-y-4">
            <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-orange-400" /> Formas de Pagamento
            </h4>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-center justify-between bg-neutral-900 p-3 rounded-xl border border-neutral-700">
                <span className="flex items-center gap-2 font-bold text-emerald-400">
                  <QrCode className="w-4 h-4" /> Pix à Vista
                </span>
                <span className="text-[10px] bg-emerald-950 text-emerald-400 font-black px-2.5 py-0.5 rounded-full border border-emerald-800">
                  5% OFF
                </span>
              </div>

              <div className="flex items-center justify-between bg-neutral-900 p-3 rounded-xl border border-neutral-700">
                <span className="flex items-center gap-2 font-bold text-neutral-200">
                  <CreditCard className="w-4 h-4 text-orange-400" /> Cartão de Crédito
                </span>
                <span className="text-neutral-400 text-[11px] font-semibold">Até 12x Sem Juros</span>
              </div>

              <div className="flex items-center justify-between bg-neutral-900 p-3 rounded-xl border border-neutral-700">
                <span className="flex items-center gap-2 font-bold text-neutral-200">
                  <Building2 className="w-4 h-4 text-orange-400" /> Faturamento CNPJ
                </span>
                <span className="text-neutral-400 text-[11px] font-semibold">Boleto para Oficinas</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
