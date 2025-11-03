import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { Product } from './product.interface';

import { Seller } from './seller.interface';



@Injectable()
export class SellerService {
     private sellers: Seller[] = [];

  // Create a new seller
  create(createSellerDto: CreateSellerDto): { message: string; seller: Seller } {
    const newSeller: Seller = {
      id: Date.now().toString(),  // Generate a unique ID
      products: [],               // Initialize products as an empty array
      ...createSellerDto,         // Spread other seller details
    };

    this.sellers.push(newSeller);
    return { message: 'Seller created successfully', seller: newSeller };
  }

  // Get a seller by ID
  getSeller(id: string) {
    const seller = this.sellers.find(s => s.id === id);
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }
    return seller;
  }

  // Update a seller's profile
  update(id: string, updateSellerDto: UpdateSellerDto) {
    const seller = this.sellers.find(s => s.id === id);
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }
    Object.assign(seller, updateSellerDto);
    return { message: 'Seller updated successfully', seller };
  }

  // Partially update a seller's profile
  patch(id: string, updateSellerDto: UpdateSellerDto) {
    const seller = this.sellers.find(s => s.id === id);
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }
    Object.assign(seller, updateSellerDto);
    return { message: 'Seller patched successfully', seller };
  }

  // Delete a seller's account
  delete(id: string) {
    const sellerIndex = this.sellers.findIndex(s => s.id === id);
    if (sellerIndex === -1) {
      throw new NotFoundException('Seller not found');
    }
    this.sellers.splice(sellerIndex, 1);
    return { message: 'Seller deleted successfully' };
  }

  // Update stock of a product
//   updateStock(id: string, stockUpdateDto: StockUpdateDto) {
//     const seller = this.sellers.find(s => s.id === id);
//     if (!seller) {
//       throw new NotFoundException('Seller not found');
//     }
//     seller.stock = stockUpdateDto.stock;
//     return { message: 'Stock updated successfully', seller };
//   }

  // Get all sellers with pagination (example)
  getAllSellers(page: number) {
    const pageSize = 10;
    const pagedSellers = this.sellers.slice((page - 1) * pageSize, page * pageSize);
    return { page, sellers: pagedSellers };
  }

  // Search sellers by store name
  searchByStoreName(storeName: string) {
    const filteredSellers = this.sellers.filter(s =>
      s.storeName.toLowerCase().includes(storeName.toLowerCase())
    );
    return { storeName, sellers: filteredSellers };
  }
}
