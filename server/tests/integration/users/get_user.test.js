import request from 'supertest';
import app from '../../../app';
import db from '../../../models';
import PasswordManager from '../../../auth/passwordManager';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('GET /users/:id', () => {
  let testUser;

  beforeAll(async () => {
    await db.User.destroy({ where: { email: 'getuser@example.com' } });
    testUser = await db.User.create({
      username: 'getuser',
      email: 'getuser@example.com',
      password_hash: await PasswordManager.hash('Get123!'),
    });
  });

  afterAll(async () => {
    await db.User.destroy({ where: { id: testUser.id } });
  });

  it('should return user data (excluding id and password_hash)', async () => {
    const res = await request(app).get(`/users/${testUser.id}`).expect(200);

    expect(res.body).toMatchObject({
      username: testUser.username,
      email: testUser.email,
    });

    expect(res.body).not.toHaveProperty('id');
    expect(res.body).not.toHaveProperty('password_hash');
  });

  it('should return message when user not found', async () => {
    const res = await request(app).get('/users/999999').expect(200);

    expect(res.body).toEqual({
      message: 'User with selected id not found',
    });
  });
});
