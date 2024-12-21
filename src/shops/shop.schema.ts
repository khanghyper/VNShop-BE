import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Document, Schema as MongooseSchema } from 'mongoose';

export type ShopDocument = Document<Shop>;

const DOCUMENT_NAME = 'Shop';
const COLLECTION_NAME = 'Shops';

@Schema({
  collection: COLLECTION_NAME,
  timestamps: true
})
export class Shop extends Document {
  @Prop({
    type: String,
    required: true,
    trim: true,
    maxlength: 100,
  })
  name: string;

  @Prop({
    type: String,
    required: true,
    unique: true,
    match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  })
  email: string;

  @Prop({
    type: String,
    required: true
  })
  password: string;

  @Prop({
    type: String,
    enum: ['active', 'inactive'],
    default: 'inactive'
  })
  status: string;

  @Prop({
    type: MongooseSchema.Types.Boolean,
    default: false
  })
  verify: boolean;

  @Prop({
    type: MongooseSchema.Types.Array,
    default: []
  })
  roles: string[];

  @Prop({
    type: MongooseSchema.Types.Array,
    default: []
  })
  refreshTokensUsed: string[];

  @Prop({
    type: String,
  })
  refreshToken: string;
}

export const ShopSchema = SchemaFactory.createForClass(Shop);

//--------------------------------------------------------------------------------------

