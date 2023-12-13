import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from '../services/auth.service';
import { LoginUserInput } from '../dto/login-user.input';
import { UserResponse } from '../dto/user.response';
import { RegisterUserInput } from '../dto/register-user.input';
import { RegisterUserResponse } from '../dto/register-user.response';
import { BadRequestException } from '@nestjs/common';
import { LoginUserResponse } from '../dto/login-user.response';
import { Users } from 'src/user/entities/user.entity';
import { FindUserByIdInput } from 'src/user/dto/find-userById';
import { updatePasswordDto } from '../dto/updatePassword.input';

@Resolver('Auth')
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => UserResponse)
  login(
    @Args('loginUserInput') loginUserInput: LoginUserInput,
  ): Promise<LoginUserResponse> {
    try {
      return this.authService.login(loginUserInput);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => UserResponse)
  register(
    @Args('registerUserInput') registerUserInput: RegisterUserInput,
  ): Promise<RegisterUserResponse> {
    try {
      return this.authService.register(registerUserInput);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => Users)
  updatePassword(
    @Args('findUserByIdInput') findUserByIdInput: FindUserByIdInput,
    @Args('updateUserInput') updatePasswordDto: updatePasswordDto,
  ): Promise<Users> {
    try {
      return this.authService.updatePassword(
        findUserByIdInput,
        updatePasswordDto,
      );
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
