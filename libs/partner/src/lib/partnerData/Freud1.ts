import { Cushion } from '../../../../models/src/lib/models/Cushion';
import {
  Partner,
  TransportCostsType,
} from '../../../../models/src/lib/models/Partner';

export const partner: Partner = {
  basePrice: 120,
  transportCostsType: TransportCostsType.AMAZON_MODEL,
  showOfflinePrice: true,
};

export const cushions: Cushion[] = [
  {
    id: 'sessel',
    name: 'Sessel',
    image:
      'https://res.cloudinary.com/dsxmo646a/image/upload/v1613482519/Sessel_mvvh2l.svg',
    alt: 'Icon für Sessel',
    price: 139,
    offlinePrice: 154.5,
    subTotal: 0,
    amount: 0,
  },
  {
    id: 'sitzelement',
    name: 'Sitzelement',
    image:
      'https://res.cloudinary.com/dsxmo646a/image/upload/v1613482519/Polster-Sitzflaeche_w6zemo.svg',
    alt: 'Icon für Sitzelement',
    price: 109,
    offlinePrice: 121.2,
    subTotal: 0,
    amount: 0,
  },
  {
    id: 'eckelement',
    name: 'Eckelement',
    image:
      'https://res.cloudinary.com/dsxmo646a/image/upload/v1613482519/Sofa-Eckteil_xgfriv.svg',
    alt: 'Icon für Eckelement',
    price: 169,
    offlinePrice: 187.9,
    subTotal: 0,
    amount: 0,
  },
  {
    id: 'loseKissen',
    name: 'Lose Kissen',
    image:
      'https://res.cloudinary.com/dsxmo646a/image/upload/v1613482684/Lose-kissen_iki7zy.svg',
    alt: 'Icon für lose Kissen',
    price: 20,
    offlinePrice: 22.2,
    subTotal: 0,
    amount: 0,
  },
];

export const partnerObject = {
  partner,
  cushions,
};
