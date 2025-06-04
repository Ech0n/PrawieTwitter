import request from 'supertest';
import app from '../../../app';
import db from '../../../models';
import PasswordManager from '../../../auth/passwordManager';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';

describe('DELETE /comments/:commentID', () => {
  const user = {
    email: 'nowak@example.com',
    username: 'nowak',
    password: 'Secret123',
  };

  let agent;
  let testPost;
  let testComment;
  let createdUser;

  beforeAll(async () => {
    await db.Comment.destroy({ where: {} });
    await db.Post.destroy({ where: { content: 'Post do usuwania komentarzy' } });
    await db.User.destroy({ where: { email: user.email } });

    createdUser = await db.User.create({
      username: user.username,
      email: user.email,
      password_hash: await PasswordManager.hash(user.password),
    });

    testPost = await db.Post.create({
      owner_id: createdUser.id,
      content: 'Post do usuwania komentarzy',
    });

    testComment = await db.Comment.create({
      owner_id: createdUser.id,
      content: 'Komentarz do usunięcia',
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

  it('should delete a comment by ID', async () => {
    const res = await agent
      .delete(`/comments/${testComment.id}`)
      .expect(200);

    expect(res.body).toEqual({ message: 'Successfully deleted Comment' });

    const check = await db.Comment.findByPk(testComment.id);
    expect(check).toBeNull();
  });

  it('should return 404 if comment does not exist', async () => {
    const res = await agent.delete('/comments/999999').expect(404);

    expect(res.body).toEqual({
      message: 'Comment with selected id not found',
    });
  });
});
