import { JwtGuard } from './../guards/jwt.guards';
import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto, QueryDTO } from './dto/create-movie.dto';

@Controller('movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @Post('add-movie')
  @UseGuards(JwtGuard)
  create(@Body() createMovieDto: CreateMovieDto) {
    console.log(createMovieDto);

    return this.moviesService.create(createMovieDto);
  }

  @Get()
  @UseGuards(JwtGuard)
  findAll() {
    return this.moviesService.findAll();
  }

  @Post('search')
  @UseGuards(JwtGuard)
  findByName(@Body() query: QueryDTO) {
    return this.moviesService.findByName(query);
  }
}
