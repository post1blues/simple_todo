import { Module } from '@nestjs/common';
import { TodoController } from './todo.controller';
import {MongooseModule} from "@nestjs/mongoose";
import {TodoItem, TodoItemSchema} from "./schemas/todo-item.schema";
import { TodoService } from './todo.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: TodoItem.name, schema: TodoItemSchema}
    ])
  ],
  providers: [TodoService],
  controllers: [TodoController],
})
export class TodoModule {}
