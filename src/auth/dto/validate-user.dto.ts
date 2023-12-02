import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { Users } from 'src/user/entities/user.entity';

@ObjectType()
export class ValidateUserDto {
  @IsString()
  @Field()
  email: string;

  @Field()
  pass: string;
}
