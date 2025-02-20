import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PropertyFeature } from 'src/entities/propertyFeature.entity';
import { Repository } from 'typeorm';
import { CreatePropertyFeatureDto } from './dto/createPropertyFeature.dto';
import { UpdatePropertyFeatureDto } from './dto/updatePropertyFeature.dto';
import { Property } from 'src/entities/property.entity';

@Injectable()
export class PropertyFeatureService {
    constructor(@InjectRepository(PropertyFeature) private propertyFeatureRepo: Repository<PropertyFeature>, @InjectRepository(Property) private propertyRepo: Repository<Property>){}
    async getAllPropertyFeature(){
        return await this.propertyFeatureRepo.find({
            relations: ['property'],
        })
    }
    async createPropertyFeature(obj:CreatePropertyFeatureDto){
        const propertyExists = await this.propertyFeatureRepo.findOne({where:{property:{id: obj.propertyId}}})
        if(propertyExists){
            throw new ConflictException('Property feature with id ' + obj.propertyId + ' already exists');
        }
        const property = await this.propertyRepo.findOne({where:{id: obj.propertyId}})
        if (!property) {
            throw new NotFoundException('Property with id ' + obj.propertyId + ' cant be found');
        }
        const propertyFeature = {...obj, property}
        return await this.propertyFeatureRepo.save(propertyFeature)
    }
    async getById(id: number) {
        const property = await this.propertyFeatureRepo.findOne({
            where: {id:id},
            
        })
        if(!property) throw new NotFoundException({message: "Property with id " + id + " not found"});
        return property;
    }
    async updatePropertyFeature(id:number,obj:UpdatePropertyFeatureDto){   
        const notFound = await this.propertyFeatureRepo.findOne({
            where: {id:id},
            
        })
        if(!notFound) throw new NotFoundException({message: "Property with id " + id + " not found"}); 
        const propertyExists = await this.propertyFeatureRepo.findOne({where:{property:{id: obj.propertyId}}})
        if(propertyExists){
            throw new ConflictException('Property feature with id ' + obj.propertyId + ' already exists');
        }
        const property = await this.propertyRepo.findOne({where:{id: obj.propertyId}})
        if (!property) {
            throw new NotFoundException('Property with id ' + obj.propertyId + ' cant be found');
        }
        
        const propertyFeature = {...obj,property: property}
        
        return await this.propertyFeatureRepo.update({id},propertyFeature)  
    }
    async deletePropertyFeature(id:number){
        const property = await this.propertyFeatureRepo.findOne({
            where: {id:id}
        })
        if(!property) throw new NotFoundException({message: "Property with id " + id + " not found"});
        await this.propertyFeatureRepo.delete(id)
        return property
    }

}
