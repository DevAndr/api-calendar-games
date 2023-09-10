import { Prop, Schema } from '@nestjs/mongoose';

@Schema()
export class Game {
  @Prop()
  title: string;

  @Prop()
  img: string;

  @Prop()
  description: string;

  @Prop()
  dateRelease: string;

  @Prop([String])
  categories: string[];

  @Prop([String])
  platforms: string[];
}
