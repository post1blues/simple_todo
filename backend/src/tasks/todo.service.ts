import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TodoItem, TodoItemDocument } from './schemas/todo-item.schema';
import { Model } from 'mongoose';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(TodoItem.name)
    private readonly todoItemModel: Model<TodoItemDocument>,
  ) {}

  async getAll(): Promise<TodoItem[]> {
    return this.todoItemModel.find().exec();
  }

  async getById(id: string): Promise<TodoItem> {
    return this.todoItemModel.findById(id).exec();
  }

  async create(todoItemDto: CreateTodoItemDto): Promise<TodoItem> {
    return this.todoItemModel.create(todoItemDto);
  }

  async update(id: string, todoItemDto: CreateTodoItemDto): Promise<TodoItem> {
    return this.todoItemModel
      .findByIdAndUpdate(id, todoItemDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<TodoItem> {
    return this.todoItemModel.findByIdAndRemove(id);
  }
}
