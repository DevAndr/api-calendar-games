import { IScore } from '@server/scores/types';

export class ScoreDto implements IScore {
  id: string;
  idGame: string;
  uid: string;
  value: number;
}
