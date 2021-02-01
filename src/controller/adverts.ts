import { Response } from 'express';
import { ExtraRequest } from '../types';
import { Advert } from '../models';

export async function allAdvertisement(
  req: ExtraRequest,
  res: Response
): Promise<void | Response> {
  try {
    const adverts = await Advert.find().populate('comments').populate('user');

    return res
      .status(200)
      .send({ status: 'success', message: 'Adverts found', adverts });
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error.message });
  }
}

export async function oneAdvertisement(
  req: ExtraRequest,
  res: Response
): Promise<void | Response> {
  try {
    const { id } = req.params;
    const advert = await Advert.findById(id)
      .populate('comments')
      .populate('user');
    if (!advert)
      return res
        .status(404)
        .send({ status: 'error', message: 'Advert not found' });

    return res
      .status(200)
      .send({ status: 'success', message: 'Advert found', advert });
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error.message });
  }
}

export async function createAdvertisement(
  req: ExtraRequest,
  res: Response
): Promise<void | Response> {
  try {
    const {
      body: { title, imageUrl, type, description },
      currentUser,
    } = req;
    const newAdvert = new Advert({
      title,
      imageUrl,
      type,
      description,
      user: currentUser._id,
    });

    const advert = await newAdvert.save();

    return res
      .status(201)
      .send({ status: 'success', message: 'Advert created', advert });
  } catch (error) {
    return res.status(500).send({ status: 'error', message: error.message });
  }
}
