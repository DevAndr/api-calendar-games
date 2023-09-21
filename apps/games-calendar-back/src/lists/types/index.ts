import { ACCESS } from '@server/types';
import { User } from '@server/users/entities/user.entity';
import { GameOfList } from '@server/lists/entities/list.entity';

export interface IListGame {
  uid: User;
  name: string;
  description: string;
  games: GameOfList[];
  access: ACCESS;
}

export type ListGameThin = IListGame & {
  _id: string;
};

export type GameOfListType = {
  id: string;
  rating: number;
};
