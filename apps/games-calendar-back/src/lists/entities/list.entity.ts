import { Prop, Schema } from '@nestjs/mongoose';
import { ACCESS } from '../../types';

@Schema({
  timestamps: true,
})
export class List {
  @Prop({ type: String })
  title: string;

  @Prop({ type: String })
  access: ACCESS;

  @Prop({ type: [String] })
  games: string[];

  @Prop({ type: [String] })
  description: string;
}
