import {
  BadRequestException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from 'src/user/services/user.service';
import { LoginUserInput } from '../dto/login-user.input';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { RegisterUserInput } from '../dto/register-user.input';
import { LoginUserResponse } from '../dto/login-user.response';
import { RegisterUserResponse } from '../dto/register-user.response';
import { ValidateUserResponse } from '../dto/validate-user.response';
import { ValidateUserDto } from '../dto/validate-user.dto';
import { GetTokenInput } from '../dto/gettoken.input';
import { TokenResponse } from '../dto/token.response';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async register(
    registerUserInput: RegisterUserInput,
  ): Promise<RegisterUserResponse> {
    try {
      const { password, ...userData } = registerUserInput;
      const user = await this.userService.findByEmail(userData);
      if (user)
        throw new BadRequestException(
          'Email ingresado ya está asociado a una cuenta',
        );
      const usuario = await this.userService.createUser({
        ...userData,
        password: bcrypt.hashSync(password, 10),
      });
      const token = this.getJwtToken({ id: usuario.id });
      usuario.accessToken = token;
      const usuarioSave = await this.userService.saveUser(usuario);
      delete usuarioSave.password;
      return {
        user: usuarioSave,
        access_token: token,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async login(loginUserInput: LoginUserInput): Promise<LoginUserResponse> {
    try {
      const { email, password } = loginUserInput;
      const user = await this.userService.findByEmail(loginUserInput);
      if (!user) throw new UnauthorizedException('Credentials are not valid');
      if (!bcrypt.compareSync(password, user.password))
        throw new UnauthorizedException('Credentials are not valid');
      const token = this.getJwtToken({ id: user.id });
      user.accessToken = token;
      const usuarioSave = await this.userService.saveUser(user);
      delete user.password;
      return {
        access_token: token,
        user: usuarioSave,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async validateUser(
    validateUser: ValidateUserDto,
  ): Promise<ValidateUserResponse> {
    const user = await this.userService.findByEmail(validateUser);
    if (user && user.password === validateUser.pass) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  private getJwtToken(payload: GetTokenInput) {
    const token = this.jwtService.sign(payload);
    return token;
  }
}
