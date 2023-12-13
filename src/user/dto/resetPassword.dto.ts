import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MinLength } from 'class-validator';

@InputType()
export class ResetPasswordDto {
  @IsNotEmpty()
  @IsString()
  @Field()
  token: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  @Field()
  newPassword: string;
}
