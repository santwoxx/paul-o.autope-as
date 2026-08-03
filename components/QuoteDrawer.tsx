'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { QuoteItem, generateCartWhatsAppLink, generateCartWhatsAppText, STORE_NAME, LeadDetails } from '@/lib/whatsapp';
import { VehicleSelection } from './VehicleSelector';
import {
  X,
  Trash2,
  Plus,
  Minus,
  MessageSquare,
  Car,
  ShoppingCart,
  Truck,
  Store,
  CheckCircle2,
  CreditCard,
  User,
  Eye,
  Camera,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';

interface QuoteDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: QuoteItem[];
  onUpdateQuantity: (productId: string, delta: number) => void;
  onRemoveItem: (productId: string) => void;
  onClearCart: () => void;
  currentVehicle: VehicleSelection | null;
  onOpenVehicleModal: () => void;
}

export default function QuoteDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  currentVehicle,
  onOpenVehicleModal,
}: QuoteDrawerProps) {
  const [customerName, setCustomerName] = useState<string>('');
  const [licensePlate, setLicensePlate] = useState<string>(currentVehicle?.licensePlate || '');
  const [deliveryMethod, setDeliveryMethod] = useState<'retirada' | 'entrega'>('retirada');
  const [paymentMethod, setPaymentMethod] = useState<string>('Pix à Vista (5% OFF)');
  const [requestPhoto, setRequestPhoto] = useState<boolean>(true);
  const [customNote, setCustomNote] = useState<string>('');
  const [showTextPreview, setShowTextPreview] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalEstimate = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);

  const leadDetails: LeadDetails = {
    customerName: customerName.trim(),
    licensePlate: licensePlate.trim().toUpperCase() || currentVehicle?.licensePlate,
    deliveryMethod,
    paymentMethod,
    requestPhoto,
    customNotes: customNote.trim(),
  };

  const whatsappMessageText = generateCartWhatsAppText(cartItems, currentVehicle, leadDetails);
  const whatsappUrl = generateCartWhatsAppLink(cartItems, currentVehicle, leadDetails);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-neutral-900/70 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-lg bg-white h-full shadow-2xl flex flex-col justify-between relative z-10"
          >
        {/* Drawer Header */}
        <div className="p-4 bg-neutral-900 text-white flex items-center justify-between border-b border-neutral-800">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-orange-600 flex items-center justify-center text-white font-black shadow-md shadow-orange-600/30">
              <ShoppingCart className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-black text-sm uppercase tracking-wide">Preparador de Orçamento WhatsApp</h3>
              <p className="text-[11px] text-orange-400 font-bold">
                {cartItems.length} {cartItems.length === 1 ? 'peça selecionada' : 'peças selecionadas'} • Atendimento Direto no Balcão
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-neutral-400 hover:text-white transition-colors p-1 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Cart Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {/* Active Vehicle & Plate Lead Banner */}
          <div className="bg-orange-50 border border-orange-200/80 p-3.5 rounded-2xl flex items-center justify-between text-xs shadow-sm">
            <div className="flex items-center gap-2.5 text-orange-950 font-bold overflow-hidden">
              <Car className="w-4 h-4 text-orange-600 shrink-0" />
              <div className="truncate">
                {currentVehicle ? (
                  <span className="font-bold">
                    {currentVehicle.brand} {currentVehicle.model} {currentVehicle.year ? `(${currentVehicle.year})` : ''}
                    {currentVehicle.licensePlate && ` • Placa: ${currentVehicle.licensePlate}`}
                  </span>
                ) : (
                  <span className="text-neutral-600 font-medium">Nenhum veículo selecionado</span>
                )}
              </div>
            </div>
            <button
              onClick={() => {
                onClose();
                onOpenVehicleModal();
              }}
              className="text-orange-700 hover:text-orange-900 underline font-black shrink-0 text-xs ml-2"
            >
              {currentVehicle ? 'Alterar' : '+ Adicionar'}
            </button>
          </div>

          {cartItems.length === 0 ? (
            <div className="text-center py-16 px-4 text-neutral-500">
              <div className="w-16 h-16 bg-neutral-100 rounded-3xl flex items-center justify-center mx-auto mb-4 text-neutral-400 border border-neutral-200">
                <ShoppingCart className="w-8 h-8" />
              </div>
              <p className="text-base font-black text-neutral-900 mb-1">Sua lista de peças está vazia</p>
              <p className="text-xs text-neutral-500 mb-6 max-w-xs mx-auto leading-relaxed">
                Navegue pelo catálogo e clique em "Adicionar ao Orçamento" nas peças desejadas para consolidar seu pedido no WhatsApp em 1 clique.
              </p>
              <button
                onClick={onClose}
                className="px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs rounded-full shadow-lg shadow-orange-600/30 transition-all uppercase tracking-wider"
              >
                Explorar Catálogo do Balcão
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {/* Items List */}
              <div className="space-y-2.5">
                <div className="text-xs font-black uppercase text-neutral-400 tracking-wider">
                  Itens Selecionados do Estoque
                </div>
                {cartItems.map((item) => (
                  <div
                    key={item.product.id}
                    className="bg-neutral-50 border border-neutral-200/80 rounded-2xl p-3 flex gap-3 relative group hover:border-orange-200 transition-colors"
                  >
                    <img
                      src={item.product.mainImage}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded-xl border border-neutral-200 bg-white shrink-0"
                    />

                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between text-[10px] text-neutral-500 font-mono">
                          <span>Cód OEM: {item.product.code}</span>
                          <span className="font-bold text-orange-600">{item.product.brand}</span>
                        </div>
                        <h4 className="text-xs font-bold text-neutral-900 line-clamp-1">
                          {item.product.name}
                        </h4>
                      </div>

                      <div className="flex items-center justify-between mt-2">
                        <div className="text-xs font-black text-orange-600">
                          R$ {(item.product.price * item.quantity).toFixed(2).replace('.', ',')}
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-1.5 bg-white border border-neutral-300 rounded-lg p-0.5">
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, -1)}
                            className="w-5 h-5 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="text-xs font-black w-4 text-center text-neutral-900">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.product.id, 1)}
                            className="w-5 h-5 flex items-center justify-center text-neutral-600 hover:bg-neutral-100 rounded"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Delete button */}
                    <button
                      onClick={() => onRemoveItem(item.product.id)}
                      className="text-neutral-400 hover:text-red-500 p-1 transition-colors"
                      title="Remover Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Lead Prep Section: Customer Data */}
              <div className="bg-neutral-900 text-white p-4 rounded-2xl space-y-3.5 border border-neutral-800">
                <div className="flex items-center justify-between border-b border-neutral-800 pb-2">
                  <span className="text-xs font-black uppercase tracking-wider text-orange-400 flex items-center gap-1.5">
                    <User className="w-4 h-4" /> Preencha para Agilizar o Atendimento
                  </span>
                  <span className="text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-800 px-2 py-0.5 rounded-full font-bold">
                    Direct WhatsApp
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Name */}
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-300 mb-1">Seu Nome / Oficina:</label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="Ex: Carlos (Auto Mecânica)"
                      className="w-full text-xs p-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>

                  {/* License Plate / Chassis */}
                  <div>
                    <label className="block text-[11px] font-bold text-neutral-300 mb-1">Placa do Veículo / Chassi:</label>
                    <input
                      type="text"
                      value={licensePlate}
                      onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
                      placeholder="Ex: ABC-1D23"
                      className="w-full text-xs font-mono uppercase font-bold p-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                </div>

                {/* Delivery Method Choice */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 mb-1">Como Prefere Receber / Retirar?</label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('retirada')}
                      className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 border transition-all ${
                        deliveryMethod === 'retirada'
                          ? 'bg-orange-600 text-white border-orange-500 shadow-sm'
                          : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-750'
                      }`}
                    >
                      <Store className="w-3.5 h-3.5" /> Retirar no Balcão
                    </button>

                    <button
                      type="button"
                      onClick={() => setDeliveryMethod('entrega')}
                      className={`py-2 px-3 rounded-xl font-bold flex items-center justify-center gap-1.5 border transition-all ${
                        deliveryMethod === 'entrega'
                          ? 'bg-orange-600 text-white border-orange-500 shadow-sm'
                          : 'bg-neutral-800 text-neutral-300 border-neutral-700 hover:bg-neutral-750'
                      }`}
                    >
                      <Truck className="w-3.5 h-3.5" /> Motoboy Express
                    </button>
                  </div>
                </div>

                {/* Payment Choice */}
                <div>
                  <label className="block text-[11px] font-bold text-neutral-300 mb-1">Forma de Pagamento Desejada:</label>
                  <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full text-xs bg-neutral-800 border border-neutral-700 rounded-xl p-2 text-white font-medium focus:outline-none focus:ring-2 focus:ring-orange-500"
                  >
                    <option value="Pix à Vista (5% OFF)">Pix à Vista (com 5% de desconto)</option>
                    <option value="Cartão de Crédito (até 12x)">Cartão de Crédito (até 12x)</option>
                    <option value="Boleto Faturado CNPJ (Oficina/Frota)">Boleto Faturado CNPJ (Oficina/Frota)</option>
                    <option value="Dinheiro no Balcão">Dinheiro na Retirada do Balcão</option>
                  </select>
                </div>

                {/* Photo Checkbox */}
                <label className="flex items-center gap-2 text-xs text-neutral-300 cursor-pointer pt-1">
                  <input
                    type="checkbox"
                    checked={requestPhoto}
                    onChange={(e) => setRequestPhoto(e.target.checked)}
                    className="rounded text-orange-600 focus:ring-orange-500 w-4 h-4 bg-neutral-800 border-neutral-700"
                  />
                  <span className="flex items-center gap-1 font-semibold">
                    <Camera className="w-3.5 h-3.5 text-orange-400" />
                    Quero foto real da peça gravada no estoque antes de fechar
                  </span>
                </label>

                {/* Optional Note */}
                <div>
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="Instruções adicionais (ex: preciso retirar até 17h)..."
                    className="w-full text-xs p-2 bg-neutral-800 border border-neutral-700 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  />
                </div>
              </div>

              {/* Message Text Preview Toggle */}
              <div className="bg-neutral-100 rounded-2xl p-3 border border-neutral-200">
                <button
                  onClick={() => setShowTextPreview(!showTextPreview)}
                  className="w-full flex items-center justify-between text-xs font-bold text-neutral-700"
                >
                  <span className="flex items-center gap-1.5">
                    <Eye className="w-4 h-4 text-orange-600" />
                    Ver prévia da mensagem formatada para o WhatsApp
                  </span>
                  {showTextPreview ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>

                {showTextPreview && (
                  <div className="mt-2.5 p-3 bg-white rounded-xl border border-neutral-300 text-[11px] font-mono whitespace-pre-wrap text-neutral-800 max-h-48 overflow-y-auto leading-relaxed shadow-inner">
                    {whatsappMessageText}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer */}
        {cartItems.length > 0 && (
          <div className="p-4 bg-neutral-50 border-t border-neutral-200 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div>
                <span className="font-bold text-neutral-500 text-xs block">Estimativa de Tabela:</span>
                <span className="text-xl font-black text-neutral-900">
                  R$ {totalEstimate.toFixed(2).replace('.', ',')}
                </span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-emerald-600 font-extrabold uppercase bg-emerald-100 px-2.5 py-1 rounded-full block">
                  5% OFF no Pix: R$ {(totalEstimate * 0.95).toFixed(2).replace('.', ',')}
                </span>
              </div>
            </div>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm rounded-full shadow-lg shadow-emerald-600/30 transition-all flex items-center justify-center gap-2.5 uppercase tracking-wide border border-emerald-400/30"
            >
              <MessageSquare className="w-5 h-5 fill-white text-emerald-600" />
              Enviar Orçamento pelo WhatsApp
            </a>

            <div className="flex items-center justify-between text-[10px] text-neutral-500 font-bold uppercase tracking-wider">
              <span className="flex items-center gap-1 text-emerald-600">
                <ShieldCheck className="w-3.5 h-3.5" /> Atendimento no Balcão em ~3 min
              </span>
              <button
                onClick={onClearCart}
                className="text-neutral-400 hover:text-red-600 underline"
              >
                Esvaziar Lista
              </button>
            </div>
          </div>
        )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
