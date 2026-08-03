'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Send, Car, Wrench, MessageCircleQuestion, ShieldCheck } from 'lucide-react';
import {
  generatePlateConsultationWhatsAppLink,
  generateGeneralInquiryWhatsAppLink,
  STORE_WHATSAPP_NUMBER,
} from '@/lib/whatsapp';

type ChatStep = 'idle' | 'greeting' | 'options' | 'plate' | 'oem' | 'general' | 'finish';

export default function PaulinhoBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<ChatStep>('idle');
  
  // Forms state
  const [inputValue, setInputValue] = useState('');
  const [customerName, setCustomerName] = useState('');
  
  useEffect(() => {
    if (isOpen && step === 'idle') {
      setStep('greeting');
      setTimeout(() => {
        setStep('options');
      }, 1500);
    }
  }, [isOpen, step]);

  const handleOpen = () => {
    setIsOpen(true);
    if (step === 'finish') {
      setStep('options');
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  const resetForm = () => {
    setInputValue('');
    setCustomerName('');
    setStep('options');
  };

  const submitAction = () => {
    if (!inputValue.trim()) return;

    let link = '';
    if (step === 'plate') {
      link = generatePlateConsultationWhatsAppLink(inputValue, customerName, 'Peças Gerais');
    } else if (step === 'oem') {
      const text = `👋 *CONSULTA DE CÓDIGO OEM*\n\n👤 *Cliente:* ${customerName || 'Amigo'}\n⚙️ *Peça/Código:* ${inputValue}\n\nOlá Paulinho! Pode verificar se tem no balcão?`;
      link = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    } else if (step === 'general') {
      const text = `👋 *DÚVIDA NO BALCÃO*\n\n👤 *Cliente:* ${customerName || 'Amigo'}\n📝 *Mensagem:* ${inputValue}\n\nOlá Paulinho! Gostaria de uma ajuda.`;
      link = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
    }

    if (link) {
      window.open(link, '_blank');
      setStep('finish');
    }
  };

  return (
    <div className="fixed bottom-20 md:bottom-6 right-4 z-50 flex flex-col items-end">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="mb-4 w-[calc(100vw-2rem)] sm:w-[380px] max-w-full bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden flex flex-col mx-2 sm:mx-0"
          >
            {/* Header */}
            <div className="bg-neutral-900 text-white p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-orange-600 overflow-hidden border-2 border-orange-500">
                    <img src="/images/paulinho.png" alt="Paulinho" className="w-full h-full object-cover" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-neutral-900 rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-black text-sm uppercase tracking-tight">Paulinho</h3>
                  <p className="text-[10px] text-emerald-400 font-bold">Consultor Online</p>
                </div>
              </div>
              <button onClick={handleClose} className="text-neutral-400 hover:text-white transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Area */}
            <div className="p-4 bg-slate-50 h-[320px] overflow-y-auto flex flex-col gap-3">
              <div className="flex items-start gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-1">
                  <img src="/images/paulinho.png" alt="Paulinho" className="w-full h-full object-cover" />
                </div>
                <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-neutral-100 text-xs text-neutral-800 font-medium">
                  Olá! Sou o Paulinho, seu consultor na TurboPeças.<br/><br/>Temos tudo para o seu carro, <strong>exceto pneus</strong>.
                </div>
              </div>

              {(step === 'options' || step === 'plate' || step === 'oem' || step === 'general' || step === 'finish') && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-1">
                    <img src="/images/paulinho.png" alt="Paulinho" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-neutral-100 text-xs text-neutral-800 font-medium">
                    Como posso te ajudar hoje para agilizarmos seu orçamento no balcão?
                  </div>
                </motion.div>
              )}

              {step === 'options' && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex flex-col gap-2 mt-2 ml-10"
                >
                  <button onClick={() => setStep('plate')} className="bg-orange-100 hover:bg-orange-200 text-orange-900 text-xs font-bold py-2.5 px-4 rounded-xl text-left flex items-center gap-2 transition border border-orange-200">
                    <Car className="w-4 h-4" /> Buscar Peça pela Placa
                  </button>
                  <button onClick={() => setStep('oem')} className="bg-orange-100 hover:bg-orange-200 text-orange-900 text-xs font-bold py-2.5 px-4 rounded-xl text-left flex items-center gap-2 transition border border-orange-200">
                    <Wrench className="w-4 h-4" /> Tenho o Código OEM
                  </button>
                  <button onClick={() => setStep('general')} className="bg-emerald-50 hover:bg-emerald-100 text-emerald-900 text-xs font-bold py-2.5 px-4 rounded-xl text-left flex items-center gap-2 transition border border-emerald-200">
                    <MessageCircleQuestion className="w-4 h-4" /> Tenho outra Dúvida
                  </button>
                </motion.div>
              )}

              {(step === 'plate' || step === 'oem' || step === 'general') && (
                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="ml-auto bg-neutral-900 text-white p-3 rounded-2xl rounded-tr-sm text-xs font-medium max-w-[80%]"
                >
                  {step === 'plate' && 'Quero buscar pela placa.'}
                  {step === 'oem' && 'Tenho o código da peça.'}
                  {step === 'general' && 'Tenho uma dúvida.'}
                </motion.div>
              )}

              {(step === 'plate' || step === 'oem' || step === 'general') && (
                <motion.div
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-start gap-2"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 mt-1">
                    <img src="/images/paulinho.png" alt="Paulinho" className="w-full h-full object-cover" />
                  </div>
                  <div className="bg-white p-3 rounded-2xl rounded-tl-sm shadow-sm border border-neutral-100 text-xs text-neutral-800 font-medium w-full">
                    <p className="mb-3">
                      {step === 'plate' && 'Perfeito! Qual a placa do veículo e o seu nome?'}
                      {step === 'oem' && 'Maravilha! Digite o código OEM e seu nome.'}
                      {step === 'general' && 'Claro! Qual seu nome e como posso ajudar?'}
                    </p>
                    
                    <div className="space-y-2">
                      <input
                        type="text"
                        placeholder="Seu Nome (opcional)"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500"
                      />
                      <input
                        type="text"
                        placeholder={
                          step === 'plate' ? "Ex: ABC1D23" :
                          step === 'oem' ? "Ex: 0281002593" : "Sua dúvida..."
                        }
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className={`w-full text-xs p-2.5 bg-neutral-50 border border-neutral-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-orange-500 ${step === 'plate' ? 'uppercase' : ''}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') submitAction();
                        }}
                      />
                      <div className="flex gap-2 pt-2">
                        <button onClick={resetForm} className="flex-1 py-2 text-[10px] font-bold text-neutral-500 hover:text-neutral-700 bg-neutral-100 rounded-lg">
                          Voltar
                        </button>
                        <button
                          onClick={submitAction}
                          disabled={!inputValue.trim()}
                          className="flex-[2] py-2 bg-orange-600 disabled:bg-orange-300 text-white text-[11px] font-black uppercase rounded-lg shadow-sm flex items-center justify-center gap-1 transition"
                        >
                          <Send className="w-3 h-3" /> Enviar
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {step === 'finish' && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl flex flex-col items-center justify-center text-center gap-2 mt-4"
                >
                  <ShieldCheck className="w-8 h-8 text-emerald-600" />
                  <p className="text-xs font-bold text-emerald-900">
                    Aguardando você no WhatsApp!
                  </p>
                  <button onClick={resetForm} className="text-[10px] text-emerald-700 underline mt-1">
                    Fazer nova consulta
                  </button>
                </motion.div>
              )}
            </div>
            
            <div className="bg-white border-t border-neutral-100 py-2 text-center">
              <span className="text-[9px] font-bold text-neutral-400 uppercase tracking-wider">Atendimento Seguro - TurboPeças</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleOpen}
        className={`relative flex items-center bg-white border-2 border-orange-500 p-1.5 rounded-full shadow-2xl transition-all ${isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
      >
        <div className="flex items-center gap-3 pr-4 pl-1">
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm bg-orange-100">
            <img src="/images/paulinho.png" alt="Paulinho" className="w-full h-full object-cover" />
            <span className="absolute top-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-white rounded-full animate-pulse"></span>
          </div>
          <div className="flex flex-col items-start">
            <span className="text-xs font-black text-neutral-900 uppercase">Paulinho</span>
            <span className="text-[10px] font-bold text-emerald-600">Fale comigo no Zap!</span>
          </div>
        </div>
      </motion.button>
    </div>
  );
}
