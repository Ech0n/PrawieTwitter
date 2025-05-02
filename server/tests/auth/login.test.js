import { describe, it, expect, vi, beforeEach } from 'vitest';
import { login } from '../../controllers/authController';
import passport from 'passport';

describe('login', () => {
  let req, res, next;

  beforeEach(() => {
    vi.restoreAllMocks();

    req = {
      body: { username: 'john', password: 'secret' },
      logIn: vi.fn((user, callback) => callback(null)),
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    next = vi.fn();
  });

  it('should return 500 if passport returns error', async () => {
    vi.spyOn(passport, 'authenticate').mockImplementation((_, cb) => {
      return (req, res, next) => cb(new Error('passport error'), null, null);
    });

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Internal server error' });
  });

  it('should return 400 if no user', async () => {
    vi.spyOn(passport, 'authenticate').mockImplementation((_, cb) => {
      return (req, res, next) => cb(null, null, { message: 'Invalid credentials' });
    });

    await login(req, res, next);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: 'Invalid credentials' });
  });

  it('should log in the user and return 200', async () => {
    const user = { id: 1 };

    vi.spyOn(passport, 'authenticate').mockImplementation((_, cb) => {
      return (req, res, next) => cb(null, user, null);
    });

    await login(req, res, next);

    expect(req.logIn).toHaveBeenCalledWith(user, expect.any(Function));
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({ message: 'Authenticated successfully' });
  });
});
