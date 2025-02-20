import { IsNumber, IsOptional, IsPositive } from "class-validator";

export class PagginationDto{

    @IsNumber()
    @IsPositive()
    @IsOptional()
    page:number;

    @IsNumber()
    @IsPositive()
    @IsOptional()
    limit:number;
}