import request from 'supertest';
import app from '../../../app';
import db from '../../../models';
import { describe, it, beforeEach, afterAll, expect } from 'vitest';

describe('POST /api/register', () => {
  const baseUser = {
    email: 'newuser@example.com',
    username: 'newuser123',
    password: 'StrongPass1',
    password2: 'StrongPass1',
  };

  beforeEach(async () => {
    await db.User.destroy({ where: { email: baseUser.email } });
    await db.User.destroy({ where: { username: baseUser.username } });
    await db.User.destroy({ where: { email: 'unique@example.com' } });
    await db.User.destroy({ where: { username: 'anyOther' } });
  });

  afterAll(async () => {
    await db.User.destroy({
      where: {
        email: [baseUser.email, 'unique@example.com'],
        username: [baseUser.username, 'anyOther'],
      },
    });
  });

  it('should register a new user with valid data', async () => {
    const res = await request(app)
      .post('/api/register')
      .send(baseUser)
      .expect(201);

    expect(res.body).toEqual({ message: 'User created' });

    const userInDb = await db.User.findOne({ where: { email: baseUser.email } });
    expect(userInDb).not.toBeNull();
    expect(userInDb.username).toBe(baseUser.username);
  });

  it('should reject if email is already used', async () => {
    await db.User.create({
      username: 'anyOther',
      email: baseUser.email,
      password_hash: 'fakehash',
    });

    const res = await request(app)
      .post('/api/register')
      .send(baseUser)
      .expect(400);

    expect(res.body).toEqual({ message: 'Email already in use' });
  });

  it('should reject if username is already used', async () => {
    await db.User.create({
      username: baseUser.username,
      email: 'unique@example.com',
      password_hash: 'fakehash',
    });

    const res = await request(app)
      .post('/api/register')
      .send(baseUser)
      .expect(400);

    expect(res.body).toEqual({ message: 'username already in use' });
  });

  it('should reject if passwords do not match', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ ...baseUser, password2: 'Mismatch123' })
      .expect(400);

    expect(res.body).toHaveProperty('error', 'Passwords do not match');
  });

  it('should reject if password is too weak', async () => {
    const res = await request(app)
      .post('/api/register')
      .send({ ...baseUser, password: '123', password2: '123' })
      .expect(400);

    expect(res.body).toHaveProperty('error');
  });
});
