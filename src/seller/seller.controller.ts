import { Controller, Post, Get, Put, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { SellerService } from './seller.service';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { ValidationSellerDto } from './dto/validation-seller.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { UseInterceptors, UploadedFile, BadRequestException } from '@nestjs/common';



@Controller('seller')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  // Create a new seller
  @Post('register')
  async create(@Body() createSellerDto: CreateSellerDto) {
    return this.sellerService.create(createSellerDto);
  }

  // Get a seller profile by ID
  @Get(':id')
  async getSeller(@Param('id') id: string) {
    return this.sellerService.getSeller(id);
  }

  // Update a seller's profile information
  @Put(':id')
  async updateSeller(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.update(id, updateSellerDto);
  }

  // Partially update seller profile (e.g., update only email)
  @Patch(':id')
  async patchSeller(@Param('id') id: string, @Body() updateSellerDto: UpdateSellerDto) {
    return this.sellerService.patch(id, updateSellerDto);
  }

  // Delete a seller's account
  @Delete(':id')
  async deleteSeller(@Param('id') id: string) {
    return this.sellerService.delete(id);
  }

//   // Update the stock of a product
//   @Patch(':id/stock')
//   async updateStock(@Param('id') id: string, @Body() stockUpdateDto: StockUpdateDto) {
//     return this.sellerService.updateStock(id, stockUpdateDto);
//   }

  // Get all sellers (for admin to view)
  @Get()
  async getAllSellers(@Query('page') page: number) {
    return this.sellerService.getAllSellers(page);
  }

  // Search sellers by store name
  @Get('search')
  async searchSellers(@Query('storeName') storeName: string) {
    return this.sellerService.searchByStoreName(storeName);
  }




// new route for validation


@Post('validate')
@UseInterceptors(FileInterceptor('nidImage'))
async validateSellerData(
  @Body() validationSellerDto: ValidationSellerDto,
  @UploadedFile() nidImage: Express.Multer.File,
) {
  
  return this.sellerService.validateSellerData(validationSellerDto, nidImage);
}



//another route for db connection


}




