import { Field, InputType } from '@nestjs/graphql';
import { IsInt, IsString } from 'class-validator';

@InputType()
export class updatePasswordDto {
  @IsString()
  @Field()
  oldpassword: string;

  @IsString()
  @Field()
  password: string;

  @IsString()
  @Field()
  confirmpassword: string;
}
