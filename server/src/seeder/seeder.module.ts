import { Module } from '@nestjs/common';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Seeder } from './seeder.service';
import { Todo } from '../todo/todo.entity';
import { getConnectionOptions } from 'typeorm';

/**
 * Import and provide seeder classes.
 *
 * @module
 */
@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: async () => {
                const config = await getConnectionOptions();
                return <TypeOrmModuleOptions>{
                    ...config, entities: [Todo],
                    logging: false, synchronize: true
                };
            }
        }),
        TypeOrmModule.forFeature([Todo])
    ],
    providers: [Seeder],
})
export class SeederModule { }