import { IsString, Matches, IsNotEmpty } from 'class-validator';

export class ValidationSellerDto {
  @IsNotEmpty({ message: 'Name is required' })
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, { message: 'Name must contain only letters and spaces' })
  name: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsString()
  @Matches(/^[\w.%+-]+@[\w.-]+\.xyz$/, { message: 'Email must be a valid .xyz domain' })
  email: string;

  @IsNotEmpty({ message: 'NID number is required' })
  @IsString()
  @Matches(/^\d{10}$|^\d{13}$/, { message: 'NID must be exactly 13 or 17 digits' })
  nidNumber: string;
}