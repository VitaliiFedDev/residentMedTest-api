import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { LoginUserInput } from './dto/login-user-input';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  register(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.register(createUserInput);
  }

  @Mutation(() => User)
  login(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.userService.login(loginUserInput);
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    return this.userService.findAll();
  }
}
