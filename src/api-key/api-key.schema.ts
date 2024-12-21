import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Schema as MongooseSchema } from 'mongoose';

export type ApikeyDocument = Document<Apikey>;

const DOCUMENT_NAME = 'Apikey';
const COLLECTION_NAME = 'Apikeys';

@Schema({
  collection: COLLECTION_NAME,
  timestamps: true
})
export class Apikey extends Document {
  @Prop({
    type: String,
    required: true,
    unique: true
  })
  key: string;

  @Prop({
    type: Boolean,
    default: true
  })
  status: boolean;

  @Prop({
    type: [String],
    required: true,
    enum: ['0000', '1111', '2222']

  })
  permissions: string[];

}

export const ApikeySchema = SchemaFactory.createForClass(Apikey);

//--------------------------------------------------------------------------------------

