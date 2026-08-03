export interface StockPhoto {
  url: string;
  caption: string;
}

export interface AutoPart {
  id: string;
  name: string;
  code: string; // OEM / SKU Code
  brand: string; // E.g., Bosch, Cofap, Fras-le
  category: string; // category id
  price: number;
  oldPrice?: number;
  isWeeklyOffer?: boolean;
  offerEndsInHours?: number;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  warrantyMonths: number;
  condition: 'Novo Original' | 'Paralelo Primeira Linha' | 'Remanufaturado Certificado';
  mainImage: string;
  stockPhotos: StockPhoto[];
  compatibleBrands: string[];
  compatibleModels: string[];
  compatibleEngines?: string[];
  yearStart?: number;
  yearEnd?: number;
  description: string;
  specifications: Record<string, string>;
  shelfLocation?: string; // Local no Estoque e.g., "Corredor B - Prateleira 04"
}

export const PRODUCTS: AutoPart[] = [
  {
    id: 'part-01',
    name: 'Óleo Lubrax Top Auto Semissintético 15W-40 API SN 1L',
    code: 'LUBRAX-TOPAUTO-15W40',
    brand: 'Lubrax',
    category: 'oleos',
    price: 40.00,
    oldPrice: 48.00,
    isWeeklyOffer: true,
    offerEndsInHours: 48,
    stockCount: 15,
    rating: 4.8,
    reviewsCount: 42,
    warrantyMonths: 3,
    condition: 'Novo Original',
    mainImage: '/images/products/lubrax-15w40.png',
    stockPhotos: [
      {
        url: '/images/products/lubrax-15w40.png',
        caption: 'Foto real do produto Lubrax no estoque',
      }
    ],
    compatibleBrands: ['Chevrolet', 'Volkswagen', 'Fiat', 'Ford'],
    compatibleModels: ['Onix', 'Gol', 'Palio', 'Ka'],
    yearStart: 2005,
    yearEnd: 2024,
    description: 'Óleo lubrificante semissintético multiviscoso recomendado para motores a gasolina, etanol, flex e GNV. Garante máxima proteção contra formação de borras e desgaste.',
    specifications: {
      'Viscosidade': '15W-40',
      'Classificação API': 'SN',
      'Tipo': 'Semissintético',
      'Volume': '1 Litro',
    },
    shelfLocation: 'Corredor O - Prateleira 2',
  },
  {
    id: 'part-02',
    name: 'Óleo Lubel Moura para Motores 15W-40 Semissintético API SL 1L',
    code: 'LUBEL-MOURA-15W40',
    brand: 'Moura',
    category: 'oleos',
    price: 37.00,
    oldPrice: 45.00,
    isWeeklyOffer: true,
    offerEndsInHours: 72,
    stockCount: 22,
    rating: 4.9,
    reviewsCount: 35,
    warrantyMonths: 3,
    condition: 'Novo Original',
    mainImage: '/images/products/lubel-moura-15w40.png',
    stockPhotos: [
      {
        url: '/images/products/lubel-moura-15w40.png',
        caption: 'Foto real do produto Lubel Moura no estoque',
      }
    ],
    compatibleBrands: ['Chevrolet', 'Volkswagen', 'Fiat', 'Ford', 'Renault'],
    compatibleModels: ['Onix', 'Gol', 'Palio', 'Ka', 'Kwid'],
    yearStart: 2000,
    yearEnd: 2024,
    description: 'Óleo lubrificante semissintético ideal para proteção do motor no trânsito diário. Proporciona maior durabilidade das peças móveis e economia de combustível.',
    specifications: {
      'Viscosidade': '15W-40',
      'Classificação API': 'SL',
      'Tipo': 'Semissintético',
      'Volume': '1 Litro',
    },
    shelfLocation: 'Corredor O - Prateleira 3',
  },
  {
    id: 'part-03',
    name: 'Óleo Dulub Power Basic Semissintético 15W-40 API SP 1L',
    code: 'DULUB-POWER-15W40',
    brand: 'Dulub',
    category: 'oleos',
    price: 34.00,
    oldPrice: 42.00,
    isWeeklyOffer: true,
    offerEndsInHours: 72,
    stockCount: 18,
    rating: 4.8,
    reviewsCount: 25,
    warrantyMonths: 3,
    condition: 'Novo Original',
    mainImage: '/images/products/dulub-15w40.jpg',
    stockPhotos: [
      {
        url: '/images/products/dulub-15w40.jpg',
        caption: 'Foto real do produto Dulub no estoque',
      }
    ],
    compatibleBrands: ['Chevrolet', 'Volkswagen', 'Fiat', 'Ford', 'Renault'],
    compatibleModels: ['Onix', 'Gol', 'Palio', 'Ka', 'Kwid'],
    yearStart: 2000,
    yearEnd: 2024,
    description: 'Óleo lubrificante semissintético ideal para proteção do motor. Adequado para motores a Gasolina, Etanol, Flex, GNV e Híbridos. Proporciona maior durabilidade das peças móveis e economia de combustível.',
    specifications: {
      'Viscosidade': '15W-40',
      'Classificação API': 'SP',
      'Tipo': 'Semissintético',
      'Volume': '1 Litro',
    },
    shelfLocation: 'Corredor O - Prateleira 4',
  }
];
