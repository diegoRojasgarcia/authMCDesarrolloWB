import { Field, InputType } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsEmail,
  Matches,
  MinLength,
  MaxLength,
} from 'class-validator';

@InputType()
export class LoginUserInput {
  @IsEmail()
  @Field()
  email: string;

  @IsNotEmpty()
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  @MinLength(6)
  @MaxLength(50)
  @Field()
  password: string;
}
