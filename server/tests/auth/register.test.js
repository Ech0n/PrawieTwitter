import { describe, it, expect, vi, beforeEach } from 'vitest';
import { register } from '../../controllers/registerController';
import db from '../../models';

describe('register', () => {
  let req, res;

  beforeEach(() => {
    vi.restoreAllMocks();

    req = {
      body: {
        username: 'johnny',
        email: 'john@example.com',
        password: 'password123',
        password2: 'password123',
      },
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  it('should return 400 if email already exists', async () => {
    db.User.findOne = vi.fn().mockResolvedValue({});

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Email already in use" });
  });

  it('should return 400 if username already exists', async () => {
    db.User.findOne = vi.fn().mockResolvedValueOnce(null).mockResolvedValueOnce({});

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "username already in use" });
  });

  it('should return 201 if registration is successful', async () => {
    db.User.findOne = vi.fn().mockResolvedValueOnce(null).mockResolvedValueOnce(null);
    db.User.create = vi.fn().mockResolvedValue({});

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith({ message: "User created" });
    expect(db.User.create).toHaveBeenCalledWith({
      username: 'johnny',
      email: 'john@example.com',
      password_hash: expect.any(String),
    });
  });

  it('should return 500 if an error occurs', async () => {
    db.User.findOne = vi.fn().mockRejectedValue(new Error('Some error'));

    await register(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ error: 'Some error' });
  });
});
