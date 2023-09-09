import { HydratedDocument } from 'mongoose';
import { SchemaFactory } from '@nestjs/mongoose';
import { List } from "../entities/list.entity";

export type ListDocument = HydratedDocument<List>;
export const ListSchema = SchemaFactory.createForClass(List);
