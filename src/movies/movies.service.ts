import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieDocument, Movie } from 'src/schemas/Movie.schema';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private MovieModel: Model<MovieDocument>,
  ) {}
  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    return new this.MovieModel(createMovieDto).save();
  }

  findAll() {
    return this.MovieModel.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} movie`;
  }

  update(id: number, updateMovieDto: UpdateMovieDto) {
    return `This action updates a #${id} movie`;
  }

  remove(id: number) {
    return `This action removes a #${id} movie`;
  }
}
