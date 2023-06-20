import {blogsCollection} from './db';
import {BlogViewModel} from '../models/blog/BlogViewModel';
import {BlogMongoDbType} from '../types';
import {BlogInputModel} from '../models/blog/BlogInputModel';
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
    },

    async updateBlog(id: string, data: BlogInputModel): Promise<boolean> {
        if (!ObjectId.isValid(id)) {
            return false
        }
        const _id = new ObjectId(id)
        const result = await blogsCollection.updateOne({_id: _id},{
            $set: {
                name: data.name,
                description: data.description,
                websiteUrl: data.websiteUrl
            }
        })
        return result.matchedCount === 1
    },

    async deleteBlogById(id: string): Promise<boolean>{
        const result = await blogsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async deleteAllBlogs(): Promise<boolean> {
        const result = await blogsCollection.deleteMany({})
        return result.acknowledged === true
    },

    async getBlogById(id: string): Promise<BlogViewModel | null> {
        if (!ObjectId.isValid(id)) {
            return null
        }
        const _id = new ObjectId(id)
        const foundedBlog: BlogMongoDbType | null = await blogsCollection.findOne({_id: _id})

        if (!foundedBlog) {
            return null
        }
        return {
            id: foundedBlog._id.toString(),
            name: foundedBlog.name,
            description: foundedBlog.description,
            websiteUrl: foundedBlog.websiteUrl,
            createdAt: foundedBlog.createdAt,
            isMembership: foundedBlog.isMembership
        }
    }
}
