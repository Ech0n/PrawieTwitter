import request from 'supertest';
import app from '../../../app';
import db from '../../../models';
import PasswordManager from '../../../auth/passwordManager';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';

describe('POST and GET /post_likes/:postID', () => {
  const user = {
    email: 'nowaklike@example.com',
    username: 'nowaklike',
    password: 'Like123!',
  };

  let agent;
  let testPost;
  let createdUser;

  beforeAll(async () => {
    await db.PostLikes.destroy({ where: {} });
    await db.Post.destroy({ where: { content: 'Post do polubienia' } });
    await db.User.destroy({ where: { email: user.email } });

    createdUser = await db.User.create({
      username: user.username,
      email: user.email,
      password_hash: PasswordManager.hash(user.password),
    });

    testPost = await db.Post.create({
      owner_id: createdUser.id,
      content: 'Post do polubienia',
    });

    agent = request.agent(app);
    await agent
      .post('/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(200);
  });

  afterAll(async () => {
    await db.PostLikes.destroy({ where: { post_id: testPost.id } });
    await db.Post.destroy({ where: { id: testPost.id } });
    await db.User.destroy({ where: { id: createdUser.id } });
  });

  it('should like the post', async () => {
    const res = await agent
      .post(`/post_likes/${testPost.id}`)
      .expect(201);

    expect(res.body).toHaveProperty('message', 'Post liked');

    const like = await db.PostLikes.findOne({
      where: {
        post_id: testPost.id,
        user_id: createdUser.id,
      },
    });
    expect(like).not.toBeNull();
  });

  it('should get post likes with count', async () => {
    const res = await request(app)
      .get(`/post_likes/${testPost.id}`)
      .expect(200);

    expect(res.body).toHaveProperty('likes');
  });
});
