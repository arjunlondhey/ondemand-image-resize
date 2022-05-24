import axios from 'axios';
import sharp from 'sharp';
import httpStatus from 'http-status';

import { ApiError, ParamMissingError, InvalidInputError } from '../utils/Error.js';
import config from '../config/config.js';

const DEFAULT_REQUEST_TIMEOUT = 10000,
  DEFAULT_RESPONSE_TYPE = 'json',
  DEFAULT_HTTP_METHOD = 'GET';

const _upstream = async (req) => {
  const { url, httpMethod, payload, timeout, responseType, headers } = req;

  if (!url) {
    throw new ParamMissingError(httpStatus.INTERNAL_SERVER_ERROR, 'mandatory param missing in upstream request');
  }

  try {
    const response = await axios.request({
      url: url,
      method: httpMethod || DEFAULT_HTTP_METHOD,
      data: payload,
      headers: headers,
      timeout: timeout || DEFAULT_REQUEST_TIMEOUT,
      responseType: responseType || DEFAULT_RESPONSE_TYPE
    });

    return { data: response.data, headers: response.headers };
  } catch (err) {
    throw new ApiError(err?.response?.status, err?.message);
  }
};

const _fetchImageFromUrl = async (req, url, responseType) => {
  const { data, headers } = await _upstream(Object.assign({ req, url, responseType }));

  // validate if input url path contains image
  if (!config.allowedImageTypes.includes(headers['content-type'])) {
    throw new InvalidInputError(httpStatus.BAD_REQUEST, 'Invalid image provided in the request');
  }

  return { data, headers };
};

const getResizedImage = async (req) => {
  const { url, width, height } = req.query,
    { data, headers } = await _fetchImageFromUrl(req, decodeURI(url), 'stream');

  const pipeline = sharp().resize(width, height),
    resizedImage = await data.pipe(pipeline).toBuffer();

  return { resizedImage, headers };
};

export { getResizedImage }