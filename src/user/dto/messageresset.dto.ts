import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@ObjectType()
export class MessageReset {
  @Field()
  message: string;
}
