import { model, Schema } from 'mongoose';

const commentSchema = new Schema(
  {
    location: String,
    content: String,
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    advert: {
      type: Schema.Types.ObjectId,
      ref: 'Advert',
    },
  },
  {
    timestamps: true,
  }
);

const comments = model('Comment', commentSchema);

export default comments;
