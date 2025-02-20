import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { PropertyFeature } from 'src/entities/propertyFeature.entity';
import { User } from 'src/entities/user.entity';
@Module({
  imports:[TypeOrmModule.forFeature([User, PropertyFeature, Property,])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
