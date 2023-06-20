import {PostMongoDbType} from '../types';
import {blogsCollection, postsCollection} from './db';
import {PostViewModel} from '../models/post/PostViewModel';
import {BlogInputModel} from '../models/blog/BlogInputModel';
import {ObjectId} from 'mongodb';
import {PostInputModel} from '../models/post/PostInputModel';
;


export const postsRepository = {

    async createPostForBlogById(newPost: PostMongoDbType): Promise<PostViewModel> {

        const result = await postsCollection.insertOne(newPost)

        return {
            id: result.insertedId.toString(),
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: newPost.blogName,
            createdAt: newPost.createdAt
        }
    },

    async createPost(newPost: PostMongoDbType): Promise<PostViewModel> {

        const result = await postsCollection.insertOne(newPost)
        return {
            id: result.insertedId.toString(),
            title: newPost.title,
            shortDescription: newPost.shortDescription,
            content: newPost.content,
            blogId: newPost.blogId,
            blogName: newPost.blogName,
            createdAt: newPost.createdAt
        }
    },

    async updatePost(id: string, data: PostInputModel): Promise<boolean> {
        if (!ObjectId.isValid(id)) {
            return false
        }
        const _id = new ObjectId(id)
        const result = await postsCollection.updateOne({_id: _id},{
            $set: {
                title: data.title,
                shortDescription: data.shortDescription,
                content: data.content,
                blogId: data.blogId
            }
        })
        return result.matchedCount === 1
    },

    async deletePostById(id: string): Promise<boolean>{
        const result = await postsCollection.deleteOne({_id: new ObjectId(id)})
        return result.deletedCount === 1
    },

    async deleteAllPosts(): Promise<boolean> {
        const result = await postsCollection.deleteMany({})
        return result.acknowledged === true
    },

}
