
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async create(dto: CreateUserDto): Promise<User> {
        const user = this.userRepository.create({
            fullName: dto.fullName || null,
            phone: dto.phone,
        });
        return await this.userRepository.save(user);
    }

    async updatePhone(id: string, phone: string): Promise<User> {
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException('User not found');
        user.phone = phone;
        return await this.userRepository.save(user);
    }

    async getUsersWithNullFullName(): Promise<User[]> {
        return await this.userRepository.find({
            where: { fullName: null as any },

        });
    }


    async deleteUser(id: string): Promise<{ message: string }> {
        const result = await this.userRepository.delete(id);

        if (result.affected === 0) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }

        return { message: `User with ID ${id} has been deleted successfully` };
    }
}