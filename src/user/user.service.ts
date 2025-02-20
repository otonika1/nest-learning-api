import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Property } from 'src/entities/property.entity';
import { PropertyFeature } from 'src/entities/propertyFeature.entity';
import { User } from 'src/entities/user.entity';
import { CreatePropertyFeatureDto } from 'src/property-feature/dto/createPropertyFeature.dto';
import { UpdatePropertyFeatureDto } from 'src/property-feature/dto/updatePropertyFeature.dto';
import { In, Repository } from 'typeorm';
import { CreateUserDto } from './dto/CreateUser.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private userRepo: Repository<User>, @InjectRepository(Property) private propertyRepo: Repository<Property>){}
        async getAll(){
            return await this.userRepo.find({
                relations: ['properties'],
            })
        }
        async create(obj:CreateUserDto){
            const user = this.userRepo.create(obj)
            const savedUser = await this.userRepo.save(user)
            return savedUser;
        }
        async findByEmail(email: string){
            return await this.userRepo.findOne({
                where: {
                    email,
                },
            })
        }
        async getById(id: number) {
            return this.userRepo.findOne({
                where: { id },
                select: ["firstName", "lastName", "email", "identificationCode"], // Specify the fields you want
            });
        }
        
        async update(id: number, obj: UpdateUserDto) {
            // Find the existing user
            const user = await this.userRepo.findOne({ where: { id } });
        
            if (!user) throw new NotFoundException({ message: `User with id ${id} not found` });
        
            // If password is being updated, hash it manually
            if (obj.password) {
                obj.password = await bcrypt.hash(obj.password, 10);
            }
        
            // Perform the update
            await this.userRepo.update(id, obj);
        
            // Manually update the user object to reflect the hashed password
            return this.userRepo.findOne({ where: { id } });;
        }
        
        
        async delete(id:number){
            const property = await this.userRepo.findOne({
                where: {id:id}
            })
            if(!property) throw new NotFoundException({message: "Property with id " + id + " not found"});
            await this.userRepo.delete(id)
            return property
        }
}
