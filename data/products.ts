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
  },
  {
    id: 'part-04',
    name: 'Terminal Axial Nakata N-96028',
    code: 'N-96028',
    brand: 'Nakata',
    category: 'suspensao',
    price: 75.00,
    oldPrice: 90.00,
    isWeeklyOffer: false,
    stockCount: 12,
    rating: 4.9,
    reviewsCount: 14,
    warrantyMonths: 6,
    condition: 'Novo Original',
    mainImage: '/images/products/nakata-n96028.png',
    stockPhotos: [
      {
        url: '/images/products/nakata-n96028.png',
        caption: 'Foto real do produto Nakata no estoque',
      }
    ],
    compatibleBrands: ['Volkswagen', 'Ford', 'Chevrolet', 'Fiat'],
    compatibleModels: ['Gol', 'Fox', 'Palio', 'Onix'],
    yearStart: 2005,
    yearEnd: 2024,
    description: 'Terminal axial de direção Nakata de alta qualidade, garantindo maior durabilidade e estabilidade na condução do veículo.',
    specifications: {
      'Posição': 'Direção',
      'Lado': 'Esquerdo/Direito',
      'Tipo': 'Articulação Axial',
    },
    shelfLocation: 'Corredor S - Prateleira 2',
  },
  {
    id: 'part-05',
    name: 'Pivô de Suspensão Nakata N-6058',
    code: 'N-6058',
    brand: 'Nakata',
    category: 'suspensao',
    price: 50.00,
    oldPrice: 65.00,
    isWeeklyOffer: false,
    stockCount: 15,
    rating: 4.8,
    reviewsCount: 22,
    warrantyMonths: 6,
    condition: 'Novo Original',
    mainImage: '/images/products/nakata-n6058-1.jpg',
    stockPhotos: [
      {
        url: '/images/products/nakata-n6058-1.jpg',
        caption: 'Foto real do produto Nakata na caixa',
      },
      {
        url: '/images/products/nakata-n6058-2.jpg',
        caption: 'Detalhe do pivô de suspensão',
      }
    ],
    compatibleBrands: ['Volkswagen', 'Ford', 'Chevrolet', 'Fiat'],
    compatibleModels: ['Gol', 'Fox', 'Palio', 'Onix'],
    yearStart: 2005,
    yearEnd: 2024,
    description: 'Pivô de suspensão Nakata de alta qualidade, garantindo maior durabilidade e estabilidade na condução do veículo.',
    specifications: {
      'Posição': 'Suspensão',
      'Lado': 'Esquerdo/Direito',
      'Tipo': 'Pivô',
    },
    shelfLocation: 'Corredor S - Prateleira 3',
  },
  {
    id: 'part-06',
    name: 'Terminal de Direção Nakata N-6012',
    code: 'N-6012',
    brand: 'Nakata',
    category: 'suspensao',
    price: 67.00,
    oldPrice: 80.00,
    isWeeklyOffer: false,
    stockCount: 18,
    rating: 4.8,
    reviewsCount: 10,
    warrantyMonths: 6,
    condition: 'Novo Original',
    mainImage: '/images/products/nakata-n6012-1.jpg',
    stockPhotos: [
      {
        url: '/images/products/nakata-n6012-1.jpg',
        caption: 'Foto real do terminal de direção na caixa',
      },
      {
        url: '/images/products/nakata-n6012-2.jpg',
        caption: 'Detalhe do terminal de direção',
      }
    ],
    compatibleBrands: ['Volkswagen', 'Ford', 'Chevrolet', 'Fiat'],
    compatibleModels: ['Gol', 'Fox', 'Palio', 'Onix'],
    yearStart: 2005,
    yearEnd: 2024,
    description: 'Terminal de direção Nakata, peça fundamental para o sistema de direção, garantindo segurança e precisão nas manobras.',
    specifications: {
      'Posição': 'Direção',
      'Lado': 'Esquerdo/Direito',
      'Tipo': 'Terminal',
    },
    shelfLocation: 'Corredor S - Prateleira 4',
  },
  {
    id: 'part-07',
    name: 'Jogo de Pastilhas de Freio Dianteira SYL 1419',
    code: 'SYL1419',
    brand: 'SYL',
    category: 'freios',
    price: 86.00,
    oldPrice: 105.00,
    isWeeklyOffer: false,
    stockCount: 8,
    rating: 4.7,
    reviewsCount: 15,
    warrantyMonths: 3,
    condition: 'Novo Original',
    mainImage: '/images/products/syl-1419-1.jpg',
    stockPhotos: [
      {
        url: '/images/products/syl-1419-1.jpg',
        caption: 'Foto real do jogo de pastilhas na caixa',
      },
      {
        url: '/images/products/syl-1419-2.jpg',
        caption: 'Detalhe das pastilhas de freio SYL',
      }
    ],
    compatibleBrands: ['Volkswagen', 'Fiat', 'Chevrolet'],
    compatibleModels: ['Gol', 'Fox', 'Palio', 'Celta'],
    yearStart: 2008,
    yearEnd: 2024,
    description: 'Jogo de pastilhas de freio dianteira SYL, alta durabilidade e frenagem segura sem ruídos.',
    specifications: {
      'Posição': 'Dianteira',
      'Material': 'Sem amianto',
      'Tipo': 'Pastilha de Freio',
    },
    shelfLocation: 'Corredor F - Prateleira 1',
  }
];
