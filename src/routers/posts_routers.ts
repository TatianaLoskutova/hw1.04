import {Router,Response} from 'express';
import {RequestWithBody, RequestWithParams, RequestWithParamsAndBody, RequestWithQuery} from '../types';
import {PostQueryModel} from '../models/post/PostQueryModel';
import {postsQueryRepository} from '../repositories/posts_query_repository';
import {GetByIdParam} from '../models/getById';
import {ObjectId} from 'mongodb';
import {PostInputModel} from '../models/post/PostInputModel';
import {postsService} from '../domain/posts_service';
import {authorizationValidation} from '../middlewares/authorization_validation';
import {postBlogIdValidation, postContentValidation, postShortDescription, postTitleValidation
} from '../middlewares/posts_validators';
import {errorsValidation} from '../middlewares/errors_validation';





export const postsRouters = Router()

postsRouters.get('/', async (req: RequestWithQuery<PostQueryModel>, res: Response) => {
    const getAllPosts = await postsQueryRepository.getAllPosts(
        Number(req.query.pageNumber),
        Number(req.query.pageSize),
        req.query.sortBy,
        req.query.sortDirection
    )
    if (getAllPosts) {
        res.status(200).send(getAllPosts)
    }
})

postsRouters.get('/:id',
    // postIdValidation,
    errorsValidation,
    async (req:RequestWithParams<GetByIdParam>, res: Response) => {
    const foundedPost = await postsQueryRepository.findPostById(new ObjectId(req.params.id))
    if (!foundedPost) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(foundedPost)
})

postsRouters.post('/',
    authorizationValidation,
    postTitleValidation,
    postShortDescription,
    postContentValidation,
    postBlogIdValidation,
    errorsValidation,
    async (req: RequestWithBody<PostInputModel>, res: Response) => {
    const newPost = await postsService.createPost(req.body)
    if (newPost) {
        res.status(201).send(newPost)
    }
})

postsRouters.put('/:id',
    authorizationValidation,
    // postIdValidation,
    postTitleValidation,
    postShortDescription,
    postContentValidation,
    postBlogIdValidation,
    errorsValidation,
    async (req: RequestWithParamsAndBody<GetByIdParam,PostInputModel>, res: Response) => {
    const isUpdated = await postsService.updatePost(req.params.id, req.body)
    if (isUpdated) {
        res.sendStatus(204)
    } else {
        res.sendStatus(404)
    }
})

postsRouters.delete('/:id',
    authorizationValidation,
    // postIdValidation,
    async (req: RequestWithParams<GetByIdParam>, res: Response) => {
        const isDeleted = await postsService.deletePostById(req.params.id)
        if (isDeleted) {
            res.sendStatus(204);
        } else {
            res.sendStatus(404);
        }
    })


