import { BadRequestException, UseGuards } from '@nestjs/common';
import { ResolveReference, Resolver } from '@nestjs/graphql';
import { Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { Users } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.input';
import { FindUserByEmailInput } from '../dto/find-userByEmail';
import { FindUserByIdInput } from '../dto/find-userById';
import { emailUserDto } from '../dto/emailUser.dto';
import { ResetPasswordDto } from '../dto/resetPassword.dto';
import { resetPassResponse } from '../entities/resetPass.entity';

@Resolver(() => Users)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => [Users])
  users(): Promise<Users[]> {
    try {
      return this.userService.findAll();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Query((returns) => Users)
  user(
    @Args('findUserByEmailInput') data: FindUserByEmailInput,
  ): Promise<Users> {
    try {
      return this.userService.findByEmail(data);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => Users)
  updateUser(
    @Args('findUserByIdInput') findUserByIdInput: FindUserByIdInput,
    @Args('updateUserInput') updateUserDto: UpdateUserDto,
  ): Promise<Users> {
    try {
      return this.userService.update(findUserByIdInput, updateUserDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Mutation(() => resetPassResponse)
  sendEmailToken(
    @Args('emailUserInput') emailUserDto: emailUserDto,
  ): Promise<resetPassResponse> {
    return this.userService.sendEmail(emailUserDto);
  }

  @Mutation(() => resetPassResponse)
  sendResetPassword(
    @Args('ResetPasswordInput') resetPasswordDto: ResetPasswordDto,
  ): Promise<resetPassResponse> {
    return this.userService.resetPassword(resetPasswordDto);
  }

  @ResolveReference()
  resolveReference(reference: {
    __typename: string;
    id: number;
  }): Promise<Users> {
    try {
      return this.userService.findOne(reference);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
