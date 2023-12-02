import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class TokenResponse {
  @IsString()
  @Field()
  token: string;
}
