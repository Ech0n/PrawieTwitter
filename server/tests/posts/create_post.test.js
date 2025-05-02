import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPost } from '../../controllers/postsController';
import db from '../../models';

describe('createPost', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should create a post and return it', async () => {
    const req = {
      body: {
        content: 'Test post',
        owner_id: 1
      }
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const fakePost = {
      id: 123,
      content: 'Test post',
      owner_id: 1,
      photo_path: null
    };

    db.Post.create = vi.fn().mockResolvedValue(fakePost);

    await createPost(req, res);

    expect(db.Post.create).toHaveBeenCalledWith(expect.objectContaining({
      content: 'Test post',
      owner_id: 1
    }));

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Post created',
      newPost: fakePost
    });
  });
});
