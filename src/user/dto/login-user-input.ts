import { Field, InputType } from '@nestjs/graphql';

@InputType() // Ensure this decorator is present
export class LoginUserInput {
  @Field() // Ensure this decorator is present for each field
  email: string;

  @Field()
  password: string;
}
