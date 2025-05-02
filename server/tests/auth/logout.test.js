import { describe, it, expect, vi, beforeEach } from 'vitest';
import { logout } from '../../controllers/authController';

describe('logout', () => {
  let req, res;

  beforeEach(() => {
    vi.clearAllMocks();

    res = {
      sendStatus: vi.fn(),
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    };
  });

  it('should return 401 if no user is logged in', async () => {
    req = { user: null };
    await logout(req, res);

    expect(res.sendStatus).toHaveBeenCalledWith(401);
  });

  it('should logout the user and return 200', async () => {
    req = {
      user: { id: 1 },
      logout: vi.fn((cb) => cb(null))
    };

    await logout(req, res);

    expect(req.logout).toHaveBeenCalled();
    expect(res.sendStatus).toHaveBeenCalledWith(200);
  });

  it('should return 400 if logout throws error', async () => {
    req = {
      user: { id: 1 },
      logout: vi.fn((cb) => cb(new Error('logout failed')))
    };

    await logout(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Failed to log out' });
  });
});
