'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { POPULAR_VEHICLES } from '@/data/vehicles';
import { generatePlateConsultationWhatsAppLink } from '@/lib/whatsapp';
import { Car, Check, MessageSquare, RefreshCw, Search, ShieldCheck, X } from 'lucide-react';

export interface VehicleSelection {
  brand: string;
  model: string;
  year: number | '';
  engine: string;
  licensePlate?: string;
}

interface VehicleSelectorProps {
  currentVehicle: VehicleSelection | null;
  onSelectVehicle: (vehicle: VehicleSelection | null) => void;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export default function VehicleSelector({
  currentVehicle,
  onSelectVehicle,
  isOpenModal,
  onCloseModal,
}: VehicleSelectorProps) {
  const [selectedBrand, setSelectedBrand] = useState<string>(currentVehicle?.brand || '');
  const [selectedModel, setSelectedModel] = useState<string>(currentVehicle?.model || '');
  const [selectedYear, setSelectedYear] = useState<number | ''>(currentVehicle?.year || '');
  const [selectedEngine, setSelectedEngine] = useState<string>(currentVehicle?.engine || '');
  const [licensePlate, setLicensePlate] = useState<string>(currentVehicle?.licensePlate || '');

  const currentBrandObj = POPULAR_VEHICLES.find((b) => b.name === selectedBrand);
  const availableModels = currentBrandObj ? currentBrandObj.models : [];
  const currentModelObj = availableModels.find((m) => m.name === selectedModel);
  const availableYears = currentModelObj ? currentModelObj.years : [];
  const availableEngines = currentModelObj ? currentModelObj.engines : [];

  const handleBrandChange = (brandName: string) => {
    setSelectedBrand(brandName);
    setSelectedModel('');
    setSelectedYear('');
    setSelectedEngine('');
  };

  const handleModelChange = (modelName: string) => {
    setSelectedModel(modelName);
    setSelectedYear('');
    setSelectedEngine('');
  };

  const handleApply = () => {
    if (!selectedBrand && !selectedModel && !licensePlate) return;
    const vehicle: VehicleSelection = {
      brand: selectedBrand,
      model: selectedModel,
      year: selectedYear,
      engine: selectedEngine,
      licensePlate: licensePlate.toUpperCase().trim(),
    };
    onSelectVehicle(vehicle);
    if (onCloseModal) onCloseModal();
  };

  const handleClear = () => {
    setSelectedBrand('');
    setSelectedModel('');
    setSelectedYear('');
    setSelectedEngine('');
    setLicensePlate('');
    onSelectVehicle(null);
    if (onCloseModal) onCloseModal();
  };

  // Pre-formatted WhatsApp link for quick license plate query
  const quickPlateWaUrl = licensePlate
    ? generatePlateConsultationWhatsAppLink(
        licensePlate,
        undefined,
        selectedBrand ? `${selectedBrand} ${selectedModel}` : undefined
      )
    : null;

  const content = (
    <div className="bg-white p-5 sm:p-6 rounded-3xl border border-orange-200/80 shadow-xl relative overflow-hidden">
      {/* Background visual element */}
      <div className="absolute -top-12 -right-12 w-32 h-32 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 border-b border-neutral-100 pb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-orange-600 flex items-center justify-center text-white font-bold shadow-md shadow-orange-600/20 shrink-0">
            <Car className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-black text-neutral-900 flex items-center gap-2">
              Selecione o Veículo ou Informe a Placa
            </h3>
            <p className="text-xs text-neutral-500 font-medium">
              Preparamos o seu orçamento exato com consulta no sistema do balcão
            </p>
          </div>
        </div>

        {currentVehicle && (
          <button
            onClick={handleClear}
            className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-orange-600 font-bold transition-colors bg-neutral-100 hover:bg-orange-50 px-3 py-1.5 rounded-xl self-start sm:self-center"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            Limpar Filtro
          </button>
        )}
      </div>

      {/* Plate / Chassis Fast Lead Bar */}
      <div className="bg-orange-50 border border-orange-200/80 rounded-2xl p-3.5 mb-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="px-3 py-1.5 bg-neutral-900 text-white font-mono font-black text-xs rounded-xl tracking-widest border border-neutral-700 shrink-0 shadow-sm">
            BRASIL / MERCOSUL
          </div>
          <div className="flex-1">
            <label className="block text-[11px] font-bold text-orange-950 uppercase tracking-wide">
              Placa do Veículo ou Chassi (VIN):
            </label>
            <input
              type="text"
              value={licensePlate}
              onChange={(e) => setLicensePlate(e.target.value.toUpperCase())}
              placeholder="EX: ABC1D23 ou ABC1234"
              className="w-full text-xs font-mono font-bold uppercase p-2 bg-white border border-orange-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-900 placeholder:normal-case placeholder:font-sans placeholder:text-neutral-400 mt-1"
            />
          </div>
        </div>

        {quickPlateWaUrl && (
          <a
            href={quickPlateWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-2 shrink-0 uppercase tracking-wide"
          >
            <MessageSquare className="w-4 h-4 fill-white text-emerald-600" />
            Consultar Placa no WhatsApp
          </a>
        )}
      </div>

      {/* Brand / Model / Year / Engine selectors */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-5">
        {/* Marca */}
        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Marca</label>
          <select
            value={selectedBrand}
            onChange={(e) => handleBrandChange(e.target.value)}
            className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white"
          >
            <option value="">Selecione a Marca...</option>
            {POPULAR_VEHICLES.map((b) => (
              <option key={b.name} value={b.name}>
                {b.name}
              </option>
            ))}
          </select>
        </div>

        {/* Modelo */}
        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Modelo</label>
          <select
            disabled={!selectedBrand}
            value={selectedModel}
            onChange={(e) => handleModelChange(e.target.value)}
            className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">
              {!selectedBrand ? 'Escolha a marca primeiro' : 'Selecione o Modelo...'}
            </option>
            {availableModels.map((m) => (
              <option key={m.name} value={m.name}>
                {m.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ano */}
        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Ano de Fabricação</label>
          <select
            disabled={!selectedModel}
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value ? Number(e.target.value) : '')}
            className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">
              {!selectedModel ? 'Escolha o modelo primeiro' : 'Todos os Anos'}
            </option>
            {availableYears.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </select>
        </div>

        {/* Motorização */}
        <div>
          <label className="block text-xs font-bold text-neutral-700 mb-1">Motor / Versão</label>
          <select
            disabled={!selectedModel}
            value={selectedEngine}
            onChange={(e) => setSelectedEngine(e.target.value)}
            className="w-full text-xs font-medium bg-neutral-50 border border-neutral-200 rounded-xl p-2.5 text-neutral-800 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <option value="">
              {!selectedModel ? 'Escolha o modelo primeiro' : 'Todas as Motorizações'}
            </option>
            {availableEngines.map((eng) => (
              <option key={eng} value={eng}>
                {eng}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-neutral-100">
        <div className="text-xs text-neutral-500 flex items-center gap-1.5 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
          <span>Atendente confirma compatibilidade exata no WhatsApp</span>
        </div>

        <button
          onClick={handleApply}
          disabled={!selectedBrand && !selectedModel && !licensePlate}
          className="w-full sm:w-auto px-6 py-3 bg-orange-600 hover:bg-orange-700 text-white font-black text-xs rounded-xl shadow-lg shadow-orange-600/20 transition-all flex items-center justify-center gap-2 uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Search className="w-4 h-4" />
          Filtrar Peças Compatíveis
        </button>
      </div>
    </div>
  );

  if (!isOpenModal) {
    return content;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0 bg-neutral-900/70 backdrop-blur-sm"
        onClick={onCloseModal}
      />
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-3xl z-10"
      >
        <button
          onClick={onCloseModal}
          className="absolute -top-10 right-0 text-white hover:text-orange-400 transition-colors p-1 font-bold flex items-center gap-1 text-xs"
        >
          <span>Fechar</span>
          <X className="w-6 h-6" />
        </button>
        {content}
      </motion.div>
    </div>
  );
}
