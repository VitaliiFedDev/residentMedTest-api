import { Field, InputType } from '@nestjs/graphql';

@InputType() // Ensure this decorator is present
export class CreateUserInput {
  @Field() // Ensure this decorator is present for each field
  email: string;
  @Field() // Ensure this decorator is present for each field
  username: string;
  @Field()
  password: string;
}
