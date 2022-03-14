import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { INestApplication } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { TodoModule } from './../src/todo/todo.module';
import { Todo } from '../src/todo/todo.entity';
import { Connection, getConnectionOptions } from 'typeorm';

describe('TodoController (e2e)', () => {
    let app: INestApplication;
    let connection: Connection;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [
                TodoModule,
                TypeOrmModule.forRootAsync({
                    useFactory: async () => {
                        const config = await getConnectionOptions();
                        return <TypeOrmModuleOptions>{
                            ...config, entities: [Todo],
                            logging: false, synchronize: true,
                            database: 'test',
                            host: 'test_postgres_db'
                        };
                    }
                })
            ],
        })
            .compile();
        app = moduleFixture.createNestApplication();
        connection = app.get(Connection);
        app.useGlobalPipes(new ValidationPipe({
            transform: true
        }));
        app.setGlobalPrefix('api');
        await app.init();
    });

    afterEach(async () => {
        await connection.synchronize(true);
    })

    it(`/CREATE todo`, async () => {
        const todo = { id: 1, title: 'test', description: 'hello world', completed: false };
        const response = await request(app.getHttpServer())
            .post('/api/todo/create')
            .send(todo)
            .expect(201);
        expect(response.body).toEqual(expect.objectContaining(todo));
    });

    it(`/CREATE a todo with an empty description`, async () => {
        const todo = { id: 1, title: 'test', completed: false };
        const response = await request(app.getHttpServer())
            .post('/api/todo/create')
            .send(todo)
            .expect(201);
        expect(response.body).toEqual(expect.objectContaining({ ...todo, description: "" }));
    });

    it(`/FIND ONE todo`, async () => {
        const todo = { id: 1, title: 'test', description: 'hello world', completed: false };
        const response = await request(app.getHttpServer())
            .post('/api/todo/create')
            .send(todo)
            .expect(201);
        expect(response.body).toEqual(expect.objectContaining(todo));
        const findOne = await request(app.getHttpServer())
            .post('/api/todo/one')
            .query({ id: 1 })
            .expect(201);
        expect(findOne.body).toEqual(expect.objectContaining(todo));
    });

    it(`/FIND ALL todo`, async () => {
        let todos = [];

        const todo = { id: 1, title: 'test', description: 'hello world', completed: false };
        todos.push(todo);
        const response = await request(app.getHttpServer())
            .post('/api/todo/create')
            .send(todo)
            .expect(201);
        expect(response.body).toEqual(expect.objectContaining(todo));

        const todo2 = { id: 2, title: 'test 2', description: 'hello world 2', completed: false };
        todos.push(todo2);
        const response2 = await request(app.getHttpServer())
            .post('/api/todo/create')
            .send(todo2)
            .expect(201);
        expect(response2.body).toEqual(expect.objectContaining(todo2));

        const findAll = await request(app.getHttpServer())
            .get('/api/todo/all')
            .expect(200);
        expect(findAll.body).toEqual(expect.arrayContaining([
            expect.objectContaining(todos[0]),
            expect.objectContaining(todos[1])
        ]));
    });

    it(`/UPDATE todo`, async () => {
        // intialize two todo
        const todo = { id: 1, title: 'test', description: 'hello world', completed: false };
        const response = await request(app.getHttpServer())
            .post('/api/todo/create')
            .send(todo)
            .expect(201);
        expect(response.body).toEqual(expect.objectContaining(todo));

        const todo2 = { id: 2, title: 'test 2', description: 'hello world 2', completed: false };
        const response2 = await request(app.getHttpServer())
            .post('/api/todo/create')
            .send(todo2)
            .expect(201);
        expect(response2.body).toEqual(expect.objectContaining(todo2));

        // update 2nd todo
        const update = await request(app.getHttpServer())
            .put(`/api/todo/update?id=2`)
            .send({
                title: 'Update title',
                description: 'Update todo',
                completed: true
            })
            .expect(200);

        // find updated todo
        const updatedTodo = await request(app.getHttpServer())
            .post('/api/todo/one')
            .query({ id: 2 })
            .expect(201);
        expect(updatedTodo.body).toEqual(expect.objectContaining({
            id: 2,
            title: 'Update title',
            description: 'Update todo',
            completed: true
        }));

        // check if todos are sorted by date
        const findAll = await request(app.getHttpServer())
            .get('/api/todo/all')
            .expect(200);
        expect(findAll.body).toEqual(expect.arrayContaining([
            expect.objectContaining(updatedTodo.body),
        ]));
    });

    afterAll(async () => {
        await app.close();
    })
});