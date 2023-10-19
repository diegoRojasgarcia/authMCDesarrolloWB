import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserDto } from '../dto/update-user.input';

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

  async update(updateUserDto: UpdateUserDto) {
    const { id, ...updateDto } = updateUserDto;
    let userDB = await this.findByEmail(updateDto.email);
    if (userDB)
      throw new BadRequestException(`Email ingresado se encuentra registrado`);
    userDB = await this.usersRepository.preload({
      id: id,
      ...updateDto,
    });
    try {
      await this.usersRepository.save(userDB);
      return userDB;
    } catch (error) {
      return error;
    }
  }
}
