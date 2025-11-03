import { IsString, IsEmail, IsOptional } from 'class-validator';

export class UpdateSellerDto {
  @IsString()
  @IsOptional()
  name: string;

  @IsEmail()
  @IsOptional()
  email: string;

  @IsString()
  @IsOptional()
  storeName: string;

  @IsString()
  @IsOptional()
  contactInfo: string;
}
