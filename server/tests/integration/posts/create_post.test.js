import request from 'supertest';
import app from '../../../app';
import db from '../../../models';
import PasswordManager from '../../../auth/passwordManager';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';

describe('POST /posts', () => {
  const user = {
    email: 'nowakpost@example.com',
    username: 'nowakpost',
    password: 'Post123!',
  };

  let agent;
  let createdUser;

  beforeAll(async () => {
    await db.Post.destroy({ where: { content: 'Nowy post testowy' } });
    await db.User.destroy({ where: { email: user.email } });

    createdUser = await db.User.create({
      username: user.username,
      email: user.email,
      password_hash: PasswordManager.hash(user.password),
    });

    agent = request.agent(app);
    await agent
      .post('/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(200);
  });

  afterAll(async () => {
    await db.Post.destroy({ where: { content: 'Nowy post testowy' } });
    await db.User.destroy({ where: { id: createdUser.id } });
  });

  it('should create a post', async () => {
    const res = await agent
      .post('/posts')
      .send({
        owner_id: createdUser.id,
        content: 'Nowy post testowy',
      })
      .expect(201);

    expect(res.body).toHaveProperty('newPost');
    expect(res.body.newPost).toHaveProperty('id');
    expect(res.body.newPost).toHaveProperty('owner_id', createdUser.id);
    expect(res.body.newPost).toHaveProperty('content', 'Nowy post testowy');
  });
});
