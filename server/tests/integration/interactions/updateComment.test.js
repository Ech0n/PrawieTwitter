import request from 'supertest';
import app from '../../../app';
import db from '../../../models';
import PasswordManager from '../../../auth/passwordManager';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';

describe('PUT /api/comments/:commentID', () => {
  const user = {
    email: 'nowak2@example.com',
    username: 'nowak2',
    password: 'Secret123',
  };

  let agent;
  let testPost;
  let testComment;
  let createdUser;

  beforeAll(async () => {
    await db.Comment.destroy({ where: {} });
    await db.Post.destroy({ where: { content: 'Post do edycji komentarza' } });
    await db.User.destroy({ where: { email: user.email } });

    createdUser = await db.User.create({
      username: user.username,
      email: user.email,
      password_hash: await PasswordManager.hash(user.password),
    });

    testPost = await db.Post.create({
      owner_id: createdUser.id,
      content: 'Post do edycji komentarza',
    });

    testComment = await db.Comment.create({
      owner_id: createdUser.id,
      content: 'Komentarz do edycji',
      post_id: testPost.id,
    });

    agent = request.agent(app);
    await agent
      .post('/auth/login')
      .send({ email: user.email, password: user.password })
      .expect(200);
  });

  afterAll(async () => {
    await db.Comment.destroy({ where: {} });
    await db.Post.destroy({ where: { id: testPost.id } });
    await db.User.destroy({ where: { id: createdUser.id } });
  });

  it('should update the comment content', async () => {
    const updatedContent = 'Zmieniona treść komentarza';

    const res = await agent
      .put(`/api/comments/${testComment.id}`)
      .send({ content: updatedContent })
      .expect(200);

    expect(res.body).toMatchObject({
      content: updatedContent,
      owner_id: createdUser.id,
      post_id: testPost.id,
    });

    const refreshed = await db.Comment.findByPk(testComment.id);
    expect(refreshed.content).toBe(updatedContent);
  });

  it('should return 404 if comment does not exist', async () => {
    const res = await agent
      .put('/api/comments/999999')
      .send({ content: 'Nowa treść' })
      .expect(404);

    expect(res.body).toEqual({
      message: 'Comment with selected id not found',
    });
  });
});
