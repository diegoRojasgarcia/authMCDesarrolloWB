import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class PasswordResetDto {
  @IsNotEmpty()
  @IsEmail()
  @Field()
  email: string;
}
