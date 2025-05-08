import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updatePost } from '../../controllers/postsController';
import db from '../../models';

describe('updatePost', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update post content if post exists', async () => {
    const req = {
      params: { postID: 1},
      body: { content: 'Updated content' },
      file: undefined
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const existingPost = {
      id: 1,
      owner_id: 1,
      content: 'Old content'
    };

    const updatedPost = {
      id: 1,
      owner_id: 1,
      content: 'Updated content'
    };

    db.Post.findOne = vi.fn()
      .mockResolvedValueOnce(existingPost)
      .mockResolvedValueOnce(updatedPost);

    db.Post.update = vi.fn().mockResolvedValue([1]);

    await updatePost(req, res);

    expect(db.Post.findOne).toHaveBeenCalledWith({
      where: { id: 1 }
    });

    expect(db.Post.update).toHaveBeenCalledWith(
      { content: 'Updated content' },
      { where: { id: 1 } }
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(updatedPost);
  });

  it('should return 404 if post does not exist', async () => {
    const req = {
      params: { postID: 999 },
      body: { content: 'New content' },
      file: undefined
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.Post.findOne = vi.fn().mockResolvedValue(null);

    await updatePost(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Post with selected id not found'
    });
  });
});
