import request from 'supertest';
import app from '../../../app';
import db from '../../../models';
import PasswordManager from '../../../auth/passwordManager';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';

describe('DELETE /api/posts/:postID', () => {
  const user = {
    email: 'kasia@example.com',
    username: 'kasia',
    password: 'Kasia123!',
  };

  let agent;
  let createdUser;
  let testPost;

  beforeAll(async () => {
    await db.Post.destroy({ where: { content: 'Post do usunięcia' } });
    await db.User.destroy({ where: { email: user.email } });

    createdUser = await db.User.create({
      username: user.username,
      email: user.email,
      password_hash: await PasswordManager.hash(user.password),
    });

    testPost = await db.Post.create({
      owner_id: createdUser.id,
      content: 'Post do usunięcia',
    });

    agent = request.agent(app);
    await agent
      .post('/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(200);
  });

  afterAll(async () => {
    await db.Post.destroy({ where: { id: testPost.id } });
    await db.User.destroy({ where: { id: createdUser.id } });
  });

  it('should delete a post', async () => {
    const res = await agent
      .delete(`/api/posts/${testPost.id}`)
      .expect(200);

    expect(res.body).toHaveProperty('message', 'Successfully deleted Post');

    const post = await db.Post.findByPk(testPost.id);
    expect(post).toBeNull();
  });

  it('should return 400 for invalid postID', async () => {
    const res = await agent
      .delete('/api/posts/invalid')
      .expect(400);

    expect(res.body).toHaveProperty('errors');
  });

  it('should return 200 and message if post does not exist', async () => {
    const res = await agent
      .delete('/api/posts/999999')
      .expect(200);

    expect(res.body).toHaveProperty('message', 'Post with selected id not found');
  });
});
