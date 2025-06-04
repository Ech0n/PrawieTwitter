const express = require('express');
const request = require('supertest');
const baseApp = require('../../../app');
const db = require('../../../models');

describe('POST and GET /comments/:postID', () => {
  let createdUser;
  let testPost;
  let commentText = "testowy komentarz";

  let testApp;

  beforeAll(async () => {
    createdUser = await db.User.create({
      username: 'nowak',
      email: 'nowak@example.com',
      password_hash: 'fakehash'
    });

    testPost = await db.Post.create({
      owner_id: createdUser.id,
      title: 'Test post',
      content: 'Test content'
    });

    testApp = express();
    testApp.use((req, res, next) => {
      req.user = { id: createdUser.id };
      next();
    });
    testApp.use(baseApp);
  });

  afterAll(async () => {
    await db.Comment.destroy({ where: { post_id: testPost.id } });
    await db.Post.destroy({ where: { id: testPost.id } });
    await db.User.destroy({ where: { id: createdUser.id } });
  });

  it('should create a comment on the post', async () => {
    const res = await request(testApp)
      .post(`/comments/${testPost.id}`)
      .send({ content: commentText });

    expect(res.statusCode).toBe(201);
    expect(res.body).toMatchObject({
      owner_id: createdUser.id,
      post_id: `${testPost.id}`,
      content: commentText
    });
  });

  it('should fetch all comments for the post', async () => {
    const res = await request(testApp)
      .get(`/comments/${testPost.id}`);

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.some(c => c.content === commentText)).toBe(true);
  });
});
