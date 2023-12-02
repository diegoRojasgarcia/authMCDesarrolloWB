import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsEmail,
  IsString,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

@InputType()
export class RegisterUserInput {
  @IsEmail()
  @Field()
  email: string;

  @IsString()
  @Field()
  @MaxLength(20)
  name: string;

  @IsNotEmpty()
  @Field()
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @MinLength(6)
  @MaxLength(50)
  password: string;
}
