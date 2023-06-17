import {Router,Response} from 'express';
import {RequestWithBody, RequestWithParams, RequestWithParamsAndQuery, RequestWithQuery} from '../types';
import {BlogInputModel} from '../models/blog/BlogInputModel';
import {blogsService} from '../domain/blogs_service';
import {BlogQueryModel} from '../models/blog/BlogQueryModel';
import {blogsQueryRepository} from '../repositories/blogs_query_repository';
import {ObjectId} from 'mongodb';
import {GetByIdParam} from '../models/getById';
import {PostQueryModel} from '../models/post/PostQueryModel';
import {postsQueryRepository} from '../repositories/posts_query_repository';




export const blogsRouters = Router()

blogsRouters.get('/', async (req: RequestWithQuery<BlogQueryModel>, res: Response) => {
    const getAllBlogs = await blogsQueryRepository.getAllBlogs(
        req.query.searchNameTerm,
        req.query.sortBy,
        req.query.sortDirection,
        Number(req.query.pageNumber),
        Number(req.query.pageSize)
    )
    if (getAllBlogs) {
        res.status(200).send(getAllBlogs)
    } else {
        res.sendStatus(404)
    }

})

blogsRouters.get('/:id', async (req:RequestWithParams<GetByIdParam>, res: Response) => {
    const foundedBlog = await blogsQueryRepository.findBlogById(new ObjectId(req.params.id))
    if (!foundedBlog) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(foundedBlog)
})

blogsRouters.post('/', async (req: RequestWithBody<BlogInputModel>, res: Response) => {
    const newBlog = await blogsService.createBlog(req.body)
    if (newBlog) {
        res.status(201).send(newBlog)
    }
})

blogsRouters.get('/:id/posts', async (req: RequestWithParamsAndQuery<GetByIdParam, PostQueryModel>, res: Response ) => {
    const foundedPostsByBlogId = await postsQueryRepository.findPostsByBlogId(
        new ObjectId(req.params.id),
        Number(req.query.pageNumber),
        Number(req.query.pageSize),
        req.query.sortBy,
        req.query.sortDirection
    )
    if (foundedPostsByBlogId) {
        res.status(200).send(foundedPostsByBlogId)
    } else {
        res.sendStatus(404)
    }

})

// blogsRouters.post('/:id/posts', async () => {
//     const newPostForBlogById = await blogsService.createPostForBlogById(new ObjectId(req.params.id), req.body)
//     res.status(201).send(newPostForBlogById)
// })