import {blogsCollection} from './db';
import {BlogViewModel} from '../models/blog/BlogViewModel';
import {BlogMongoDbType} from '../types';
import {ObjectId} from 'mongodb';


export const blogsRepository = {

    async createBlog(newBlog: BlogMongoDbType): Promise<BlogViewModel> {

        const result = await blogsCollection.insertOne(newBlog)

        return {
            id: result.insertedId.toString(),
            name: newBlog.name,
            description: newBlog.description,
            websiteUrl: newBlog.websiteUrl,
            createdAt: newBlog.createdAt,
            isMembership: newBlog.isMembership
        }
    }

}
