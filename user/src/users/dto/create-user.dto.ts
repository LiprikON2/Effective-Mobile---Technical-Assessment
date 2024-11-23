import { IsString, IsBoolean, IsEnum, IsDate } from 'class-validator'
import { Type } from 'class-transformer'

export class CreateUserDto {
    @IsString()
    first_name: string

    @IsString()
    last_name: string

    @IsBoolean()
    has_issues?: boolean = false

    @IsEnum(['male', 'female'])
    gender: string

    @Type(() => Date)
    @IsDate()
    birth_date: Date
}
