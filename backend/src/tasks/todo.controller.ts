import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Delete,
  UsePipes,
  ValidationPipe,
  NotFoundException,
  Patch,
} from '@nestjs/common';
import { CreateTodoItemDto } from './dto/create-todo-item.dto';
import { TodoService } from './todo.service';
import { IdValidationPipe } from '../pipes/id-validation.pipe';
import { TODOITEM_NOT_FOUND_ERROR } from './todo.constants.dto';

@Controller('tasks')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  async findAll() {
    return await this.todoService.getAll();
  }

  @Get(':id')
  async findById(@Param('id', IdValidationPipe) id: string) {
    const todoItem = await this.todoService.getById(id);
    if (!todoItem) {
      throw new NotFoundException(TODOITEM_NOT_FOUND_ERROR);
    }
    return todoItem;
  }

  @UsePipes(new ValidationPipe())
  @Post()
  async create(@Body() todoItem: CreateTodoItemDto) {
    return await this.todoService.create(todoItem);
  }

  @UsePipes(new ValidationPipe())
  @Patch(':id')
  async update(
    @Param('id', IdValidationPipe) id: string,
    @Body() todoItem: CreateTodoItemDto,
  ) {
    const updatedItem = await this.todoService.update(id, todoItem);
    if (!updatedItem) {
      throw new NotFoundException(TODOITEM_NOT_FOUND_ERROR);
    }
    return updatedItem;
  }

  @Delete(':id')
  async remove(@Param('id', IdValidationPipe) id: string) {
    const deletedItem = await this.todoService.remove(id);
    if (!deletedItem) {
      throw new NotFoundException(TODOITEM_NOT_FOUND_ERROR);
    }
    return deletedItem;
  }
}
