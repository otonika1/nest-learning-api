import { Type } from "class-transformer";
import { ArrayNotEmpty, IsArray, IsBoolean, IsNumber, IsPositive, IsString, ValidateNested } from "class-validator";

export class CreateUserDto{
    @IsString()
    firstName:string;
    @IsString()
    lastName:string;
    @IsString()
    identificationCode:string;
    @IsString()
    password:string;
    @IsString()
    email:string;
}