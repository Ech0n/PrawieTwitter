import request from 'supertest';
import app from '../../../app';
import db from '../../../models';
import PasswordManager from '../../../auth/passwordManager';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('GET /users', () => {
  let testUser;

  beforeAll(async () => {
    await db.User.destroy({ where: { email: 'getall@example.com' } });
    testUser = await db.User.create({
      username: 'getalluser',
      email: 'getall@example.com',
      password_hash: await PasswordManager.hash('SomePass123'),
    });
  });

  afterAll(async () => {
    await db.User.destroy({ where: { id: testUser.id } });
  });

  it('should return a list of users including the test user', async () => {
    const res = await request(app).get('/users').expect(200);

    expect(Array.isArray(res.body.users)).toBe(true);
    expect(res.body.users.some(u => u.email === testUser.email)).toBe(true);
  });
});
