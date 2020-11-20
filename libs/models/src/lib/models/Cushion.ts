export interface Cushion {
  id: string;
  name: string;
  image: string;
  alt: string;
  price: number;
  offlinePrice?: number;
  calculation?: string;
  subTotal: number;
  amount: number;
}
