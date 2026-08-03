'use client';

import React, { useState, useEffect } from 'react';
import { PRODUCTS, AutoPart } from '@/data/products';
import { QuoteItem } from '@/lib/whatsapp';
import Header from '@/components/Header';
import HeroBanner from '@/components/HeroBanner';
import WeeklyOffers from '@/components/WeeklyOffers';
import CategoryGrid from '@/components/CategoryGrid';
import ProductGrid from '@/components/ProductGrid';
import VehicleSelector, { VehicleSelection } from '@/components/VehicleSelector';
import StockPhotoModal from '@/components/StockPhotoModal';
import QuoteDrawer from '@/components/QuoteDrawer';
import MobileNav from '@/components/MobileNav';
import StoreInfo from '@/components/StoreInfo';
import Footer from '@/components/Footer';
import PaulinhoBot from '@/components/PaulinhoBot';
import { CheckCircle2, ShoppingCart, X } from 'lucide-react';

export default function HomePage() {
  const [currentVehicle, setCurrentVehicle] = useState<VehicleSelection | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<QuoteItem[]>([]);
  const [isVehicleModalOpen, setIsVehicleModalOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState<AutoPart | null>(null);

  // Toast notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Load saved state from LocalStorage on mount
  useEffect(() => {
    try {
      const savedVehicle = localStorage.getItem('autopecas_vehicle');
      if (savedVehicle) {
        setCurrentVehicle(JSON.parse(savedVehicle));
      }
      const savedCart = localStorage.getItem('autopecas_quote_cart');
      if (savedCart) {
        setCartItems(JSON.parse(savedCart));
      }
    } catch (err) {
      console.error('Error loading saved state:', err);
    }
  }, []);

  // Save vehicle selection
  const handleSelectVehicle = (vehicle: VehicleSelection | null) => {
    setCurrentVehicle(vehicle);
    try {
      if (vehicle) {
        localStorage.setItem('autopecas_vehicle', JSON.stringify(vehicle));
        showToast(`Veículo ${vehicle.brand} ${vehicle.model} selecionado! Exibindo peças compatíveis.`);
      } else {
        localStorage.removeItem('autopecas_vehicle');
        showToast('Filtro por veículo removido.');
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Add product to quote basket
  const handleAddToCart = (product: AutoPart) => {
    setCartItems((prev) => {
      const existing = prev.find((i) => i.product.id === product.id);
      let updated: QuoteItem[];
      if (existing) {
        updated = prev.map((i) =>
          i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        updated = [...prev, { product, quantity: 1 }];
      }
      try {
        localStorage.setItem('autopecas_quote_cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });

    showToast(`"${product.name.slice(0, 32)}..." adicionado ao orçamento!`);
  };

  // Update quantity in basket
  const handleUpdateCartQuantity = (productId: string, delta: number) => {
    setCartItems((prev) => {
      const updated = prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as QuoteItem[];

      try {
        localStorage.setItem('autopecas_quote_cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Remove single item
  const handleRemoveCartItem = (productId: string) => {
    setCartItems((prev) => {
      const updated = prev.filter((i) => i.product.id !== productId);
      try {
        localStorage.setItem('autopecas_quote_cart', JSON.stringify(updated));
      } catch (e) {
        console.error(e);
      }
      return updated;
    });
  };

  // Clear entire cart
  const handleClearCart = () => {
    setCartItems([]);
    try {
      localStorage.removeItem('autopecas_quote_cart');
    } catch (e) {
      console.error(e);
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3500);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToCategories = () => {
    const el = document.getElementById('categorias-section');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 selection:bg-orange-500 selection:text-white pb-16 md:pb-0">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-20 right-4 z-50 bg-slate-900 text-white text-xs font-bold px-4 py-3 rounded-2xl shadow-2xl border border-orange-500/50 flex items-center gap-2.5 animate-in slide-in-from-top-4 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span>{toastMessage}</span>
          <button onClick={() => setToastMessage(null)} className="ml-2 text-slate-400 hover:text-white">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Main Site Header */}
      <Header
        currentVehicle={currentVehicle}
        onOpenVehicleModal={() => setIsVehicleModalOpen(true)}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Content Area */}
      <main>
        {/* Hero Banner */}
        <HeroBanner
          currentVehicle={currentVehicle}
          onOpenVehicleModal={() => setIsVehicleModalOpen(true)}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        {/* Vehicle Selector Bar on page for easy access */}
        <div className="max-w-7xl mx-auto px-4 -mt-6 relative z-20 mb-4">
          <VehicleSelector
            currentVehicle={currentVehicle}
            onSelectVehicle={handleSelectVehicle}
          />
        </div>

        {/* Weekly Offers Highlight Section */}
        <WeeklyOffers
          products={PRODUCTS}
          onOpenStockModal={(prod) => setSelectedProductForModal(prod)}
          onAddToCart={handleAddToCart}
          currentVehicle={currentVehicle}
        />

        {/* Categories Bar */}
        <CategoryGrid
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />

        {/* Product Grid */}
        <ProductGrid
          products={PRODUCTS}
          selectedCategory={selectedCategory}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          currentVehicle={currentVehicle}
          onOpenVehicleModal={() => setIsVehicleModalOpen(true)}
          onOpenStockModal={(prod) => setSelectedProductForModal(prod)}
          onAddToCart={handleAddToCart}
        />

        {/* Store Physical Info */}
        <StoreInfo />
      </main>

      {/* Footer */}
      <Footer />

      {/* Floating Action WhatsApp Button */}
      <PaulinhoBot />

      {/* Mobile Bottom Navigation */}
      <MobileNav
        currentVehicle={currentVehicle}
        onOpenVehicleModal={() => setIsVehicleModalOpen(true)}
        onOpenCategories={scrollToCategories}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onScrollToTop={scrollToTop}
      />

      {/* Vehicle Selection Modal */}
      {isVehicleModalOpen && (
        <VehicleSelector
          currentVehicle={currentVehicle}
          onSelectVehicle={handleSelectVehicle}
          isOpenModal={true}
          onCloseModal={() => setIsVehicleModalOpen(false)}
        />
      )}

      {/* Real Stock Photos & Technical Modal */}
      <StockPhotoModal
        product={selectedProductForModal}
        onClose={() => setSelectedProductForModal(null)}
        onAddToCart={handleAddToCart}
        currentVehicle={currentVehicle}
      />

      {/* Quote Drawer */}
      <QuoteDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        currentVehicle={currentVehicle}
        onOpenVehicleModal={() => setIsVehicleModalOpen(true)}
      />
    </div>
  );
}
