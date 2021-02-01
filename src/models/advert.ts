import { model, Schema } from 'mongoose';

const advertSchema = new Schema(
  {
    title: String,
    imageUrl: String,
    type: String,
    description: String,
    found: {
      type: Boolean,
      default: false,
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    comments: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Comment',
      },
    ],
  },
  {
    timestamps: true,
  }
);

const adverts = model('Advert', advertSchema);

export default adverts;
