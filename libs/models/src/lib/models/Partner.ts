export interface Partner {
  basePrice: number; // this is either the minimum order value or a fixed shipping charge
  transportCostsType: TransportCostsType;
  // priceListUrl?: string;
  showOfflinePrice: boolean;
}

export enum TransportCostsType {
  // Always added on top
  FIXED,
  // Transport cost = basePrice - totalPrice
  MINIMUM_ORDER_VALUE,
  // Fixed Transportcosts until basePrice exceeded
  AMAZON_MODEL,
}
