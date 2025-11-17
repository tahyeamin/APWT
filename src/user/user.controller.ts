
import {
    Controller,
    Post,
    Body,
    Patch,
    Param,
    Get,
    ParseUUIDPipe,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { PhoneValidationPipe } from './pipes/phone-validation.pipe';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

   

@Post()
async create(@Body() dto: CreateUserDto) {
 
  const pipe = new PhoneValidationPipe();
  dto.phone = pipe.transform(dto.phone);
  return this.userService.create(dto);
}

    @Patch(':id/phone')
    updatePhone(
        @Param('id', ParseUUIDPipe) id: string,
        @Body('phone', PhoneValidationPipe) phone: string,
    ) {
        return this.userService.updatePhone(id, phone);
    }

    @Get('null-fullname')
    getUsersWithNullFullName() {
        return this.userService.getUsersWithNullFullName();
    }
}