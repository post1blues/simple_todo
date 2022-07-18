import { IsBoolean, IsString } from 'class-validator';

export class CreateTodoItemDto {
  @IsString()
  text: string;

  @IsBoolean()
  isCompleted: boolean;
}
