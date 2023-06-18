import {ObjectId} from 'mongodb';
import {PostViewModel} from '../models/post/PostViewModel';
import {PostInputModel} from '../models/post/PostInputModel';
import {blogsCollection} from '../repositories/db';
import {postsRepository} from '../repositories/posts_repository';
import {PostMongoDbType} from '../types';



export const postsService = {

    async createPostForBlogById(_id: ObjectId,inputData: PostInputModel): Promise<PostViewModel | undefined> {
        const postByBlogId = await blogsCollection.findOne({_id})
        if (!postByBlogId) {
            return undefined
        }
        const newPost: PostMongoDbType = {
            _id: new ObjectId(),
            title: inputData.title,
            shortDescription: inputData.shortDescription,
            content: inputData.content,
            blogId: inputData.blogId,
            blogName: postByBlogId.name,
            createdAt: new Date().toISOString(),
        }
        const result = await postsRepository.createPostForBlogById(newPost)
        return result
    }


        // async createPost(inputData: BlogInputModel): Promise<BlogViewModel> {
        //
        //     const newBlog: BlogMongoDbType = {
        //     _id: new ObjectId(),
        //     name: inputData.name,
        //     description: inputData.description,
        //     websiteUrl: inputData.websiteUrl,
        //     createdAt: new Date().toString(),
        //     isMembership: false
        // }
        //     const result = await poRepository.createBlog(newBlog)
        //     return result
        // }


}

