import {blogsRepository} from '../repositories/blogs_repository';
import {BlogInputModel} from '../models/blog/BlogInputModel';
import {BlogViewModel} from '../models/blog/BlogViewModel';
import {BlogMongoDbType} from '../types';
import {ObjectId} from 'mongodb';
import {blogsCollection} from '../repositories/db';

export const blogsService = {

    async createBlog(inputData: BlogInputModel): Promise<BlogViewModel> {

        const newBlog: BlogMongoDbType = {
            _id: new ObjectId(),
            name: inputData.name,
            description: inputData.description,
            websiteUrl: inputData.websiteUrl,
            createdAt: new Date().toISOString(),
            isMembership: false
        }
        const createdBlog = await blogsRepository.createBlog(newBlog)
        return createdBlog

    },
    async updateBlog(id: string, data: BlogInputModel): Promise<boolean> {
        if (!ObjectId.isValid(id)) {
            return false
        }
        return  await blogsRepository.updateBlog(id, data)
    },

    async deleteBlogById(id: string): Promise<boolean> {
        const blogToDelete = await blogsCollection.findOne({_id: new ObjectId(id)})

        if (!blogToDelete) {
            return false
        }
        return await blogsRepository.deleteBlogById(id)
    },

    async deleteAllBlogs(): Promise<boolean> {
        return  await blogsRepository.deleteAllBlogs()
    }

}

