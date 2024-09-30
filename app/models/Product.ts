import { Unit } from './Unit';

export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: string;
  category_id: number;
  section_id: number;
  availability: string;
  amount: string;
  unit_id: number;
}
