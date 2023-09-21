import { Min } from 'class-validator';
import { Type } from 'class-transformer';
import { Prop } from '@nestjs/mongoose';

export interface IQueryPagination {
  limit: number;
  page: number;
}

export class QueryPaginationDto implements IQueryPagination {
  @Min(10)
  @Type(() => Number)
  @Prop({ type: Number })
  limit: number;
  @Min(1)
  @Type(() => Number)
  @Prop({ type: Number })
  page: number;
}

export class SearchGameDto implements IQueryPagination {
  @Min(10)
  @Type(() => Number)
  limit: number;
  @Min(1)
  @Type(() => Number)
  page: number;
  search: string;
}
