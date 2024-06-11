import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>
    ) { }

    async getUsers() {
        // const data = await this.userRepository.query("select * from user")
        const data = await this.userRepository
            .createQueryBuilder('user')
            .where("user.id = :id", { id: 12 }).getOne()
        return data
    }
}
