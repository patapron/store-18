export interface Product {
  id: number;
  title: string;
  price: string;
  category: string;
  description: string;
  image: string;
  rating: Rating;
  qty: number;
  subTotal: number;
}

export interface Rating {
  rate: number;
  count: number;
}
