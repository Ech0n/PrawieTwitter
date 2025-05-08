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
      const mockLikesCount = 5;
      db.CommentLikes.count = vi.fn().mockResolvedValue(mockLikesCount);

      await getCommentLikes(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ likes: mockLikesCount });
    });

    it('should return 500 if an error occurs', async () => {
      const errorMessage = 'Database error';
      db.CommentLikes.count = vi.fn().mockRejectedValue(new Error(errorMessage));

      await getCommentLikes(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });

  describe('likeUnlikeComment', () => {
    it('should add a like to the comment and increment the like count', async () => {
      const mockExistingLike = null;
      db.CommentLikes.findOne = vi.fn().mockResolvedValue(mockExistingLike);
      db.CommentLikes.create = vi.fn().mockResolvedValue({ comment_id: '123', user_id: 1 });
      db.Comment.increment = vi.fn().mockResolvedValue([1]);

      await likeUnlikeComment(req, res);

      expect(db.CommentLikes.create).toHaveBeenCalledWith({
        user_id: 1,
        comment_id: '123',
      });
      expect(db.Comment.increment).toHaveBeenCalledWith(
        { likes_count: 1 },
        { where: { id: '123' } }
      );
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Comment liked', newLike: { comment_id: '123', user_id: 1 } });
    });

    it('should remove the like from the comment and decrement the like count', async () => {
      const mockExistingLike = { destroy: vi.fn() };
      db.CommentLikes.findOne = vi.fn().mockResolvedValue(mockExistingLike);
      db.Comment.increment = vi.fn().mockResolvedValue([1]);

      await likeUnlikeComment(req, res);

      expect(mockExistingLike.destroy).toHaveBeenCalled();
      expect(db.Comment.increment).toHaveBeenCalledWith(
        { likes_count: -1 },
        { where: { id: '123' } }
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Comment unliked' });
    });

    it('should return 500 if an error occurs while liking/unliking the comment', async () => {
      const errorMessage = 'Database error';
      db.CommentLikes.findOne = vi.fn().mockRejectedValue(new Error(errorMessage));

      await likeUnlikeComment(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
    });
  });
});
