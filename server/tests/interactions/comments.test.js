import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createComment, updateComment, deleteComment, getPostComments } from '../../controllers/commentsController';
import db from '../../models';

describe('Comment Controller', () => {
  let req, res;

  beforeEach(() => {
    vi.restoreAllMocks();

    req = {
      user: { id: 1 },
      body: { content: 'This is a comment' },
      params: { postID: '1', commentID: '1' },
    };
    res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn(),
    };
  });

  describe('createComment', () => {
    it('should return 401 if user is not logged in', async () => {
      req.user = null;

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(401);
      expect(res.json).toHaveBeenCalledWith({ error: 'Forbidden, log in.' });
    });

    it('should return 404 if post is not found', async () => {
      vi.spyOn(db.Post, 'findByPk').mockResolvedValueOnce(null);

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ error: 'Post not found.' });
    });

    it('should return 201 and created comment data if successful', async () => {
      const mockPost = { id: 1 };
      vi.spyOn(db.Post, 'findByPk').mockResolvedValueOnce(mockPost);
      vi.spyOn(db.Comment, 'create').mockResolvedValueOnce({
        owner_id: req.user.id,
        content: req.body.content,
        post_id: req.params.postID,
      });

      await createComment(req, res);

      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        owner_id: req.user.id,
        post_id: req.params.postID,
        content: req.body.content,
      });
    });
  });

  describe('updateComment', () => {
    it('should return 404 if comment is not found', async () => {
      vi.spyOn(db.Comment, 'findOne').mockResolvedValueOnce(null);

      await updateComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Comment with selected id not found' });
    });
  });

  describe('deleteComment', () => {
    it('should return 404 if comment is not found', async () => {
      vi.spyOn(db.Comment, 'findOne').mockResolvedValueOnce(null);

      await deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(404);
      expect(res.json).toHaveBeenCalledWith({ message: 'Comment with selected id not found' });
    });

    it('should return 200 and success message if comment is deleted', async () => {
      const mockComment = { id: 1 };
      vi.spyOn(db.Comment, 'findOne').mockResolvedValueOnce(mockComment);
      vi.spyOn(db.Comment, 'destroy').mockResolvedValueOnce(1);

      await deleteComment(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({ message: 'Successfully deleted Comment' });
    });
  });

  describe('getPostComments', () => {
    it('should return 200 and an array of comments if post exists', async () => {
      const mockComments = [{ content: 'Test comment' }];
      vi.spyOn(db.Comment, 'findAll').mockResolvedValueOnce(mockComments);

      await getPostComments(req, res);

      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockComments);
    });

    it('should return 500 if there is an internal error', async () => {
      vi.spyOn(db.Comment, 'findAll').mockRejectedValueOnce(new Error('Internal error'));

      await getPostComments(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({ error: 'Internal error' });
    });
  });
});
