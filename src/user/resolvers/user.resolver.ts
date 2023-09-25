import { UseGuards } from '@nestjs/common';
import { Resolver } from '@nestjs/graphql';
import { Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../services/user.service';
import { Users } from '../entities/user.entity';
import { CreateUserInput } from '../dto/create-user.input';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';

@Resolver(() => Users)
export class UserResolver {
  constructor(private userService: UserService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Users])
  users() {
    return this.userService.findAll();
  }

  @Query((returns) => Users)
  user(@Args('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Mutation((returns) => Users)
  createUser(@Args('userInput') userInput: CreateUserInput) {
    return this.userService.createUser(userInput);
  }
}
