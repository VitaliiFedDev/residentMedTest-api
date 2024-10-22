import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { UserData } from './user-data.entity'; // Adjust the import according to your file structure

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => String)
  email: string;

  @Column()
  @Field(() => String)
  username: string;

  @Column()
  @Field(() => String)
  password: string;

  @OneToOne(() => UserData, { nullable: true }) // Define the relationship
  @JoinColumn() // Specify that this is the owning side of the relationship
  @Field(() => UserData, { nullable: true }) // Make it nullable in GraphQL
  userData?: UserData; // Optional, can be null
}
