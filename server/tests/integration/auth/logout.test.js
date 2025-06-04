import request from 'supertest';
import app from '../../../app';
import db from '../../../models';
import PasswordManager from '../../../auth/passwordManager';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';

describe('POST /auth/logout', () => {
  const testUser = {
    email: 'logouttest@example.com',
    username: 'logoutuser',
    password: 'Logout123!',
  };

  let cookie;

  beforeAll(async () => {
    await db.User.destroy({ where: { email: testUser.email } });
    await db.User.create({
      username: testUser.username,
      email: testUser.email,
      password_hash: await PasswordManager.hash(testUser.password),
    });

    const loginRes = await request(app).post('/auth/login').send({
      email: testUser.email,
      password: testUser.password,
    });

    cookie = loginRes.headers['set-cookie'];
  });

  afterAll(async () => {
    await db.User.destroy({ where: { email: testUser.email } });
  });

  it('should log out successfully', async () => {
    const res = await request(app)
      .post('/auth/logout')
      .set('Cookie', cookie)
      .expect(200);

    expect(res.text).toBe('OK');
  });

  it('should return 401 when logging out again', async () => {
    const res = await request(app)
      .post('/auth/logout')
      .set('Cookie', cookie)
      .expect(401);
  });
});
