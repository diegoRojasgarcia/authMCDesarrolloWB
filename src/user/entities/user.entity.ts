import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  Unique,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ObjectType, Field, Int, Directive } from '@nestjs/graphql';

@Entity()
@ObjectType()
@Directive('@key(fields: "id")')
export class Users {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column({ nullable: true })
  @Unique(['email']) // Indica que el campo debe ser único en la columna "email"
  @Field()
  email: string;

  @Column({ nullable: true })
  @Field()
  name: string;

  @Column()
  @Field()
  password: string;

  @Column()
  @Field()
  accessToken?: string;

  @CreateDateColumn({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  public created_at: Date;

  @UpdateDateColumn({
    type: 'date',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  @Field()
  public updated_at: Date;
}
