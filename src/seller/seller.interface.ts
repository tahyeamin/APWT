import { Product } from './product.interface';export interface Seller {
  id: string;
  name: string;
  email: string;
  password: string;
  storeName: string;
  contactInfo: string;
 
  products: Product[];
  
}
