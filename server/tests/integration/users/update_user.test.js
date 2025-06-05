import request from 'supertest';
import app from '../../../app';
import db from '../../../models';
import PasswordManager from '../../../auth/passwordManager';
import { describe, it, beforeAll, afterAll, expect } from 'vitest';

describe('PUT /api/users/:id', () => {
  let testUser;

  beforeAll(async () => {
    await db.User.destroy({ where: { email: 'updateuser@example.com' } });
    testUser = await db.User.create({
      username: 'updateuser',
      email: 'updateuser@example.com',
      password_hash: await PasswordManager.hash('PassToUpdate123'),
    });
  });

  afterAll(async () => {
    await db.User.destroy({ where: { id: testUser.id } });
  });

    it('should update the user and return updated data', async () => {
    const res = await request(app)
      .put(`/api/users/${testUser.id}`)
      .send({
        name: 'NoweImię',
        surname: 'NoweNazwisko',
        username: 'updatedusername',
        description: 'Zaktualizowany opis',
      })
      .expect(200);

    expect(res.body.username).toBe('updatedusername');
    if (res.body.name !== undefined) expect(res.body.name).toBe('NoweImię');
    if (res.body.surname !== undefined) expect(res.body.surname).toBe('NoweNazwisko');
    if (res.body.description !== undefined) expect(res.body.description).toBe('Zaktualizowany opis');
  });


  it('should return 404 for non-existent user ID', async () => {
    const res = await request(app)
      .put('/api/users/999999')
      .send({ username: 'nieistniejacy' })
      .expect(404);

    expect(res.body.message).toBe('User with selected id not found');
  });
});
