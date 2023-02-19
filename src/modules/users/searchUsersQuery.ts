import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

class SearchUsersQuery {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  search?: string;
}

export default SearchUsersQuery;
