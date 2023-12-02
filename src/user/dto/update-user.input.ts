import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UpdateUserDto {
  @Field(() => Int)
  id?: number;

  @Field()
  email: string;

  @Field()
  name: string;
}
