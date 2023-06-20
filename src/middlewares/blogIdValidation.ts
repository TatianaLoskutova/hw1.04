import {param} from 'express-validator';
import {blogsQueryRepository} from '../repositories/blogs_query_repository';
import {ObjectId} from 'mongodb';




export const blogIdValidation = param('id').custom(async (value) => {
        const result = await blogsQueryRepository.findBlogById(new ObjectId(value))
    if (!result) {
        throw new Error('Id not found')
    }
    return true
}
)