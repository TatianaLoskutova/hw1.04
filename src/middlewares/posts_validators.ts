import {body, CustomValidator} from 'express-validator';
import {blogsRepository} from '../repositories/blogs_repository';
import {blogsQueryRepository} from '../repositories/blogs_query_repository';
import {ObjectId} from 'mongodb';



export const postTitleValidation = body('title')
    .isString().withMessage('Should be string')
    .trim().isLength({min: 1, max: 30}).withMessage('Incorrect length')
export const postShortDescription = body('shortDescription')
    .isString().withMessage('Should be string')
    .trim().isLength({min: 1, max: 100}).withMessage('Incorrect length')
export const postContentValidation = body('content')
    .isString().withMessage('Should be string')
    .trim().isLength({min: 1, max: 1000}).withMessage('Incorrect length')
export const postBlogIdValidation = body('blogId')
    .isString().trim().withMessage('Should be string').custom(async value => {
        const blog = await blogsQueryRepository.findBlogById(new ObjectId(value));
        if (!blog) {
            throw new Error('Id is not exist');
        }
    })
