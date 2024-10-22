import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LoginUserInput } from './dto/login-user-input';
import { UserData } from './entities/user-data.entity';
import { CreateUserDataInput } from './dto/user-data.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(UserData)
    private userDataRepository: Repository<UserData>,
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

  // async createUserData(dto: CreateUserDataInput): Promise<UserData> {
  //   const { userId, ...rest } = dto;

  //   const user = await this.userRepository.findOne({ where: { id: userId } });
  //   if (!user) {
  //     throw new BadRequestException('User not found');
  //   }

  //   // add search here
  //   return await this.userDataRepository.save({ ...rest, user });
  // }

  async createUserData(dto: CreateUserDataInput): Promise<User[]> {
    const { userId, ...rest } = dto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    if (!user) {
      throw new BadRequestException('User not found');
    }

    // Search for users with the same data
    const similarUsers = await this.findSimilarUsers(rest);

    // You may want to do something with similarUsers here, like logging or returning them

    await this.userDataRepository.save({ ...rest, user });

    return similarUsers;
  }

  private normalizeString(input: string): string {
    return input.trim().toLowerCase();
  }

  private async findSimilarUsers(
    data: Partial<CreateUserDataInput>,
  ): Promise<User[]> {
    const queryBuilder = this.userDataRepository.createQueryBuilder('userData');

    queryBuilder.innerJoinAndSelect('userData.user', 'user').where('1=1'); // Always true, allows chaining conditions

    if (data.specialization) {
      queryBuilder.andWhere(
        'LOWER(userData.specialization) = :specialization',
        {
          specialization: this.normalizeString(data.specialization),
        },
      );
    }

    if (data.yearOfStudy) {
      queryBuilder.andWhere('LOWER(userData.yearOfStudy) = :yearOfStudy', {
        yearOfStudy: this.normalizeString(data.yearOfStudy),
      });
    }

    if (data.state) {
      queryBuilder.andWhere('LOWER(userData.state) = :state', {
        state: this.normalizeString(data.state),
      });
    }

    if (data.city) {
      queryBuilder.andWhere('LOWER(userData.city) = :city', {
        city: this.normalizeString(data.city),
      });
    }

    if (data.radius) {
      queryBuilder.andWhere('userData.radius = :radius', {
        radius: data.radius,
      });
    }

    const similarUsersData = await queryBuilder.getMany();
    return similarUsersData.map((userData) => userData.user); // Return only users
  }
}
