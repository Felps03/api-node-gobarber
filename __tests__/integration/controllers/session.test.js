import request from 'supertest';
import app from '../../../src/app';

import truncate from '../../util/truncate';
import factory from '../../factories';

describe('Session', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('[SUCCESS] Should create a session', async () => {
    const user = await factory.attrs('User');

    let email = user.email;
    let password = user.password;

    await request(app)
      .post('/user')
      .send(user);

    await request(app)
      .post('/sessions')
      .send({
        email,
        password,
      })
      .expect(200)
      .expect('Content-Type', /json/);
  });

  it('[FAIL] Should create a session for user not fount', async () => {
    const user = await factory.attrs('User');

    let password = user.password;

    await request(app)
      .post('/user')
      .send(user);

    let response = await request(app)
      .post('/sessions')
      .send({
        email: 'felipe@gmail.com',
        password,
      })
      .expect(401)
      .expect('Content-Type', /json/);

    expect(response.body.error).toEqual('User not found');
  });

  it('[FAIL] Should create a session for password does not match', async () => {
    const user = await factory.attrs('User');

    let email = user.email;

    await request(app)
      .post('/user')
      .send(user);

    let response = await request(app)
      .post('/sessions')
      .send({
        email,
        password: 'ASDASD12331',
      })
      .expect(401)
      .expect('Content-Type', /json/);

    expect(response.body.error).toEqual('Password does not match');
  });
});
