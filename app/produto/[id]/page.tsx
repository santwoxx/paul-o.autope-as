import { PRODUCTS } from '@/data/products';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { ArrowLeft, CheckCircle2, Shield, Truck } from 'lucide-react';

// For static site generation (since products are static)
export function generateStaticParams() {
  return PRODUCTS.map((product) => ({
    id: product.id,
  }));
}

// Generate SEO Metadata dynamically for each product
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id);
  
  if (!product) {
    return {
      title: 'Produto não encontrado - Loja do Paulão',
    };
  }

  return {
    title: `${product.name} | Loja do Paulão Autopeças`,
    description: product.description,
    openGraph: {
      title: product.name,
      description: product.description,
      images: [
        {
          url: product.mainImage,
          width: 800,
          height: 600,
          alt: product.name,
        },
      ],
      siteName: 'Loja do Paulão Autopeças',
      locale: 'pt_BR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: product.name,
      description: product.description,
      images: [product.mainImage],
    },
  };
}

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const product = PRODUCTS.find((p) => p.id === resolvedParams.id);

  if (!product) {
    notFound();
  }

  // Generate JSON-LD Structured Data for Google Rich Snippets
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    image: `https://paul-o.autope-as.vercel.app${product.mainImage}`, // Adjust domain if needed
    description: product.description,
    sku: product.code,
    mpn: product.code,
    brand: {
      '@type': 'Brand',
      name: product.brand,
    },
    offers: {
      '@type': 'Offer',
      url: `https://paul-o.autope-as.vercel.app/produto/${product.id}`,
      priceCurrency: 'BRL',
      price: product.price,
      priceValidUntil: '2027-12-31',
      itemCondition: 'https://schema.org/NewCondition',
      availability: product.stockCount > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      seller: {
        '@type': 'Organization',
        name: 'Loja do Paulão Autopeças'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewsCount,
    },
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Inject JSON-LD in the head */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Simplified Header for inner pages */}
      <header className="bg-slate-900 text-white p-4 sticky top-0 z-40 shadow-md">
        <div className="max-w-7xl mx-auto flex items-center gap-4">
          <Link href="/" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-semibold hidden sm:inline">Voltar para a Loja</span>
          </Link>
          <div className="flex-1 text-center font-bold text-lg md:text-xl text-orange-500 tracking-tight">
            AUTOPEÇAS DO PAULÃO
          </div>
          <div className="w-5 sm:w-[130px]" /> {/* Spacer for balance */}
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <div className="grid md:grid-cols-2 gap-8 p-6 md:p-10">
            
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="aspect-square bg-slate-50 rounded-xl overflow-hidden relative flex items-center justify-center p-8 border border-slate-100 group">
                <img
                  src={product.mainImage}
                  alt={product.name}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                />
                {product.isWeeklyOffer && (
                  <div className="absolute top-4 right-4 bg-orange-600 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-lg">
                    Oferta
                  </div>
                )}
              </div>
              {product.stockPhotos && product.stockPhotos.length > 0 && (
                <div className="grid grid-cols-4 gap-2">
                  {product.stockPhotos.map((photo, idx) => (
                    <div key={idx} className="aspect-square bg-slate-50 rounded-lg overflow-hidden border border-slate-200 p-2 cursor-pointer hover:border-orange-400 transition-colors">
                      <img src={photo.url} alt={`Detalhe ${idx+1}`} className="w-full h-full object-contain" />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col">
              <div className="mb-2 flex items-center gap-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest bg-slate-100 px-2 py-1 rounded">
                  {product.brand}
                </span>
                <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest bg-emerald-50 px-2 py-1 rounded flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3" /> Em Estoque
                </span>
              </div>
              
              <h1 className="text-2xl md:text-4xl font-black text-slate-800 mb-2 leading-tight">
                {product.name}
              </h1>
              
              <p className="text-sm text-slate-500 mb-6 font-mono bg-slate-50 px-3 py-1.5 rounded-md inline-block border border-slate-100">
                Cód: {product.code}
              </p>

              <div className="mb-8">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl md:text-5xl font-black text-orange-600">
                    {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.price)}
                  </span>
                  {product.oldPrice && (
                    <span className="text-lg md:text-xl text-slate-400 line-through font-semibold">
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(product.oldPrice)}
                    </span>
                  )}
                </div>
                <p className="text-sm text-emerald-600 font-semibold mt-2">
                  10% de desconto via Pix ou Dinheiro
                </p>
              </div>

              <div className="space-y-4 mb-8">
                <p className="text-slate-600 leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Specs */}
              <div className="bg-slate-50 rounded-xl p-5 border border-slate-100 mb-8">
                <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-slate-400" /> Especificações Técnicas
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 text-sm">
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span className="text-slate-500">Garantia</span>
                    <span className="font-semibold text-slate-800">{product.warrantyMonths} Meses</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-1">
                    <span className="text-slate-500">Condição</span>
                    <span className="font-semibold text-slate-800">{product.condition}</span>
                  </div>
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-slate-200 pb-1">
                      <span className="text-slate-500">{key}</span>
                      <span className="font-semibold text-slate-800 text-right">{value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="mt-auto pt-6 border-t border-slate-100">
                <a 
                  href={`https://wa.me/5573981837147?text=Ol%C3%A1%2C%20tenho%20interesse%20na%20pe%C3%A7a%3A%0A%0A*${encodeURIComponent(product.name)}*%0A(C%C3%B3d%3A%20${product.code})%0A%0AVi%20no%20site%20e%20gostaria%20de%20verificar%20a%20disponibilidade.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white text-lg font-bold py-4 px-8 rounded-xl flex items-center justify-center gap-3 transition-transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-emerald-200"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
                  </svg>
                  Consultar com Vendedor
                </a>
                <p className="text-center text-xs text-slate-400 mt-4 font-medium flex justify-center items-center gap-1">
                  <Truck className="w-4 h-4" /> Entrega grátis em toda Itabuna
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
