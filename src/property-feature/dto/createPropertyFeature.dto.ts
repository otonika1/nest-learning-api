import { IsBoolean, IsNumber, IsPositive, IsString } from "class-validator";

export class CreatePropertyFeatureDto{
    @IsNumber()
    bedroom:number;
    @IsNumber()
    kitchen:number;
    @IsBoolean()
    hasYard:boolean;
    @IsNumber()
    propertyId:number
}