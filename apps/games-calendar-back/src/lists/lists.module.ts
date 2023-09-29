import { Module } from '@nestjs/common';
import { ListsService } from './lists.service';
import { ListsController } from './lists.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { List } from './entities/list.entity';
import { ListSchema } from './schema/List.schema';
import { GamesModule } from '@server/games/games.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: List.name, schema: ListSchema, collection: 'lists' },
    ]),
    GamesModule,
  ],
  controllers: [ListsController],
  providers: [ListsService],
})
export class ListsModule {}
