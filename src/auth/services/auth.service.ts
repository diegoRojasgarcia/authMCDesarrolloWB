import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { LoginUserInput } from '../dto/login-user.input';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserInput } from '../dto/register-user.input';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(registerUserInput: RegisterUserInput) {
    const { password, ...userData } = registerUserInput;
    const user = await this.userService.findByEmail(userData.email);
    if (user)
      throw new BadRequestException(
        'Email ingresado ya está asociado a una cuenta',
      );

    const usuario = await this.userService.createUser({
      ...userData,
      password: bcrypt.hashSync(password, 10),
    });
    delete usuario.password;
    return {
      user: usuario,
      access_token: this.getJwtToken({ id: usuario.id }),
    };
  }

  async login(loginUserInput: LoginUserInput) {
    const { email, password } = loginUserInput;
    const user = await this.userService.findByEmail(email);

    if (!user) throw new UnauthorizedException('Credentials are not valid');

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials are not valid');

    delete user.password;
    return {
      access_token: await this.getJwtToken({ id: user.id }),
      user: user,
    };
  }

  async validateUser(useremail: string, pass: string): Promise<any> {
    const user = await this.userService.findByEmail(useremail);
    if (user && user.password === pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private getJwtToken(payload: { id: number }) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
