import { IListGame } from '@server/lists/types';
import { User } from '@server/users/entities/user.entity';
import { ACCESS } from '@server/types';
import { GameOfList } from '@server/lists/entities/list.entity';
import { Game } from '@server/games/entities/game.entity';

export class CreateListDto implements Omit<IListGame, 'uid'> {
  access: ACCESS;
  description: string;
  games: Game[];
  name: string;
  uid: string;
}
