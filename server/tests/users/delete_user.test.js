import { describe, it, expect, vi, beforeEach } from 'vitest';
import { deleteUser } from '../../controllers/usersController';
import db from '../../models';

describe('deleteUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should delete the user if they exist', async () => {
    const req = { params: { userId: 1 } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const mockUser = { id: 1, username: 'John Tester' };

    db.User.findOne = vi.fn().mockResolvedValue(mockUser);
    db.User.destroy = vi.fn().mockResolvedValue(1);

    await deleteUser(req, res);

    expect(db.User.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(db.User.destroy).toHaveBeenCalledWith({ where: { id: 1 } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Successfully deleted User' });
  });

  it('should return message if user does not exist', async () => {
    const req = { params: { userId: 999 } };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.User.findOne = vi.fn().mockResolvedValue(null);

    await deleteUser(req, res);

    expect(db.User.findOne).toHaveBeenCalledWith({ where: { id: 999 } });
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'User with selected id not found' });
  });
});
