import { Module } from '@nestjs/common';
import { SellerModule } from './seller/seller.module';  // Import SellerModule here

@Module({
  imports: [SellerModule],  // Add SellerModule to the imports array
  controllers: [],
  providers: [],
})
export class AppModule {}
