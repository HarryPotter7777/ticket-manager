import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { TodoModule } from './todo/todo.module';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    TodoModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
