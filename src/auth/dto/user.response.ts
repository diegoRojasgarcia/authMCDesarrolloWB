import { Field, ObjectType } from '@nestjs/graphql';
import { Users } from 'src/user/entities/user.entity';

@ObjectType()
export class UserResponse {
  @Field()
  access_token: string;

  @Field()
  user: Users;
}
