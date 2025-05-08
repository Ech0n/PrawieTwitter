import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getUser } from '../../controllers/usersController';
import db from '../../models';

describe('getUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return user data if user exists', async () => {
    const mockUser = {
      username: 'tester',
      name: 'john',
      email: 'johnthegrandetester@test.com'
    };

    const req = { params: { userID: 1 } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.User.findOne = vi.fn().mockResolvedValue(mockUser);

    await getUser(req, res);

    expect(db.User.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      attributes: { exclude: ['password_hash', 'id'] }
    });

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(mockUser);
  });

  it('should return message if user not found', async () => {
    const req = { params: { userID: 999 } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.User.findOne = vi.fn().mockResolvedValue(null);

    await getUser(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User with selected id not found'
    });
  });
});
