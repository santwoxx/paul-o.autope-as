'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Clock, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState(10788); // 02:59:48
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return { h, m, s };
  };

  const { h, m, s } = formatTime(timeLeft);

  return (
    <div className="min-h-screen bg-black text-white font-sans selection:bg-emerald-500 selection:text-white">
      
      {/* Hero Section / Aba com Vídeo */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-20 pb-24 overflow-hidden border-b border-white/10">
        {/* Video Background */}
        <div className="absolute inset-0 w-full h-full z-0">
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black z-10" />
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-60 scale-105"
          >
            {/* Generic tech/abstract background video for placeholder */}
            <source src="https://cdn.pixabay.com/video/2020/05/18/40061-424843924_tiny.mp4" type="video/mp4" />
          </video>
        </div>

        <div className="relative z-20 w-full max-w-5xl mx-auto px-4 flex flex-col items-center">
          
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 px-5 py-2 rounded-full font-bold tracking-widest text-sm uppercase mb-8 shadow-[0_0_20px_rgba(239,68,68,0.2)]"
          >
            <AlertTriangle className="w-4 h-4 animate-pulse" />
            ⚠️ OFERTA POR TEMPO LIMITADO
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-center leading-[1.1] mb-8"
          >
            Sites que você vende por <br className="hidden md:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-emerald-300 to-cyan-400">
              R$ 700 a R$ 1.500
            </span>
            <br className="hidden md:block"/>
            {' '}Prontos em 10 Minutos
          </motion.h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-lg md:text-2xl text-gray-300 text-center max-w-3xl mb-12 leading-relaxed"
          >
            Receba 10 prompts testados que geram sites modernos, profissionais e prontos para personalizar no ChatGPT, Claude, Lovable e outras IAs. <span className="text-white font-semibold">Economize horas de trabalho:</span> você cola o prompt, a IA monta o site e você entrega ao cliente cobrando o valor cheio.
          </motion.p>

          {/* Offer Card */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, type: "spring", stiffness: 100 }}
            className="w-full max-w-3xl bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 md:p-12 shadow-2xl relative overflow-hidden"
          >
            {/* Glow effect behind card */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-emerald-500/10 blur-[100px] -z-10" />

            <div className="flex flex-col items-center">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold tracking-widest uppercase mb-6 text-sm">
                <Clock className="w-4 h-4" />
                Promoção Válida Por
              </div>

              {/* Countdown Timer */}
              {mounted && (
                <div className="flex gap-4 md:gap-6 mb-10">
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center text-4xl md:text-6xl font-black text-white shadow-inner">
                      {h.toString().padStart(2, '0')}
                    </div>
                    <span className="text-xs md:text-sm text-gray-400 mt-3 font-medium uppercase tracking-wider">Horas</span>
                  </div>
                  <div className="text-4xl md:text-6xl font-black text-gray-600 mt-2 md:mt-4 animate-pulse">:</div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-black/40 border border-white/10 rounded-2xl flex items-center justify-center text-4xl md:text-6xl font-black text-white shadow-inner">
                      {m.toString().padStart(2, '0')}
                    </div>
                    <span className="text-xs md:text-sm text-gray-400 mt-3 font-medium uppercase tracking-wider">Min</span>
                  </div>
                  <div className="text-4xl md:text-6xl font-black text-gray-600 mt-2 md:mt-4 animate-pulse">:</div>
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-24 md:h-24 bg-black/40 border border-emerald-500/30 rounded-2xl flex items-center justify-center text-4xl md:text-6xl font-black text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                      {s.toString().padStart(2, '0')}
                    </div>
                    <span className="text-xs md:text-sm text-gray-400 mt-3 font-medium uppercase tracking-wider">Seg</span>
                  </div>
                </div>
              )}

              {/* Pricing */}
              <div className="flex flex-col items-center mb-8">
                <div className="text-gray-400 text-xl font-medium line-through decoration-red-500/80 decoration-2 mb-2">
                  De R$ 97,00
                </div>
                <div className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-400">
                  APENAS R$ 9,99
                </div>
              </div>

              {/* CTA Button */}
              <button className="group relative w-full md:w-auto bg-emerald-500 hover:bg-emerald-400 text-black font-black text-xl md:text-2xl py-5 px-10 rounded-2xl transition-all duration-300 transform hover:-translate-y-1 shadow-[0_0_40px_rgba(16,185,129,0.4)] hover:shadow-[0_0_60px_rgba(16,185,129,0.6)] flex items-center justify-center gap-3 overflow-hidden">
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                <Zap className="w-6 h-6 fill-current" />
                Liberação Imediata no Seu Email
              </button>

              {/* Guarantees / Features */}
              <div className="flex flex-col md:flex-row gap-6 mt-10 w-full justify-center items-center">
                <div className="flex items-center gap-2 text-gray-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Acesso Imediato</span>
                </div>
                <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                <div className="flex items-center gap-2 text-gray-300 font-medium">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                  <span>7 Dias de Garantia</span>
                </div>
                <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-600"></div>
                <div className="flex items-center gap-2 text-gray-300 font-medium">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Uso Ilimitado dos Prompts</span>
                </div>
              </div>

            </div>
          </motion.div>
        </div>
      </section>

      {/* Restante da página em fundo preto */}
      <section className="min-h-[50vh] bg-black flex items-center justify-center">
        {/* Você pode adicionar mais conteúdo aqui depois. O fundo já está preto. */}
      </section>

      {/* Tailwind Custom Animation for Button Shimmer */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
}
