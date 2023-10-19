import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsString, Matches } from 'class-validator';

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
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;
}
