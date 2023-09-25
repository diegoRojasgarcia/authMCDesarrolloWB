import { Injectable } from '@nestjs/common';
import { Users } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../dto/create-user.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findOne(id: number): Promise<Users> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail(email: string): Promise<Users> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async createUser(createUserInput: CreateUserInput): Promise<Users> {
    const newUser = this.usersRepository.create(createUserInput);
    return this.usersRepository.save(newUser);
  }
}
