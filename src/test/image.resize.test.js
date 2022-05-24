import request from 'supertest';
import { expect } from 'chai';

import app from '../app.js';

describe('GET /image/resize', function () {
  const url = 'https://purepng.com/public/uploads/large/purepng.com-shopping-cartshoppingcarttrolleycarriagebuggysupermarkets-1421526532323sy0um.png',
    invalidUrl = 'https://text.onlineviewer.net';

  it('responds with resized image', async function () {
    let response = await request(app)
      .get(`/image/resize?url=${url}&height=300&width=300`)

    expect(response.headers["content-type"]).to.equal('image/png');
    expect(response.status).to.equal(200);
  });

  it('fail if invalid image-url provided', async function () {
    let response = await request(app)
      .get(`/image/resize?url=${invalidUrl}&height=300&width=300`)

    expect(response.status).to.equal(400);
    expect(response.body.msg).to.equal('Invalid image provided in the request');
  });

});