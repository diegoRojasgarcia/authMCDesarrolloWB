import { Field, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Users } from 'src/user/entities/user.entity';

@ObjectType()
export class UserResponse {
  @IsString()
  @Field()
  access_token: string;

  @Field()
  user: Users;
}
