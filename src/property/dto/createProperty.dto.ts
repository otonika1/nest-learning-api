import { IsNumber, IsOptional, IsPositive, IsString } from "class-validator";

export class CreatePropertyDto{
    @IsString()
    name:string;
    @IsString()
    description:string;
    @IsNumber()
    @IsPositive()
    price:number;
    @IsNumber()
    @IsOptional()
    userId?:number;
}