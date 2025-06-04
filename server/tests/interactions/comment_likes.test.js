import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getCommentLikes, likeUnlikeComment } from '../../controllers/comment_likesController';
import db from '../../models';

describe('commentController', () => {
  let req, res;

  beforeEach(() => {
    vi.restoreAllMocks();

    req = {
      params: {
        commentID: '123',
      },
      user: {
        id: 1,
      },
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  describe('getCommentLikes', () => {
    it('should return 200 and the number of likes for a comment', async () => {
      db.CommentLikes.count = vi.fn().mockResolvedValue(5);

      await getCommentLikes(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ likes: 5 });
    });

    it('should return 500 if an error occurs', async () => {
      db.CommentLikes.count = vi.fn().mockRejectedValue(new Error('err'));

      await getCommentLikes(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'err' });
    });
  });

  describe('likeUnlikeComment', () => {
    it('should add a like to the comment', async () => {
      db.CommentLikes.findOne = vi.fn().mockResolvedValue(null);
      db.CommentLikes.create = vi.fn().mockResolvedValue({ user_id: 1, comment_id: '123' });

      await likeUnlikeComment(req, res);

      expect(db.CommentLikes.create).toHaveBeenCalledWith({
        user_id: 1,
        comment_id: '123',
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: 'Comment liked',
        newLike: { user_id: 1, comment_id: '123' },
      });
    });

    it('should remove the like from the comment', async () => {
      const mockExistingLike = { destroy: vi.fn() };
      db.CommentLikes.findOne = vi.fn().mockResolvedValue(mockExistingLike);

      await likeUnlikeComment(req, res);

      expect(mockExistingLike.destroy).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Comment unliked' });
    });

    it('should return 500 if an error occurs', async () => {
      db.CommentLikes.findOne = vi.fn().mockRejectedValue(new Error('err'));

      await likeUnlikeComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'err' });
    });
  });
});
