import request from 'supertest';
import { describe, it, expect, beforeAll } from 'vitest';
import app from '../../../app';
import db from '../../../models';

describe('PUT /posts/:postID', () => {
  let createdPost;
  let testUser;

  beforeAll(async () => {
    testUser = await db.User.create({
      username: 'testuser',
      email: 'testuser@example.com',
      password_hash: 'dummyhash123'
    });

    createdPost = await db.Post.create({
      owner_id: testUser.id,
      content: 'Original content',
    });
  });

  it('should update the post content if post exists', async () => {
    const response = await request(app)
      .put(`/posts/${createdPost.id}`)
      .send({
        content: 'Updated content',
      });

    expect(response.status).toBe(200);
    expect(response.body.content).toBe('Updated content');
  });

  it('should return 404 if the post does not exist', async () => {
    const response = await request(app)
      .put('/posts/999999')
      .send({
        content: 'Should not work',
      });

    expect(response.status).toBe(404);
    expect(response.body.message).toBe('Post with selected id not found');
  });
});
