import { IsInt, IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";

export interface IQueryPagination {
  limit: number;
  page: number;
}
export class QueryPaginationDto implements IQueryPagination {
  @Min(10)
  @Type(() => Number)
  limit: number;
  @Min(0)
  @Type(() => Number)
  page: number;
}

export class SearchGameDto implements IQueryPagination {
  @Min(10)
  @Type(() => Number)
  limit: number;
  @Min(0)
  @Type(() => Number)
  page: number;
  search: string;
}
