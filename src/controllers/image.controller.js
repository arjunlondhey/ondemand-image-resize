import httpStatus from 'http-status';

import catchAsync from '../utils/catchAsync.js';
import { getResizedImage } from '../services/image.service.js';

const resizeImage = catchAsync(async (req, res) => {
  const { resizedImage, headers } = await getResizedImage(req, res);

  res.set('Content-Type', headers['content-type']);
  res.status(httpStatus.OK).send(resizedImage);
});

export const ImageController = { resizeImage };
