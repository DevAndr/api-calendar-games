import { IListGame } from '@server/lists/types';
import { User } from '@server/users/entities/user.entity';
import { ACCESS } from '@server/types';
import { GameOfList } from '@server/lists/entities/list.entity';

export class CreateListDto implements IListGame {
  access: ACCESS;
  description: string;
  games: GameOfList[];
  name: string;
  uid: User;
}
