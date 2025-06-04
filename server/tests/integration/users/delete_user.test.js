import request from 'supertest';
import app from '../../../app';
import db from '../../../models';
import PasswordManager from '../../../auth/passwordManager';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';

describe('DELETE /users/:id', () => {
  let testUser;

  beforeAll(async () => {
    await db.User.destroy({ where: { email: 'deleteuser@example.com' } });
    testUser = await db.User.create({
      username: 'deleteuser',
      email: 'deleteuser@example.com',
      password_hash: PasswordManager.hash('DeletePass123'),
    });
  });

  it('should delete the user and return success message', async () => {
    const res = await request(app)
      .delete(`/users/${testUser.id}`)
      .expect(200);

    expect(res.body.message).toBe('Successfully deleted User');

    const found = await db.User.findByPk(testUser.id);
    expect(found).toBeNull();
  });

  it('should return message when trying to delete non-existent user', async () => {
    const res = await request(app)
      .delete(`/users/999999`)
      .expect(200);

    expect(res.body.message).toBe('User with selected id not found');
  });

  afterAll(async () => {
    await db.User.destroy({ where: { email: 'deleteuser@example.com' } });
  });
});
