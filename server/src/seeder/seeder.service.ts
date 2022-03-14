import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTodoDto } from 'src/todo/dto/create-todo';
import { Todo } from '../todo/todo.entity';

@Injectable()
export class Seeder {
    constructor(
        @InjectRepository(Todo)
        private readonly todoRepository: Repository<Todo>,
    ) { }
    async seed() {
        const todoCount = await this.todoRepository.count();
        if (todoCount < 5) {
            for (let i = 0; i < 5; i++) {
                try {
                    await this.todoRepository.save(<CreateTodoDto>{
                        title: `title_seed_${i}`,
                        description: '',
                        completed: Math.random() < 0.5
                    });
                } catch (err) {
                    throw err;
                }
            }
        }
    }
}