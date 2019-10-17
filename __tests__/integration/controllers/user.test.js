import request from 'supertest';
import app from '../../../src/app';

import truncate from '../../util/truncate';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('should be able to register', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: "Felipe Santos",
        email: "felipe@gmail.com",
        password: "123456"
      });

    expect(response.status).toBe(200);
  });

  it('should not be able to register with dublicated email', async () => {
    await request(app)
      .post('/user')
      .send({
        name: "Felipe Santos",
        email: "felipe@gmail.com",
        password: "123456"
      });

    const response = await request(app)
      .post('/user')
      .send({
        name: "Felipe Santos",
        email: "felipe@gmail.com",
        password: "123456"
      });

    expect(response.status).toBe(400);
  })

});
