import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUserFollowers, getUserFollowing, createFollow, deleteFollow } from '../../controllers/followersController';
import db from '../../models';

describe('Follow Controller', () => {
  let req, res;

  beforeEach(() => {
    vi.restoreAllMocks();

    req = {
      user: { id: 1 },
      params: { userID: '1' },
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  describe('getUserFollowers', () => {
    it('should return 404 if user is not found', async () => {
      vi.spyOn(db.User, 'findByPk').mockResolvedValueOnce(null);

      await getUserFollowers(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 200 and a list of followers if user is found', async () => {
      const mockUser = { id: 1 };
      vi.spyOn(db.User, 'findByPk').mockResolvedValueOnce(mockUser);
      const mockFollowers = [
        { FollowerUser: { username: 'john' } },
        { FollowerUser: { username: 'jane' } }
      ];
      vi.spyOn(db.Followers, 'findAll').mockResolvedValueOnce(mockFollowers);

      await getUserFollowers(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ followers: ['john', 'jane'] });
    });

    it('should return 500 if there is an error', async () => {
      vi.spyOn(db.User, 'findByPk').mockRejectedValueOnce(new Error('Internal error'));

      await getUserFollowers(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal error' });
    });
  });

  describe('getUserFollowing', () => {
    it('should return 404 if user is not found', async () => {
      vi.spyOn(db.User, 'findByPk').mockResolvedValueOnce(null);

      await getUserFollowing(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'User not found' });
    });

    it('should return 200 and a list of following if user is found', async () => {
      const mockUser = { id: 1 };
      vi.spyOn(db.User, 'findByPk').mockResolvedValueOnce(mockUser);
      const mockFollowing = [
        { FollowingUser: { username: 'alice' } },
        { FollowingUser: { username: 'bob' } }
      ];
      vi.spyOn(db.Followers, 'findAll').mockResolvedValueOnce(mockFollowing);

      await getUserFollowing(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ following: ['alice', 'bob'] });
    });

    it('should return 500 if there is an error', async () => {
      vi.spyOn(db.User, 'findByPk').mockRejectedValueOnce(new Error('Internal error'));

      await getUserFollowing(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal error' });
    });
  });

  describe('createFollow', () => {
    it('should return 401 if user is not logged in', async () => {
      req.user = null;

      await createFollow(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden, log in.' });
    });

    it('should return 409 if follow already exists', async () => {
      const existingFollow = { follower_id: 1, following_id: 2 };
      vi.spyOn(db.Followers, 'findOne').mockResolvedValueOnce(existingFollow);

      await createFollow(req, res);

      expect(res.status).toHaveBeenCalledWith(409);
      expect(res.json).toHaveBeenCalledWith({ error: 'Follow already exists.' });
    });

    it('should return 201 if follow is successfully created', async () => {
      const mockFollow = { follower_id: 1, following_id: 2 };
      vi.spyOn(db.Followers, 'findOne').mockResolvedValueOnce(null);
      vi.spyOn(db.Followers, 'create').mockResolvedValueOnce(mockFollow);

      await createFollow(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({ message: 'Succesfully created folllow' });
    });

    it('should return 500 if there is an error', async () => {
      vi.spyOn(db.Followers, 'findOne').mockRejectedValueOnce(new Error('Internal error'));

      await createFollow(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal error' });
    });
  });

  describe('deleteFollow', () => {
    it('should return 401 if user is not logged in', async () => {
      req.user = null;

      await deleteFollow(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden, log in.' });
    });

    it('should return 404 if follow does not exist', async () => {
      const mockFollow = { follower_id: 1, following_id: 2 };
      vi.spyOn(db.Followers, 'findOne').mockResolvedValueOnce(null);

      await deleteFollow(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'No follow found' });
    });

    it('should return 200 and success message if follow is successfully deleted', async () => {
      const mockFollow = { follower_id: 1, following_id: 2, destroy: vi.fn().mockResolvedValue(true) };
      vi.spyOn(db.Followers, 'findOne').mockResolvedValueOnce(mockFollow);
      vi.spyOn(db.Followers, 'destroy').mockResolvedValueOnce(1);

      await deleteFollow(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Successfully deleted follow' });
    });

    it('should return 500 if there is an error', async () => {
      vi.spyOn(db.Followers, 'findOne').mockRejectedValueOnce(new Error('Internal error'));

      await deleteFollow(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal error' });
    });
});
});
