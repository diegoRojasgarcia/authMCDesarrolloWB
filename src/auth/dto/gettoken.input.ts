import { Field, InputType } from '@nestjs/graphql';
import { IsInt } from 'class-validator';

@InputType()
export class GetTokenInput {
  @IsInt()
  @Field()
  id: number;
}
