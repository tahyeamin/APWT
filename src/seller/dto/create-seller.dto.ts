import { IsString, IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSellerDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsOptional()
  storeName: string;

  @IsString()
  @IsOptional()
  contactInfo: string;
}
