import { Get, Post, Body, Put, Delete, Param, Controller, UsePipes, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Response } from 'express';
import { TodoService } from './todo.service';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo';
import { UpdateTodoDto } from './dto/update-todo';
import { IdParam } from './dto/id-param';

@Controller('todo')
export class TodoController {

    constructor(private readonly todoService: TodoService) { }

    @Get('all')
    findAll(): Promise<Todo[]> {
        return this.todoService.findAll();
    }

    @Post('one')
    async findOne(@Query('id') id: string): Promise<Todo> {
        return this.todoService.findOne(id);
    }

    @Post('create')
    create(@Body() createTodorDto: CreateTodoDto): Promise<Todo> {
        return this.todoService.create(createTodorDto);
    }

    @Put('update')
    update(@Query('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<void> {
        return this.todoService.update(id, updateTodoDto);
    }

    @Delete('delete')
    remove(@Query('id') id: string): Promise<void> {
        return this.todoService.remove(id);
    }
}