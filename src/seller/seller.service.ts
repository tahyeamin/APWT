import { Injectable, NotFoundException,BadRequestException } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { ValidationSellerDto } from './dto/validation-seller.dto';

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



  validateSellerData(dto: ValidationSellerDto, file: Express.Multer.File) {
   
    if (!file) {
      throw new BadRequestException('NID image is required');
    }

  
    if (file.size > 2 * 1024 * 1024) {
      throw new BadRequestException('NID image must be less than 2 MB');
    }

    
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
      throw new BadRequestException('Only JPG, JPEG or PNG files are allowed');
    }

   
    return {
      message: 'Validation successful',
      data: {
        name: dto.name,
        email: dto.email,
        nidNumber: dto.nidNumber,
        fileName: file.originalname,
        fileSize: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        mimeType: file.mimetype,
      },
    };
  }
}







