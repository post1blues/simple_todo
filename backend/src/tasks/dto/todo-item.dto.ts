import { IsBoolean, IsDate, IsString } from 'class-validator';

export class TodoItemDto {
  @IsString()
  id: string;

  @IsString()
  text: string;

  @IsBoolean()
  isCompleted: boolean;

  @IsDate()
  createdAt: Date;

  @IsDate()
  updatedAt: Date;
}
