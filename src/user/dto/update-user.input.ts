import { Field, InputType } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class UpdateUserDto {
  @IsEmail()
  @Field({ nullable: true })
  email: string;

  @Field({ nullable: true })
  name: string;
}
