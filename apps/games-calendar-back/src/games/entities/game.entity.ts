import {Prop, Schema} from '@nestjs/mongoose';

@Schema()
export class Game {
    @Prop({type: String})
    title: string;

    @Prop({type: String})
    img: string;

    @Prop({type: String})
    description: string;

    @Prop({type: String})
    dateRelease: string;

    @Prop({type: [String]})
    categories: string[];

    @Prop({type: [String]})
    platforms: string[];
}
