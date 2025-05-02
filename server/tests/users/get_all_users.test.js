import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllUser } from '../../controllers/usersController';
import db from '../../models';

describe('getAllUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return all users', async () => {
    const mockUsers = [
      { id: 1, username: 'tester1' },
      { id: 2, username: 'tester2' }
    ];

    const req = {};
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.User.findAll = vi.fn().mockResolvedValue(mockUsers);

    await getAllUser(req, res);

    expect(db.User.findAll).toHaveBeenCalled();
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ users: mockUsers });
  });
});
