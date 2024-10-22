import { Field, InputType } from '@nestjs/graphql';

@InputType() // Ensure this decorator is present
export class CreateUserDataInput {
  @Field()
  userId: number;

  @Field({ nullable: true }) // This field can be null
  specialization?: string; // Mark as optional with `?`

  @Field({ nullable: false }) // This field is required
  yearOfStudy: string;

  @Field({ nullable: true }) // This field can be null
  state?: string; // Mark as optional with `?`

  @Field({ nullable: true }) // This field can be null
  city?: string;

  @Field({ nullable: true })
  radius?: number;
}
