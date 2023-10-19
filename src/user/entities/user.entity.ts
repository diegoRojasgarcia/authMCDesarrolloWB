import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Users {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Unique(['email']) // Indica que el campo debe ser único en la columna "email"
  @Field()
  email: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  accessToken?: string;
}
