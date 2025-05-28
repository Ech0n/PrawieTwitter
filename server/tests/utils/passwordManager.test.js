import { describe, it, expect, beforeEach } from 'vitest';
import { hash, compare } from '../../auth/passwordManager';

describe('passwordManager', () => {
  let plainPassword;

  beforeEach(() => {
    plainPassword = 'SuperSecure123!';
  });

  describe('hash', () => {
    it('should return a hashed version of the password', async () => {
      const hashed = await hash(plainPassword);

      expect(hashed).not.toBe(plainPassword);
      expect(typeof hashed).toBe('string');
      expect(hashed.length).toBeGreaterThan(0);
    });
  });

  describe('compare', () => {
    it('should return true for a matching password and hash', async () => {
      const hashed = await hash(plainPassword);
      const result = await compare(plainPassword, hashed);

      expect(result).toBe(true);
    });

    it('should return false for a non-matching password', async () => {
      const hashed = await hash(plainPassword);
      const result = await compare('WrongPassword!', hashed);

      expect(result).toBe(false);
    });
  });
});
