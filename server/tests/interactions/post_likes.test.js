import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getPostLikes, likeUnlikePost } from '../../controllers/post_likesController';
import db from '../../models';

describe('Post Controller', () => {
  let req, res;

  beforeEach(() => {
    vi.restoreAllMocks();

    req = {
      user: { id: 1 },
      params: { postID: '1' },
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  describe('getPostLikes', () => {
    it('should return 200 and the number of likes for a post', async () => {
      const mockLikesCount = 5;
      vi.spyOn(db.PostLikes, 'count').mockResolvedValueOnce(mockLikesCount);

      await getPostLikes(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ likes: mockLikesCount });
    });

    it('should return 500 if there is an error fetching likes', async () => {
      vi.spyOn(db.PostLikes, 'count').mockRejectedValueOnce(new Error('Some error'));

      await getPostLikes(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Some error' });
    });
  });

  describe('likeUnlikePost', () => {
    it('should return 201 and a success message if the post is liked', async () => {
      const mockExistingLike = null;
      vi.spyOn(db.PostLikes, 'findOne').mockResolvedValueOnce(mockExistingLike);
      vi.spyOn(db.PostLikes, 'create').mockResolvedValueOnce({});
      vi.spyOn(db.Post, 'increment').mockResolvedValueOnce([1]);

      await likeUnlikePost(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Post liked', newLike: {} });
    });

    it('should return 500 if there is an error liking/unliking the post', async () => {
      vi.spyOn(db.PostLikes, 'findOne').mockRejectedValueOnce(new Error('Some error'));

      await likeUnlikePost(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Some error' });
    });
  });
});
