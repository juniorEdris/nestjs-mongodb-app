import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop()
  name: string;

  @Prop()
  image: string;

  @Prop()
  release_year: string;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
