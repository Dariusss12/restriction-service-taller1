import { IsString, IsUUID, Max, MaxLength, MinLength, } from "class-validator";

export class CreateRestrictionDto {

    @IsUUID()
    studentId: string;

    @IsString()
    @MinLength(3)
    @MaxLength(150)
    description: string;
}
