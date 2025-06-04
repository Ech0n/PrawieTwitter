import request from 'supertest';
import app from '../../../app';
import db from '../../../models';
import PasswordManager from '../../../auth/passwordManager';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';

describe('POST /auth/login', () => {
  const testUser = {
    email: 'test@example.com',
    username: 'testuser',
    password: 'Password123',
  };

  beforeAll(async () => {
    await db.User.destroy({ where: { email: testUser.email } });
    await db.User.destroy({ where: { username: testUser.username } });
    await db.User.create({
      username: testUser.username,
      email: testUser.email,
      password_hash: await PasswordManager.hash(testUser.password),
    });
  });

  afterAll(async () => {
    await db.User.destroy({
      where: {
        email: testUser.email,
        username: testUser.username,
      },
    });
  });

  it('should authenticate with valid credentials', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: testUser.password,
      })
      .expect(200);

    expect(res.body).toEqual({ message: 'Authenticated successfully' });
    expect(res.headers['set-cookie']).toBeDefined();
  });

  it('should fail with wrong password', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: testUser.email,
        password: 'WrongPassword!',
      })
      .expect(400);

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Bad Credentials');
  });

  it('should fail if user not found', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: 'nonexistent@example.com',
        password: 'Password123',
      })
      .expect(400);

    expect(res.body).toHaveProperty('error');
    expect(res.body.error).toBe('Bad Credentials');
  });
});
