export interface Category {
  id: string;
  name: string;
  slug: string;
  iconName: string;
  description: string;
  count: number;
}

export const CATEGORIES: Category[] = [
  {
    id: 'freios',
    name: 'Freios & Segurança',
    slug: 'freios',
    iconName: 'Disc',
    description: 'Pastilhas, discos de freio, fluido, cilindros e sapatas',
    count: 142,
  },
  {
    id: 'motor',
    name: 'Motor & Correias',
    slug: 'motor',
    iconName: 'Cog',
    description: 'Filtros, correias dentadas, juntas, velas de ignição e bombas',
    count: 210,
  },
  {
    id: 'suspensao',
    name: 'Suspensão & Direção',
    slug: 'suspensao',
    iconName: 'GitCommitVertical',
    description: 'Amortecedores, molas, pivôs, tirantes, coifas e buchas',
    count: 185,
  },
  {
    id: 'eletrica',
    name: 'Elétrica & Iluminação',
    slug: 'eletrica',
    iconName: 'Zap',
    description: 'Faróis, lanternas, baterias, alternadores, lâmpadas LED',
    count: 164,
  },
  {
    id: 'oleos',
    name: 'Óleos & Lubrificantes',
    slug: 'oleos',
    iconName: 'Droplet',
    description: 'Óleo sintético, mineral, transmissão, direção hidráulica e aditivos',
    count: 98,
  },
  {
    id: 'arrefecimento',
    name: 'Arrefecimento & Ar',
    slug: 'arrefecimento',
    iconName: 'Wind',
    description: 'Radiadores, reservatórios, aditivos concentrados, filtro de cabine',
    count: 76,
  },
  {
    id: 'embreagem',
    name: 'Transmissão & Embreagem',
    slug: 'embreagem',
    iconName: 'ShieldAlert',
    description: 'Kits de embreagem, atuadores, juntas homocinéticas e tulipas',
    count: 64,
  },
  {
    id: 'acessorios',
    name: 'Acessórios & Estética',
    slug: 'acessorios',
    iconName: 'Sparkles',
    description: 'Palhetas de parabrisa, tapetes, capas, odorizadores e cera',
    count: 120,
  },
];
