import { Body, Controller, Delete, Get, HttpCode, Param, ParseIntPipe, Patch, Post, Req, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { CreatePropertyFeatureDto } from 'src/property-feature/dto/createPropertyFeature.dto';
import { UpdatePropertyFeatureDto } from 'src/property-feature/dto/updatePropertyFeature.dto';
import { UpdateUserDto } from './dto/UpdateUser.dto';
import { CreateUserDto } from './dto/CreateUser.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { Roles } from 'src/auth/decorators/roles.decoratos';
import { Role } from 'src/auth/enums/roles.enum';
import { RolesGuard } from 'src/auth/guards/roles/roles.guard';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
        @UseGuards(JwtAuthGuard)
        @Get('all')
        findAll(){
            return this.userService.getAll()
        }
        /* @Get(':id')
        findOne(@Param('id', ParseIntPipe) id){
            return this.userService.getById(id);
        } */
        @Roles(Role.ADMIN)
        @UseGuards(RolesGuard)
        @UseGuards(JwtAuthGuard)
        @Get('profile/:id')
        getProfile(@Param('id', ParseIntPipe) id){
            return this.userService.getById(id);
        }
        @Post('create')
        @UsePipes(new ValidationPipe)
        @HttpCode(200)
        create(@Body() obj:CreateUserDto){            
            return this.userService.create(obj)
        }
        @UseGuards(JwtAuthGuard)
        @Patch(':id')
        async update(@Param('id', ParseIntPipe) id, @Body() body:UpdateUserDto){
            return await this.userService.update(id, body);
        }
        @UseGuards(JwtAuthGuard)
        @Delete(':id')
        delete(@Param('id', ParseIntPipe) id){
            return this.userService.delete(id)
        }
}
