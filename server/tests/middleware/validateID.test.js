import { describe, it, expect, vi, beforeEach } from 'vitest';
import validateId from '../../middleware/validateID';

describe('validateId middleware', () => {
  let req, res, next;

  beforeEach(() => {
    req = {
      params: {
        userID: '1',
        postID: '2',
        commentID: '3',
      },
    };

    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };

    next = vi.fn();
  });

  const runValidation = async () => {
    for (const middleware of validateId) {
      await middleware(req, res, next);
    }
  };

  it('should call next() when all IDs are valid', async () => {
    await runValidation();
    expect(next).toHaveBeenCalled();
  });

  it('should return 400 if userID is invalid', async () => {
    req.params.userID = '-5';
    await runValidation();
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ errors: expect.any(String) });
  });

  it('should return 400 if postID is not an integer', async () => {
    req.params.postID = 'abc';
    await runValidation();
    expect(res.status).toHaveBeenCalledWith(400);
  });

  it('should pass if only commentID is present and valid', async () => {
    req.params = { commentID: '10' };
    await runValidation();
    expect(next).toHaveBeenCalled();
  });

  it('should pass if no params are provided', async () => {
    req.params = {};
    await runValidation();
    expect(next).toHaveBeenCalled();
  });
});
