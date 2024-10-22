import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserInput } from './dto/login-user-input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async register(createUserInput: CreateUserInput): Promise<User> {
    const isUserExist = await this.userRepository.findOne({
      where: { email: createUserInput.email },
    });

    if (isUserExist) {
      throw new BadRequestException('User already exists');
    }

    return await this.userRepository.save(createUserInput);
  }

  async login(loginUserInput: LoginUserInput): Promise<User> {
    const { email, password } = loginUserInput;
    const user = await this.userRepository.findOne({
      where: { email, password },
    });

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    return user;
  }
}
