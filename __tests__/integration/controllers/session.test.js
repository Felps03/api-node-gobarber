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

  // it('[FAIL] connect in system', async () => {
  //   const user = await factory.attrs('User');

  //   const responseRegister = await request(app)
  //     .post('/user')
  //     .send(user);

  //   // console.log(responseRegister.body.email);

  //   // console.log(user.password);
  // });
});
