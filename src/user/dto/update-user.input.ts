import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInput } from './create-user.input';
import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto extends PartialType(CreateUserInput) {
  @Field(() => Int)
  id?: number;

  @Field()
  email?: string;

  @Field()
  name?: string;
}
