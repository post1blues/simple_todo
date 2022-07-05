import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import { Document} from 'mongoose'

export type TodoItemDocument = TodoItem & Document

@Schema({timestamps: true})
export class TodoItem {
  @Prop({required: true})
  text: string

  @Prop({default: false})
  isCompleted: boolean
}

export const TodoItemSchema = SchemaFactory.createForClass(TodoItem)