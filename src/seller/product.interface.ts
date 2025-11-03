// product.interface.ts
export interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;  // Stock should be on products, not the seller
  sellerId: string;  // The seller ID associated with this product
}
