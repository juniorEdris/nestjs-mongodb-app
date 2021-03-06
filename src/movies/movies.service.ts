import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MovieDocument, Movie } from 'src/schemas/Movie.schema';
import { CreateMovieDto, QueryDTO } from './dto/create-movie.dto';

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

  findByName(query: QueryDTO) {
    const name = { name: query.query };
    return this.MovieModel.find({name: new RegExp(name, 'i')}); // Case Insensetive
  }
}
