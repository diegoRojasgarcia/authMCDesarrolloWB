import { BadRequestException, Injectable } from '@nestjs/common';
import { Users } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from '../dto/create-user.input';
import { UpdateUserDto } from '../dto/update-user.input';
import * as crypto from 'crypto';
import { MailService } from 'src/mail/mailer.service';
import { FindUserByEmailInput } from '../dto/find-userByEmail';
import { FindUserByIdInput } from '../dto/find-userById';
import { Token } from 'src/user/entities/token.entity';
import { ResetPasswordDto } from '../dto/resetPassword.dto';
import { resetPassResponse } from '../entities/resetPass.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Token)
    private tokenRepository: Repository<Token>,
    private mailService: MailService,
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

  async update(
    findUserByIdInput: FindUserByIdInput,
    updateUserDto: UpdateUserDto,
  ) {
    const { id } = findUserByIdInput;
    const { email } = updateUserDto;
    let userDB = await this.findOne({ id });
    const userEmail = await this.findByEmail({ email });
    if (userEmail) {
      if (userEmail.id != userDB.id)
        throw new BadRequestException(
          `Email ingresado se encuentra registrado`,
        );
    }
    userDB = await this.usersRepository.preload({
      id: id,
      ...updateUserDto,
    });
    try {
      await this.usersRepository.save(userDB);
      return userDB;
    } catch (error) {
      return error;
    }
  }

  async sendEmail(emailUserDto): Promise<resetPassResponse> {
    // try {

    // } catch (error) {
    //   throw new BadRequestException(
    //     `Algo inesperado ocurrio, inténtalo nuevamente`,
    //   );
    // }
    const userDB = await this.findByEmail(emailUserDto);
    if (!userDB) {
      throw new BadRequestException(
        `Favor validar email, intentalo nuevamente`,
      );
    }
    const token = new Token();
    token.email = userDB.email;
    token.nombreuser = userDB.name;
    token.token = crypto.randomBytes(3).toString('hex').slice(0, 6);
    token.expires_at = new Date(Date.now() + 3600000);
    const responseEmail = await this.mailService.sendResetMail(token);
    await this.tokenRepository.save(token);
    return responseEmail;
  }

  async resetPassword(
    resetPasswordDto: ResetPasswordDto,
  ): Promise<resetPassResponse> {
    const { token, newPassword } = resetPasswordDto;
    try {
      const tokenDB = await this.tokenRepository.findOne({
        where: { token },
      });
      if (!tokenDB || tokenDB.expires_at < new Date()) {
        throw new BadRequestException(`Favor validar, token inválido`);
      }
      const userDB = await this.findByEmail(tokenDB);
      if (!userDB) {
        throw new BadRequestException(`Usuario inválido`);
      }
      userDB.password = bcrypt.hashSync(newPassword, 10);
      await this.usersRepository.save(userDB);
      await this.tokenRepository.delete({ id: tokenDB.id });
      return {
        message: 'Password actualizada correctamente',
      };
    } catch (error) {
      throw new BadRequestException(
        `Algo inesperado ocurrio, inténtalo nuevamente`,
      );
    }
  }
}
