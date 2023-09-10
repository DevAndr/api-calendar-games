import {Prop, Schema} from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({required: true, unique: true, type: String})
    email: string
    @Prop({required: true, type: String})
    password: string
}
