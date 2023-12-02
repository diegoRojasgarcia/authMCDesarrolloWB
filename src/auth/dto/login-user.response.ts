import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
import { Users } from 'src/user/entities/user.entity';

@ObjectType()
export class LoginUserResponse {
  @Field()
  user: Users;

  @IsEmail()
  @Field()
  access_token: string;
}
