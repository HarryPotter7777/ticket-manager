import { IsNotEmpty, IsOptional, IsString, IsBoolean } from 'class-validator';

export class CreateTodoDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsBoolean()
    @IsOptional()
    completed: boolean = false;
}