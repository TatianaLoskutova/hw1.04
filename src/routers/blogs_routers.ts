import {Router,Response} from 'express';
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithParamsAndQuery, RequestWithQuery} from '../types';
import {BlogInputModel} from '../models/blog/BlogInputModel';
import {blogsService} from '../domain/blogs_service';
import {BlogQueryModel} from '../models/blog/BlogQueryModel';
import {blogsQueryRepository} from '../repositories/blogs_query_repository';
import {ObjectId} from 'mongodb';
import {GetByIdParam} from '../models/getById';
import {PostQueryModel} from '../models/post/PostQueryModel';
import {postsQueryRepository} from '../repositories/posts_query_repository';
import {postsService} from '../domain/posts_service';
import {PostInputModel} from '../models/post/PostInputModel';
import {authorizationValidation} from '../middlewares/authorization_validation';
import {blogDescriptionValidation, blogNameValidation, blogWebsiteUrlValidation} from '../middlewares/blogs_validators';
import {errorsValidation} from '../middlewares/errors_validation';
import {
    postBlogIdValidation,
    postContentValidation,
    postShortDescription,
    postTitleValidation
} from '../middlewares/posts_validators';


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

blogsRouters.get('/:id/posts', async (req: RequestWithParamsAndQuery<GetByIdParam, PostQueryModel>, res: Response ) => {
    const foundedPostsByBlogId = await postsQueryRepository.findPostsByBlogId(
        new ObjectId(req.params.id),
        Number(req.query.pageNumber),
        Number(req.query.pageSize),
        req.query.sortBy,
        req.query.sortDirection
    )
    if (!foundedPostsByBlogId) {
        res.sendStatus(404)
        return
    } else {
        res.status(200).send(foundedPostsByBlogId)
    }

})

blogsRouters.post('/',
    authorizationValidation,
    blogNameValidation,
    blogDescriptionValidation,
    blogWebsiteUrlValidation,
    errorsValidation,
    async (req: RequestWithBody<BlogInputModel>, res: Response) => {
    const newBlog = await blogsService.createBlog(req.body)
    if (newBlog) {
        res.status(201).send(newBlog)
    }
})

blogsRouters.post('/:id/posts',
    authorizationValidation,
    postTitleValidation,
    postShortDescription,
    postContentValidation,
    errorsValidation,
    async (req: RequestWithParamsAndBody<GetByIdParam, PostInputModel>, res: Response) => {
    const newPostForBlogById = await postsService.createPostForBlogById(new ObjectId(req.params.id), req.body)
        res.status(201).send(newPostForBlogById)
    //     if (!newPostForBlogById) {
    //     res.sendStatus(404)
    //     return
    // } else  {
    //     res.status(201).send(newPostForBlogById)
    // }

})

blogsRouters.put('/:id',
    authorizationValidation,
    blogNameValidation,
    blogDescriptionValidation,
    blogWebsiteUrlValidation,
    errorsValidation,
    async (req: RequestWithParamsAndBody<GetByIdParam,BlogInputModel>, res: Response) => {
        const isUpdated = await blogsService.updateBlog(req.params.id, req.body)
        if (isUpdated) {
            res.sendStatus(204)
        } else {
            res.sendStatus(404)
        }
    })

blogsRouters.delete('/:id',
    authorizationValidation,
    async (req: RequestWithParams<GetByIdParam>, res: Response) => {
        const isDeleted = await blogsService.deleteBlogById(req.params.id)
        if (isDeleted) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    })