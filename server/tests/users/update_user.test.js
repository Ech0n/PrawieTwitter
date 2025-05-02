import { describe, it, expect, vi, beforeEach } from 'vitest';
import { updateUser } from '../../controllers/usersController';
import db from '../../models';

describe('updateUser', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should update the user if they exist', async () => {
    const req = {
      params: { userId: 1 },
      body: {
        name: 'John',
        surname: 'Tester',
        username: 'johnny',
        description: 'Test account'
      }
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    const existingUser = {
      id: 1,
      username: 'johnny',
      name: 'John',
      surname: 'Tester',
      description: 'Test account'
    };

    db.User.findOne = vi.fn()
      .mockResolvedValueOnce(existingUser)
      .mockResolvedValueOnce(existingUser);

    db.User.update = vi.fn().mockResolvedValue([1]);

    await updateUser(req, res);

    expect(db.User.findOne).toHaveBeenCalledWith({
      where: { id: 1 },
      attributes: { exclude: ['password_hash', 'id'] }
    });

    expect(db.User.update).toHaveBeenCalledWith(
      {
        name: 'John',
        surname: 'Tester',
        username: 'johnny',
        description: 'Test account'
      },
      { where: { id: 1 } }
    );

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(existingUser);
  });

  it('should return 404 if user does not exist', async () => {
    const req = {
      params: { userId: 999 },
      body: {
        name: 'Ghost',
        surname: 'User',
        username: 'phantom',
        description: 'Does not exist'
      }
    };
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };

    db.User.findOne = vi.fn().mockResolvedValue(null);

    await updateUser(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'User with selected id not found'
    });
  });
});
