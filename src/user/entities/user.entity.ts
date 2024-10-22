/* eslint-disable @typescript-eslint/no-unused-vars */

import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field((type) => String)
  email: string;

  @Column()
  @Field((type) => String)
  username: string;

  @Column()
  @Field((type) => String)
  password: string;
}
