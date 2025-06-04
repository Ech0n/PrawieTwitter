import request from 'supertest';
import app from '../../../app';
import db from '../../../models';
import PasswordManager from '../../../auth/passwordManager';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';

describe('GET /posts and /posts/:postID', () => {
  const user = {
    email: 'getposts@example.com',
    username: 'getposts',
    password: 'Posts123!',
  };

  let createdUser;
  let testPost;

  beforeAll(async () => {
    await db.Post.destroy({ where: { content: 'Post do pobrania' } });
    await db.User.destroy({ where: { email: user.email } });

    createdUser = await db.User.create({
      username: user.username,
      email: user.email,
      password_hash: await PasswordManager.hash(user.password),
    });

    testPost = await db.Post.create({
      owner_id: createdUser.id,
      content: 'Post do pobrania',
    });
  });

  afterAll(async () => {
    await db.Post.destroy({ where: { id: testPost.id } });
    await db.User.destroy({ where: { id: createdUser.id } });
  });

  it('should return all posts', async () => {
    const res = await request(app).get('/posts').expect(200);

    expect(res.body).toHaveProperty('posts');
    expect(Array.isArray(res.body.posts)).toBe(true);
    const found = res.body.posts.find(p => p.id === testPost.id);
    expect(found).toBeDefined();
  });

  it('should return a single post by ID', async () => {
    const res = await request(app)
      .get(`/posts/${testPost.id}`)
      .expect(200);

    expect(res.body).toHaveProperty('id', testPost.id);
    expect(res.body).toHaveProperty('content', 'Post do pobrania');
  });

  it('should return 400 for invalid ID', async () => {
    const res = await request(app)
      .get('/posts/abc')
      .expect(400);

    expect(res.body).toHaveProperty('errors');
  });

  it('should return message for non-existent post', async () => {
    const res = await request(app)
      .get('/posts/999999')
      .expect(200);

    expect(res.body).toHaveProperty('message', 'Post with selected id not found');
  });
});
