import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsString } from 'class-validator';

@InputType()
export class RegisterUserInput {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  name: string;

  @IsNotEmpty()
  @Field()
  password: string;
}
