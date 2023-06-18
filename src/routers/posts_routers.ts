import {Router, Request, Response} from 'express';
import {RequestWithParams, RequestWithQuery} from '../types';
import {PostQueryModel} from '../models/post/PostQueryModel';
import {postsQueryRepository} from '../repositories/posts_query_repository';
import {GetByIdParam} from '../models/getById';
import {ObjectId} from 'mongodb';



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

postsRouters.get('/:id', async (req:RequestWithParams<GetByIdParam>, res: Response) => {
    const foundedPost = await postsQueryRepository.findPostById(new ObjectId(req.params.id))
    if (!foundedPost) {
        res.sendStatus(404)
        return
    }
    res.status(200).send(foundedPost)
})

// postsRouters.post('/', async (req: RequestWithBody<PostInputModel>, res: Response) => {
//     const newPost = await postsService.createPost(req.body)
//     if (newBlog) {
//         res.status(201).send(newPost)
//     }
// })


