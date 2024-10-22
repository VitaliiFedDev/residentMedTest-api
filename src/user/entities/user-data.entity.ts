import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity'; // Adjust the import according to your file structure

@Entity()
@ObjectType()
export class UserData {
  @PrimaryGeneratedColumn()
  @Field(() => Int, { nullable: true })
  id: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  specialization?: string;

  @Column()
  @Field(() => String, { nullable: true })
  yearOfStudy: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  state?: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  city?: string;

  @Column({ nullable: true })
  @Field(() => Int, { nullable: true })
  radius?: number;

  @OneToOne(() => User, (user) => user.userData) // Inverse side of the relationship
  @Field(() => User, { nullable: true }) // Make it nullable in GraphQL
  user?: User; // Optional, can be null
}
