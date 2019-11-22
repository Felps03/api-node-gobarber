import request from 'supertest';
import bcrypt from 'bcryptjs';
import app from '../../../src/app';

import truncate from '../../util/truncate';


describe('Schedule', () => {
  beforeEach(async () => {
    await truncate();
  });

  it('[FAIL] should be able to register', async () => {

    const provider = {}

    const response = await request(app).post('/provider').send(provider);

    expect(response.status).toBe(401);

  })
})