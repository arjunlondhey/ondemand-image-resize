import Joi from 'joi';

const validateImageResize = {
  query: {
    url: Joi.string().uri().required(),
    height: Joi.number().min(10).required(),
    width: Joi.number().min(10).required()
  },
};

export {
  validateImageResize,
};