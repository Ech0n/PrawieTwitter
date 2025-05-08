import { describe, it, expect, beforeEach, vi } from 'vitest';
import validateRegister from '../../middleware/validateRegister';
import { validationResult } from 'express-validator';

describe('validateRegister middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      body: {
        email: 'test@example.com',
        password: 'Password123',
        password2: 'Password123',
      },
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    next = vi.fn();
  });

  const runValidation = async () => {
    for (const middleware of validateRegister) {
      await middleware(req, res, next);
    }
  };

  it('should call next() when input is valid', async () => {
    await runValidation();
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 if email is invalid', async () => {
    req.body.email = 'invalid-email';
    await runValidation();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ error: expect.any(String) }));
  });

  it('should return 400 if password is too short', async () => {
    req.body.password = req.body.password2 = 'P1a';
    await runValidation();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should return 400 if passwords do not match', async () => {
    req.body.password2 = 'DifferentPass123';
    await runValidation();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'Passwords do not match' });
  });
});
