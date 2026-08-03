export interface VehicleBrand {
  name: string;
  logoText: string;
  models: {
    name: string;
    years: number[];
    engines: string[];
  }[];
}

export const POPULAR_VEHICLES: VehicleBrand[] = [
  {
    name: 'Chevrolet',
    logoText: 'CHEVROLET',
    models: [
      { name: 'Onix', years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.0 8V Flex', '1.4 8V Flex', '1.0 Turbo Flex'] },
      { name: 'Celta', years: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016], engines: ['1.0 VHC', '1.0 VHCE Flex'] },
      { name: 'Corsa', years: [1998, 1999, 2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012], engines: ['1.0 8V MPFI', '1.4 8V Econoflex', '1.8 8V Flex'] },
      { name: 'Cruze', years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023], engines: ['1.8 16V Ecotec', '1.4 Turbo Ecotec'] },
      { name: 'S10', years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024], engines: ['2.4 Flex', '2.5 SIDI Flex', '2.8 Turbo Diesel'] },
      { name: 'Tracker', years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.8 16V Flex', '1.4 Turbo Flex', '1.0 Turbo', '1.2 Turbo'] },
    ],
  },
  {
    name: 'Volkswagen',
    logoText: 'VOLKSWAGEN',
    models: [
      { name: 'Gol', years: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023], engines: ['1.0 8V EA111', '1.6 8V EA111', '1.0 12V EA211', '1.6 16V MSI'] },
      { name: 'Polo', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.0 MPI Flex', '1.6 MSI Flex', '1.0 200 TSI Flex', '1.4 250 TSI GTS'] },
      { name: 'Fox', years: [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021], engines: ['1.0 8V EA111', '1.6 8V EA111', '1.6 16V MSI'] },
      { name: 'Saveiro', years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.6 8V EA111', '1.6 16V MSI'] },
      { name: 'Virtus', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.6 MSI', '1.0 200 TSI', '1.4 250 TSI'] },
      { name: 'T-Cross', years: [2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.0 200 TSI', '1.4 250 TSI'] },
    ],
  },
  {
    name: 'Fiat',
    logoText: 'FIAT',
    models: [
      { name: 'Palio', years: [2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018], engines: ['1.0 8V Fire', '1.4 8V Fire Flex', '1.6 16V E.torQ'] },
      { name: 'Uno', years: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021], engines: ['1.0 8V Fire', '1.4 8V Fire', '1.0 3C Firefly', '1.3 4C Firefly'] },
      { name: 'Strada', years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.4 8V Fire', '1.8 16V E.torQ', '1.3 Firefly', '1.0 Turbo 200'] },
      { name: 'Argo', years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.0 Firefly', '1.3 Firefly', '1.8 E.torQ'] },
      { name: 'Mobi', years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.0 Fire Evo', '1.0 Firefly'] },
      { name: 'Toro', years: [2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.8 E.torQ Flex', '2.0 16V Turbo Diesel', '1.3 Turbo 270'] },
    ],
  },
  {
    name: 'Ford',
    logoText: 'FORD',
    models: [
      { name: 'Ka', years: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021], engines: ['1.0 Zetec RoCam', '1.6 Zetec RoCam', '1.0 3C TiVCT', '1.5 16V Sigma', '1.5 3C Dragon'] },
      { name: 'Fiesta', years: [2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019], engines: ['1.0 RoCam', '1.6 RoCam', '1.5 16V Sigma', '1.6 16V Sigma TiVCT'] },
      { name: 'EcoSport', years: [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021], engines: ['1.6 Zetec RoCam', '2.0 Duratec', '1.5 Dragon TiVCT', '2.0 Direct Flex'] },
      { name: 'Ranger', years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['2.5 Duratec Flex', '2.2 Duratorq Diesel', '3.2 Duratorq Diesel', '2.0 Turbo Diesel', '3.0 V6 Diesel'] },
    ],
  },
  {
    name: 'Toyota',
    logoText: 'TOYOTA',
    models: [
      { name: 'Corolla', years: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.8 16V Flex', '2.0 16V Dual VVT-i', '1.8 Hybrid Flex', '2.0 Dynamic Force'] },
      { name: 'Etios', years: [2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021], engines: ['1.3 16V Dual VVT-i', '1.5 16V Dual VVT-i'] },
      { name: 'Hilux', years: [2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['2.7 16V Flex', '3.0 Turbo Diesel', '2.8 Turbo Diesel'] },
      { name: 'Yaris', years: [2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.3 16V Dual VVT-i', '1.5 16V Dual VVT-i'] },
    ],
  },
  {
    name: 'Hyundai',
    logoText: 'HYUNDAI',
    models: [
      { name: 'HB20', years: [2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.0 12V Kappa Flex', '1.6 16V Gamma Flex', '1.0 Turbo GDI Flex'] },
      { name: 'Creta', years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.6 16V Gamma', '2.0 16V Nu', '1.0 Turbo GDI'] },
      { name: 'Tucson', years: [2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016], engines: ['2.0 16V DOHC', '2.7 V6'] },
    ],
  },
  {
    name: 'Honda',
    logoText: 'HONDA',
    models: [
      { name: 'Civic', years: [2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021], engines: ['1.8 16V i-VTEC', '2.0 16V i-VTEC', '1.5 Turbo Touring'] },
      { name: 'Fit', years: [2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021], engines: ['1.4 8V i-DSI', '1.5 16V i-VTEC'] },
      { name: 'HR-V', years: [2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.8 16V i-VTEC', '1.5 Turbo Flex'] },
    ],
  },
  {
    name: 'Renault',
    logoText: 'RENAULT',
    models: [
      { name: 'Kwid', years: [2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.0 12V SCe Flex'] },
      { name: 'Sandero', years: [2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023], engines: ['1.0 16V Hi-Flex', '1.6 8V Hi-Torque', '1.0 12V SCe', '1.6 16V SCe', '2.0 16V RS'] },
      { name: 'Duster', years: [2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024, 2025], engines: ['1.6 16V SCe', '2.0 16V', '1.3 Turbo TCe'] },
    ],
  },
];
