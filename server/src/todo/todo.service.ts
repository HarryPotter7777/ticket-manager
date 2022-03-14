import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Repository, getRepository, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Todo } from './todo.entity';
import { CreateTodoDto } from './dto/create-todo';
import { UpdateTodoDto } from './dto/update-todo';
import { IdParam } from './dto/id-param';

@Injectable()
export class TodoService {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>
    ) { }

    create(createTodoDto: CreateTodoDto): Promise<Todo> {
        const todo = new Todo();
        todo.title = createTodoDto.title;
        todo.description = createTodoDto.description ?? '';
        todo.completed = createTodoDto.completed ?? false;
        return this.todoRepository.save(todo);
    }

    findAll(): Promise<Todo[]> {
        return this.todoRepository.find({
            order: {
                updated_at: 'DESC'
            }
        });
    }

    findOne(id: string): Promise<Todo> {
        return this.todoRepository.findOne(id);
    }

    async update(id: string, updateTodoDto: UpdateTodoDto): Promise<void>  {
        const todo = await this.todoRepository.findOne(id);
        if (!todo) throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        await this.todoRepository.save({ ...todo, ...updateTodoDto });
    }

    async remove(id: string): Promise<void> {
        const todo = await this.todoRepository.findOne(id);
        if (!todo) throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        await this.todoRepository.delete(id);
    }
}