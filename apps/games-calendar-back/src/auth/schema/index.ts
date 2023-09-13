import { Prop, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema({
  versionKey: false,
  timestamps: true,
  collection: 'refreshTokens',
})
export class RefreshToken {
  @Prop()
  _id: ObjectId;

  @Prop({
    required: true,
    unique: true,
    ref: 'User',
  })
  user: ObjectId;

  @Prop({
    required: true,
    type: String,
  })
  refreshToken: string;
}
