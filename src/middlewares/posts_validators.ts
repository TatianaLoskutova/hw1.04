import {body, CustomValidator} from 'express-validator';
import {blogsQueryRepository} from '../repositories/blogs_query_repository';
import {RequestWithParams} from '../types';
import {GetByIdParam} from '../models/getById';
import {ObjectId} from 'mongodb';


export const validBlogId: CustomValidator = async (req:RequestWithParams<GetByIdParam>): Promise<boolean> => {
    const findBlogWithId = await blogsQueryRepository.findBlogById(new ObjectId(req.params.id))
    if (!findBlogWithId) {
        throw new Error('Blog is not found')
    } else {
        return true
    }
}

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
    .isString().withMessage('Should be string')
    .custom(validBlogId)