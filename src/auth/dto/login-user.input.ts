import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class LoginUserInput {
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @Field()
  password: string;
}
