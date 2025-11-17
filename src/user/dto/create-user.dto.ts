import { IsString, IsOptional } from "class-validator";


export class CreateUserDto {
  @IsOptional()         
  @IsString()
  fullName?: string | null;

  @IsString()
  phone: string;
}