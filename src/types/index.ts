import { Request } from 'express';

export interface ICommentObject {
  _id: string;
  location: string;
  content: string;
  user: string | IUserObject;
  advert: string | IAdvertsObject;
}

export interface IAdvertsObject {
  _id: string;
  title: string;
  imageUrl: string;
  type: string;
  description: string;
  found: boolean;
  user: string | IUserObject;
  comments: ICommentObject[];
}

export interface IUserObject {
  _id: string;
  name: string;
  email: string;
  adverts: IAdvertsObject[];
}

export interface ExtraRequest extends Request {
  currentUser: IUserObject;
}
