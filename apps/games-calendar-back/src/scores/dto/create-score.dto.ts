import { IsNotEmpty, Max, Min } from 'class-validator';

export class CreateScoreDto {
  @IsNotEmpty()
  idGame: string;
  @IsNotEmpty()
  @Min(0)
  @Max(10)
  value: number;
}
