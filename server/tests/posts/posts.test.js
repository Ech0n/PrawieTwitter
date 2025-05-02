import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getAllPosts } from '../../controllers/postsController';
import db from '../../models';

const mockPosts = [
    { id: 1, owner_id: 1, content: 'First post' },
    { id: 2, owner_id: 2, content: 'Second post' },
];


describe('getAllPosts Function', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it('should return all posts when no ownerId is provided', async () => {
        const req = { body: {} };
        const res = {
            status: vi.fn().mockReturnThis(),
            json: vi.fn(),
        };
        db.Post.findAll = vi.fn(()=> mockPosts)

        await getAllPosts(req, res);

        expect(db.Post.findAll).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({ posts: mockPosts });
    });


});