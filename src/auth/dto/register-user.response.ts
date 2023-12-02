import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Users } from 'src/user/entities/user.entity';

@ObjectType()
export class RegisterUserResponse {
  user: Users;

  access_token: string;
}
