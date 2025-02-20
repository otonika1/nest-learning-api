import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from 'src/entities/property.entity';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { User } from 'src/entities/user.entity';
import { PagginationDto } from './dto/paggination.dto';

@Injectable()
export class PropertyService {
    constructor(@InjectRepository(Property) private propertyRepo: Repository<Property>, @InjectRepository(User) private usersRepo: Repository<User>){}
    async getAllProperty(pagginationDto:PagginationDto){
        return await this.propertyRepo.findAndCount({
            relations:['user'],
            skip:pagginationDto.page,
            take:pagginationDto.limit
        })
    }
    async createProperty(obj: CreatePropertyDto) {
        let user = null
        if(obj.userId){
            user = await this.usersRepo.findOne({ where: { id: obj.userId } })
            if (!user) {
                throw new NotFoundException('user with id ' + obj.userId + ' cant be found');
            }
        }
        const property = { ...obj, user }
        
        return await this.propertyRepo.save(property)
    }
    async getById(id: number) {
        const property = await this.propertyRepo.findOne({
            where: {id:id},
            relations:['user']
        })
        if(!property) throw new NotFoundException({message: "Property with id " + id + " not found"});
        return property;
    }
    async updateProperty(id: number, obj: UpdatePropertyDto) {
        let user = null
        const property = await this.propertyRepo.findOne({where: { id: id } });
        if (!property) {
            throw new NotFoundException('Property with id ' + id + ' not found');
        }
        if(obj.userId){
            user = await this.usersRepo.findOne({ where: { id: obj.userId } })
            if (!user) {
                throw new NotFoundException('user with id ' + obj.userId + ' cant be found');
            }
        }
        const propertyUpdate = { ...obj, user }
        await this.propertyRepo.update({ id }, propertyUpdate)
        return await this.propertyRepo.findOne({where: { id: id } }); 
        
    }
    async deleteProperty(id:number){
        const property = await this.propertyRepo.findOne({
            where: {id:id}
        })
        if(!property) throw new NotFoundException({message: "Property with id " + id + " not found"});
        await this.propertyRepo.delete(id)
        return property
    }
}
