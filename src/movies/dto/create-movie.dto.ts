import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMovieDto {
  @IsString()
  @IsNotEmpty()
  public name: string;

  @IsString()
  @IsNotEmpty()
  public image: string;

  @IsNumber()
  @IsNotEmpty()
  public release_year: number;
}
export class QueryDTO {
  @IsString()
  public query: string;
}
