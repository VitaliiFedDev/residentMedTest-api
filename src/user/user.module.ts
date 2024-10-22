import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserResolver } from './user.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserData } from './entities/user-data.entity';

@Module({
  providers: [UserResolver, UserService],
  imports: [TypeOrmModule.forFeature([User, UserData])],
})
export class UserModule {}
