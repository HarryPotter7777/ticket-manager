import { Test, TestingModule } from '@nestjs/testing';
import { CreateTodoDto } from './dto/create-todo';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';

const createTodoDto: CreateTodoDto = {
    title: 'yolo',
    description: 'allo',
    completed: false
};

describe('TodoController', () => {
    let todoController: TodoController;
    let todoService: TodoService;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [TodoController],
            providers: [
                TodoService,
                {
                    provide: TodoService,
                    useValue: {
                        create: jest
                            .fn()
                            .mockImplementation((todo: CreateTodoDto) =>
                                Promise.resolve({ id: '1', ...todo }),
                            ),
                        findAll: jest.fn().mockResolvedValue([
                            {
                                title: 'yolo',
                                description: 'allo',
                                completed: false
                            },
                            {
                                title: 'yolo',
                                description: 'allo',
                                completed: false
                            },
                        ]),
                        findOne: jest.fn().mockImplementation((id: string) =>
                            Promise.resolve({
                                title: 'yolo',
                                description: 'allo',
                                completed: false
                            }),
                        ),
                        update: jest.fn().mockImplementation((id: string) =>
                            Promise.resolve({
                                title: 'yolo',
                                description: 'allo',
                                completed: false
                            }),
                        ),
                        remove: jest.fn(),
                    },
                },
            ],
        }).compile();

        todoController = app.get<TodoController>(TodoController);
        todoService = app.get<TodoService>(TodoService);
    });

    it('should be defined', () => {
        expect(todoController).toBeDefined();
    });

    describe('create()', () => {
        it('should create a todo', () => {
            todoController.create(createTodoDto);
            expect(todoController.create(createTodoDto)).resolves.toEqual({
                id: '1',
                ...createTodoDto,
            });
            expect(todoService.create).toHaveBeenCalledWith(createTodoDto);
        });
    });

    describe('findAll()', () => {
        it('should find all todo ', () => {
            todoController.findAll();
            expect(todoService.findAll).toHaveBeenCalled();
        });
    });

    describe('findOne()', () => {
        it('should find a todo', () => {
            expect(todoController.findOne('1')).resolves.toEqual({
                title: 'yolo',
                description: 'allo',
                completed: false
            });
            expect(todoService.findOne).toHaveBeenCalled();
        });
    });

    describe('remove()', () => {
        it('should remove the todo', () => {
            todoController.remove('2');
            expect(todoService.remove).toHaveBeenCalled();
        });
    });

    describe('update()', () => {
        it('should update a todo', () => {
            todoController.update('1', createTodoDto);
            expect(todoService.update).toHaveBeenCalled();
        });
    });
});