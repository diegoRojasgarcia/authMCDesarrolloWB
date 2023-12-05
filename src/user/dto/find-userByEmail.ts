import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail } from 'class-validator';

@InputType()
export class FindUserByEmailInput {
  @IsEmail()
  @IsNotEmpty()
  @Field()
  email?: string;
}
