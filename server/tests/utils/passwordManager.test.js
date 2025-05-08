import { describe, it, expect, beforeEach } from 'vitest';
import { hash, compare } from '../../auth/passwordManager';

describe('passwordManager', () => {
  let plainPassword;

  beforeEach(() => {
    plainPassword = 'SuperSecure123!';
  });

  describe('hash', () => {
    it('should return a hashed version of the password', () => {
      const hashed = hash(plainPassword);

      expect(hashed).not.toBe(plainPassword);
      expect(typeof hashed).toBe('string');
      expect(hashed.length).toBeGreaterThan(0);
    });
  });

  describe('compare', () => {
    it('should return true for a matching password and hash', () => {
      const hashed = hash(plainPassword);
      const result = compare(plainPassword, hashed);

      expect(result).toBe(true);
    });

    it('should return false for a non-matching password', () => {
      const hashed = hash(plainPassword);
      const result = compare('WrongPassword!', hashed);

      expect(result).toBe(false);
    });
  });
});
