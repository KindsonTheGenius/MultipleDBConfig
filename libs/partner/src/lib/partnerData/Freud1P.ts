import { Cushion } from '../../../../models/src/lib/models/Cushion';
import {
  Partner,
  TransportCostsType,
} from '../../../../models/src/lib/models/Partner';

export const partner: Partner = {
  basePrice: 40,
  transportCostsType: TransportCostsType.AMAZON_MODEL,
  showOfflinePrice: true,
};

export const cushions: Cushion[] = [
  {
    id: 'sessel',
    name: 'Sessel',
    image: '../assets/Sessel.svg',
    alt: 'Icon für Sessel',
    price: 139,
    subTotal: 0,
    amount: 0,
  },
  {
    id: 'sitzelement',
    name: 'Sitzelement',
    image: '../assets/Polster-Sitzflaeche.svg',
    alt: 'Icon für Sitzelement',
    price: 109,
    offlinePrice: 119.9,
    subTotal: 0,
    amount: 0,
  },
  {
    id: 'eckelement',
    name: 'Eckelement',
    image: '../assets/Sofa-Eckteil.svg',
    alt: 'Icon für Eckelement',
    price: 169,
    offlinePrice: 187.1,
    subTotal: 0,
    amount: 0,
  },
  {
    id: 'eckelementLang',
    name: 'Langes Eckelement',
    image: '../assets/Sofa-langes-Eckteil.svg',
    alt: 'Icon für langes Eckelement',
    price: 169,
    offlinePrice: 187.1,
    subTotal: 0,
    amount: 0,
  },
  {
    id: 'loseKissen',
    name: 'Lose Kissen',
    image: '../assets/Lose-kissen.svg',
    alt: 'Icon für lose Kissen',
    price: 20,
    offlinePrice: 25,
    subTotal: 0,
    amount: 0,
  },
];
