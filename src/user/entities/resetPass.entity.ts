import { Field, ObjectType } from '@nestjs/graphql';
import { Column, Entity } from 'typeorm';

@Entity()
@ObjectType()
export class resetPassResponse {
  @Column()
  @Field()
  message: string;
}
