import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsEmail, IsInt } from 'class-validator';

@InputType()
export class FindUserByIdInput {
  @IsInt()
  @IsNotEmpty()
  @Field()
  id: number;
}
