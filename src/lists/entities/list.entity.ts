import { Prop, Schema } from "@nestjs/mongoose";
import { ACCESS } from "../../types";

@Schema({
  timestamps: true,
})
export class List {
  @Prop()
  title: string;

  @Prop()
  access: ACCESS;

  @Prop()
  games: string[];

  @Prop()
  description: string;
}
