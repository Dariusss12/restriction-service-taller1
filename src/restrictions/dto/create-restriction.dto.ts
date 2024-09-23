import { IsString, MaxLength, MinLength, } from "class-validator";

export class CreateRestrictionDto {
    
    @IsString()
    @MinLength(3)
    @MaxLength(150)
    description: string;
}
