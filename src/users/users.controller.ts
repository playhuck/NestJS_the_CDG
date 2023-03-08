import { Controller } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/models/entities/user.entity';

@Controller('users')
export class UsersController {}
