import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { PropertyFeatureService } from './property-feature.service';
import { CreatePropertyDto } from 'src/property/dto/createProperty.dto';
import { UpdatePropertyDto } from 'src/property/dto/updateProperty.dto';
import { CreatePropertyFeatureDto } from './dto/createPropertyFeature.dto';
import { UpdatePropertyFeatureDto } from './dto/updatePropertyFeature.dto';

@Controller('property-feature')
export class PropertyFeatureController {
    constructor(private readonly propFeatService: PropertyFeatureService) {}
    @Get('all')
    findAll(){
        return this.propFeatService.getAllPropertyFeature()
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id){
        return this.propFeatService.getById(id);
    }

    @Post('create')
    @UsePipes(new ValidationPipe)
    @HttpCode(200)
    create(@Body() obj:CreatePropertyFeatureDto){
        console.log(obj);
        
        return this.propFeatService.createPropertyFeature(obj)
    }

    @Patch(':id')
    update(@Param('id', ParseIntPipe) id, @Body() body:UpdatePropertyFeatureDto){
        this.propFeatService.updatePropertyFeature(id, body)
        return body;
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id){
        return this.propFeatService.deletePropertyFeature(id)
    }
}
