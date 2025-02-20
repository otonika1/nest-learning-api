import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { PropertyService } from './property.service';
import { CreatePropertyDto } from './dto/createProperty.dto';
import { UpdatePropertyDto } from './dto/updateProperty.dto';
import { PagginationDto } from './dto/paggination.dto';

@Controller('property')
export class PropertyController {
    constructor(private readonly propService: PropertyService) {}
    @Get('all')
    findAll(@Query() pagginationDto:PagginationDto){
        return this.propService.getAllProperty(pagginationDto)
    }
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id){
        return this.propService.getById(id);
    }

    @Post('create')
    @UsePipes(new ValidationPipe)
    @HttpCode(200)
    create(@Body() obj:CreatePropertyDto){
        return this.propService.createProperty(obj)
    }

    @Patch(':id')
    async update(@Param('id', ParseIntPipe) id, @Body() body:UpdatePropertyDto){
        
        return await this.propService.updateProperty(id, body);
    }

    @Delete(':id')
    delete(@Param('id', ParseIntPipe) id){
        return this.propService.deleteProperty(id)
    }
}
