import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class UpdateTodoDto {
    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    completed?: boolean;
}