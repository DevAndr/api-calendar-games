import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { MongooseModule } from "@nestjs/mongoose";
import { List } from "./entities/list.entity";
import { ListSchema } from "./schema/List.schema";

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: List.name, schema: ListSchema, collection: 'lists' },
    ]),
  ],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
