import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellerModule } from './seller/seller.module';  // Import SellerModule here
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';


@Module({
  imports: [SellerModule,
    UserModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'apwt_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'], // সব এনটিটি অটো লোড
      synchronize: true,
      logging: true,
      autoLoadEntities: true,
    }),],
  controllers: [],
  providers: [],
})
export class AppModule { }
