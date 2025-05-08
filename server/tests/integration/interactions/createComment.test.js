import request from 'supertest';
import app from '../../../app';
import db from '../../../models';
import PasswordManager from '../../../auth/passwordManager';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('POST /comments/:postID', () => {
  const user = {
    email: 'commenter@example.com',
    username: 'commentQueen',
    password: 'Secret123',
  };

  let agent;
  let testPost;
  let createdUser;

  beforeAll(async () => {
    await db.Comment.destroy({ where: {} });
    await db.Post.destroy({ where: { content: 'Test post for comment' } });
    await db.User.destroy({ where: { email: user.email } });
 
    createdUser = await db.User.create({
      username: user.username,
      email: user.email,
      password_hash: PasswordManager.hash(user.password),
    });

    testPost = await db.Post.create({
      owner_id: createdUser.id,
      content: 'Test post for comment',
    });

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

  it('should create a comment when user is logged in', async () => {
    const res = await agent
      .post(`/comments/${testPost.id}`)
      .send({ content: 'This is a test comment' })
      .expect(201);

    expect(res.body.content).toBe('This is a test comment');
    expect(Number(res.body.post_id)).toBe(testPost.id);
    expect(res.body.owner_id).toBe(createdUser.id);
  });

  it('should return 401 if user is not logged in', async () => {
    const res = await request(app)
      .post(`/comments/${testPost.id}`)
      .send({ content: 'This should fail' })
      .expect(401);

    expect(res.body).toHaveProperty('error', 'Forbidden, log in.');
  });

  it('should return 404 if post does not exist', async () => {
    const res = await agent
      .post('/comments/999999')
      .send({ content: 'No such post' })
      .expect(404);

    expect(res.body).toHaveProperty('error', 'Post not found.');
  });
});
