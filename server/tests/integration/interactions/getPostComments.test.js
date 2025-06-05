import request from 'supertest';
import app from '../../../app';
import db from '../../../models';
import PasswordManager from '../../../auth/passwordManager';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';

describe('GET /api/comments/:postID', () => {
  const user = {
    email: 'nowak@example.com',
    username: 'nowak',
    password: 'Secret123',
  };

  let agent;
  let testPost;
  let createdUser;

  beforeAll(async () => {
    await db.Comment.destroy({ where: {} });
    await db.Post.destroy({ where: { content: 'Post do pobrania komentarzy' } });
    await db.User.destroy({ where: { email: user.email } });

    createdUser = await db.User.create({
      username: user.username,
      email: user.email,
      password_hash: await PasswordManager.hash(user.password),
    });

    testPost = await db.Post.create({
      owner_id: createdUser.id,
      content: 'Post do pobrania komentarzy',
    });

    await db.Comment.bulkCreate([
      {
        owner_id: createdUser.id,
        content: 'Pierwszy komentarz',
        post_id: testPost.id,
      },
      {
        owner_id: createdUser.id,
        content: 'Drugi komentarz',
        post_id: testPost.id,
      },
    ]);

    agent = request.agent(app);
    await agent
      .post('/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(200);
  });

  afterAll(async () => {
    await db.Comment.destroy({ where: { post_id: testPost.id } });
    await db.Post.destroy({ where: { id: testPost.id } });
    await db.User.destroy({ where: { id: createdUser.id } });
  });

  it('should return all comments for a given post', async () => {
    const res = await agent.get(`/api/comments/${testPost.id}`).expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(2);
    expect(res.body[0]).toHaveProperty('content');
    expect(res.body[0]).toHaveProperty('post_id');
    expect(Number(res.body[0].post_id)).toBe(testPost.id);
  });

  it('should return empty array if no comments exist', async () => {
    const newPost = await db.Post.create({
      owner_id: createdUser.id,
      content: 'Pusty post',
    });

    const res = await agent.get(`/api/comments/${newPost.id}`).expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBe(0);

    await db.Post.destroy({ where: { id: newPost.id } });
  });

  it('should return 200 for post with no auth required', async () => {
    const res = await request(app).get(`/api/comments/${testPost.id}`).expect(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
