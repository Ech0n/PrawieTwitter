import express from 'express';
import bodyParser from 'body-parser';
import request from 'supertest';
import db from '../../../models';
import PasswordManager from '../../../auth/passwordManager';
import commentRouter from '../../../routes/comments';
import { describe, it, expect, beforeAll, afterAll } from 'vitest';

describe('Comment actions (GET, PUT, DELETE)', () => {
  const user = {
    email: 'edituser@example.com',
    username: 'nowak',
    password: 'EditPass123',
  };

  let isolatedApp;
  let createdUser;
  let testPost;
  let testComment;

  beforeAll(async () => {
    await db.Comment.destroy({ where: {} });
    await db.Post.destroy({ where: { content: 'Edit post' } });
    await db.User.destroy({ where: { email: user.email } });

    createdUser = await db.User.create({
      username: user.username,
      email: user.email,
      password_hash: await PasswordManager.hash(user.password),
    });

    testPost = await db.Post.create({
      owner_id: createdUser.id,
      content: 'Edit post',
    });

    testComment = await db.Comment.create({
      owner_id: createdUser.id,
      post_id: testPost.id,
      content: 'Original content',
    });

    isolatedApp = express();
    isolatedApp.use(bodyParser.json());
    isolatedApp.use((req, res, next) => {
      req.user = { id: createdUser.id };
      next();
    });
    isolatedApp.use('/comments', commentRouter);
  });

  afterAll(async () => {
    await db.Comment.destroy({ where: { post_id: testPost.id } });
    await db.Post.destroy({ where: { id: testPost.id } });
    await db.User.destroy({ where: { id: createdUser.id } });
  });

  it('should return comments for a post', async () => {
    const res = await request(isolatedApp)
      .get(`/comments/${testPost.id}`)
      .expect(200);

    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body[0].content).toBe('Original content');
  });

  it('should update a comment', async () => {
    const res = await request(isolatedApp)
      .put(`/comments/${testComment.id}`)
      .send({ content: 'Updated comment content' })
      .expect(200);

    expect(res.body.content).toBe('Updated comment content');
    expect(res.body.post_id).toBe(testPost.id);
    expect(res.body.owner_id).toBe(createdUser.id);
  });

  it('should delete a comment', async () => {
    const newComment = await db.Comment.create({
      owner_id: createdUser.id,
      post_id: testPost.id,
      content: 'To be deleted',
    });

    const res = await request(isolatedApp)
      .delete(`/comments/${newComment.id}`)
      .expect(200);

    expect(res.body).toEqual({ message: 'Successfully deleted Comment' });

    const deleted = await db.Comment.findByPk(newComment.id);
    expect(deleted).toBeNull();
  });
});
