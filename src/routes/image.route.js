import express from 'express';

import { ImageController } from '../controllers/image.controller.js';
import validate from '../middlewares/validate.js';
import rateLimiter from '../middlewares/rateLimiter.js';
import { validateImageResize } from '../validations/image.validation.js';

const router = express.Router();

router.route('/resize').get(rateLimiter, validate(validateImageResize), ImageController.resizeImage);

export const ImageRoute = router;