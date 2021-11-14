import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Coffee extends Document {
    // id: any;
    // save() {
    //   throw new Error('Method not implemented.');
    // }
    @Prop()
    name: string;

    @Prop()
    brand: string;

    @Prop({ default: 0 })
    recommendations: number;

    @Prop([String])
    flavours: string[];
}

export const CoffeeSchema = SchemaFactory.createForClass(Coffee);