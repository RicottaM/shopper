import { Unit } from './unit.model';

export interface Product {
  product_id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  section_id: number;
  availability: string;
  amount: number;
  unit_id: number;
}
