import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Users } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserDto } from '../dto/update-user.input';
import { PasswordResetDto } from '../dto/resetpass.dto';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mailer.service';
import { FindUserByEmailInput } from '../dto/find-userByEmail';
import { FindUserByIdInput } from '../dto/find-userById';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private sendEmail: MailService,
  ) {}

  async findAll(): Promise<Users[]> {
    return this.usersRepository.find();
  }

  async findOne({ id }: FindUserByIdInput): Promise<Users> {
    return this.usersRepository.findOne({
      where: {
        id,
      },
    });
  }

  async findByEmail({ email }: FindUserByEmailInput): Promise<Users> {
    return this.usersRepository.findOne({
      where: {
        email,
      },
    });
  }

  async createUser(createUserInput: CreateUserInput): Promise<Users> {
    const newUser = this.usersRepository.create(createUserInput);
    return newUser;
  }

  async saveUser(newUser: Users): Promise<Users> {
    return this.usersRepository.save(newUser);
  }

  async update(updateUserDto: UpdateUserDto): Promise<Users> {
    const { id, name, ...updateDto } = updateUserDto;
    let userDB = await this.findByEmail(updateDto);
    if (userDB.id != id)
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

  // async createPasswordResetToken(
  //   PasswordResetDto: PasswordResetDto,
  // ): Promise<void> {
  //   const user = await this.usersRepository.findOne({
  //     where: { email: PasswordResetDto.email },
  //   });

  //   if (!user) {
  //     throw new NotFoundException('Erro al enviar el correo, favor revisar!');
  //   }
  //   const resetCode = crypto.randomBytes(3).toString('hex').slice(0, 6); // Obtiene una cadena de 6 dígitos
  //   await this.sendEmail.sendPasswordResetMail(
  //     PasswordResetDto.email,
  //     resetCode,
  //   );
  // }
}
