import { Transform } from 'class-transformer';
import { IsInt } from 'class-validator';

export class PhotoPageDto {
    @IsInt()
    @Transform(({ value }) => parseInt(value))
    readonly page: number

    @IsInt()
    @Transform(({ value }) => parseInt(value))
    readonly limit: number
}