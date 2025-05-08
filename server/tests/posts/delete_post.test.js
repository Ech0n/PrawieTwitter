import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deletePost } from '../../controllers/postsController';
import db from '../../models';

describe('deletePost', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete the post if it exists', async () => {
    const req = { params: { postID: 1 } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockPost = { id: 1, content: 'some test content' };

    db.Post.findOne = vi.fn().mockResolvedValue(mockPost);
    db.Post.destroy = vi.fn().mockResolvedValue(1);

    await deletePost(req, res);

    expect(db.Post.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(db.Post.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Successfully deleted Post' });
  });

  it('should return a message if the post does not exist', async () => {
    const req = { params: { postID: 999 } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.Post.findOne = vi.fn().mockResolvedValue(null);

    await deletePost(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Post with selected id not found' });
  });
});
