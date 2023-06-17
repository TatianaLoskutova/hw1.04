import {Router,Response} from 'express';
import {RequestWithBody, RequestWithQuery} from '../types';
import {BlogInputModel} from '../models/blog/BlogInputModel';
import {BlogViewModel} from '../models/blog/BlogViewModel';
import {blogsService} from '../domain/blogs_service';
import {BlogQueryModel} from '../models/blog/BlogQueryModel';
import {blogsQueryRepository} from '../repositories/blogs_query_repository';




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


blogsRouters.post('/', async (req: RequestWithBody<BlogInputModel>, res: Response) => {
    const newBlog = await blogsService.createBlog(req.body)
    if (newBlog) {
        res.status(201).send(newBlog)
    }
})