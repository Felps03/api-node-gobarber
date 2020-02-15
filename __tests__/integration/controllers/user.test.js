import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../../src/app';

import truncate from '../../util/truncate';
import factory from '../../factories';

const TOKEN =
  'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNTcxMTA3MDAxLCJleHAiOjE1NzE3MTE4MDF9.KC75v7nWX2o9FuqINiBbQP3pW-fnuI4vhII7oAwkioU';

describe('User', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('[SUCCESS] should be able to register', async () => {
    const user = await factory.attrs('User');

    const response = await request(app)
      .post('/user')
      .send(user);

    expect(response.status).toEqual(200);
  });

  it('[FAIL] should not be able to register with dublicated email', async () => {
    const user = await factory.attrs('User');

    await request(app)
      .post('/user')
      .send(user);

    const response = await request(app)
      .post('/user')
      .send(user);

    expect(response.status).toEqual(400);
    expect(response.body.error).toEqual('User already exists.');
  });

  it('[SUCCESS] should encrypt user password when new user created', async () => {
    const user = await factory.create('User', {
      password: '123456',
    });

    const compareHash = await bcrypt.compare('123456', user.password_hash);

    expect(compareHash).toBe(true);
  });

  it('[FAIL] should fails user without the email when new user created', async () => {
    const response = await request(app)
      .post('/user')
      .send({
        name: 'Felipe',
        password: '123456',
      });

    expect(response.status).toBe(400);
  });

  it('[FAIL] should fails user the email is not validated when new user update', async () => {
    const response = await request(app)
      .put('/user')
      .send({
        email: '123456',
      })
      .set('Authorization', TOKEN);
    expect(response.status).toBe(401);
  });

  it('[FAIL] should fails if updating input in oldPassword different password user', async () => {
    const email = await request(app)
      .post('/user')
      .send({
        name: 'Felipe Santos',
        email: 'felipe@gmail.com',
        password: '123456',
      })
      .then(response => response.body.email);

    const auth = await request(app)
      .post('/sessions')
      .send({
        email,
        password: '123456',
      })
      .then(response => response.body);

    const response = await request(app)
      .put('/user')
      .send({
        email: 'felipesda@gmail.com',
        oldPassword: '654321',
        password: '654321',
        confirmPassword: '654321',
      })
      .set('Authorization', `Bearer ${auth.token}`);

    expect(response.status).toBe(401);
  });
});
