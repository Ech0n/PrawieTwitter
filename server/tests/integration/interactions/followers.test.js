import request from 'supertest';
import express from 'express';
import db from '../../../models';
import followersRouter from '../../../routes/followers';
import bodyParser from 'body-parser';

describe('Followers Endpoints (isolated)', () => {
  let app;
  let followerUser, followingUser;

  beforeAll(async () => {
  await db.sequelize.sync({ force: true });

  db.Followers.associate(db);

  followerUser = await db.User.create({
    username: 'follower',
    email: 'follower@example.com',
    password_hash: 'hashedpassword1',
  });

  followingUser = await db.User.create({
    username: 'following',
    email: 'following@example.com',
    password_hash: 'hashedpassword2',
  });

  app = express();
  app.use(bodyParser.json());

  app.use((req, res, next) => {
    const userId = req.header('user-id');
    if (userId) {
      req.user = { id: parseInt(userId) };
    }
    next();
  });

  app.use('/api/followers', followersRouter);
});


  afterAll(async () => {
    await db.sequelize.close();
  });

  it('POST /api/followers/:userID – should create a follow relationship', async () => {
    const res = await request(app)
      .post(`/api/followers/${followingUser.id}`)
      .set('user-id', followerUser.id.toString());

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Succesfully created folllow');
  });

  it('GET /api/followers/:userID – should return list of followers', async () => {
    const res = await request(app).get(`/api/followers/${followingUser.id}`);

    expect(res.status).toBe(200);
    expect(res.body.followers).toContain('follower');
  });

  it('GET /api/followers/following/:userID – should return list of following', async () => {
    const res = await request(app).get(`/api/followers/following/${followerUser.id}`);

    expect(res.status).toBe(200);
    expect(res.body.following).toContain('following');
  });

  it('DELETE /api/followers/:userID – should delete a follow relationship', async () => {
    const res = await request(app)
      .delete(`/api/followers/${followingUser.id}`)
      .set('user-id', followerUser.id.toString());

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Successfully deleted follow');
  });
});
