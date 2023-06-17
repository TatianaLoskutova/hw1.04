import {blogsRepository} from '../repositories/blogs_repository';
import {BlogInputModel} from '../models/blog/BlogInputModel';
import {BlogViewModel} from '../models/blog/BlogViewModel';
import {BlogMongoDbType} from '../types';
import {ObjectId} from 'mongodb';



export const blogsService = {

    async createBlog(inputData: BlogInputModel): Promise<BlogViewModel> {

        const newBlog: BlogMongoDbType = {
        _id: new ObjectId(),
        name: inputData.name,
        description: inputData.description,
        websiteUrl: inputData.websiteUrl,
        createdAt: new Date().toString(),
        isMembership: false
    }
        const result = await blogsRepository.createBlog(newBlog)
        return result
    }
}

