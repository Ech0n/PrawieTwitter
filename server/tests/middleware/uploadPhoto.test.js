import { describe, it, expect, vi, beforeEach } from 'vitest';
import path from 'path';
import multer from 'multer';
import uploadPhoto from '../../middleware/uploadPhoto';

describe('uploadPhoto middleware', () => {
  let req, file, cb;

  beforeEach(() => {
    req = {};
    cb = vi.fn();
  });

  describe('fileFilter', () => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];

    it('should accept valid image MIME types', () => {
      for (const type of allowedTypes) {
        file = { mimetype: type };
        uploadPhoto.fileFilter(req, file, cb);
        expect(cb).toHaveBeenCalledWith(null, true);
        cb.mockReset();
      }
    });

    it('should reject invalid MIME types', () => {
      file = { mimetype: 'application/pdf' };
      uploadPhoto.fileFilter(req, file, cb);
      expect(cb).toHaveBeenCalledWith(expect.any(Error), false);
    });
  });
});
