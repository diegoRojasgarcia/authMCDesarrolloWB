import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Users } from 'src/user/entities/user.entity';

@ObjectType()
export class ValidateUserResponse {
  @Field()
  id: number;

  @IsString()
  @Field()
  email: string;

  @IsString()
  @Field()
  name: string;

  @IsString()
  @Field()
  accessToken?: string;
}
