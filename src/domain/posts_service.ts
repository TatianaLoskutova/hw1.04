import {ObjectId} from 'mongodb';
import {PostViewModel} from '../models/post/PostViewModel';
import {PostInputModel} from '../models/post/PostInputModel';
import {blogsCollection, postsCollection} from '../repositories/db';
import {postsRepository} from '../repositories/posts_repository';
import {PostMongoDbType} from '../types';




export const postsService = {

    async createPostForBlogById(_id: ObjectId,inputData: PostInputModel): Promise<PostViewModel | undefined> {
        const postByBlogId = await blogsCollection.findOne({_id: new ObjectId(inputData.blogId)})
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
            createdAt: new Date().toISOString()
        }
        return await postsRepository.createPostForBlogById(newPost)

    },

    async createPost(inputData: PostInputModel): Promise<PostViewModel | undefined> {
        const newPost = await postsCollection.findOne({_id: new ObjectId(inputData.blogId)})
        if (!newPost) {
            return undefined
        }
            const addedPost: PostMongoDbType = {
                _id: new ObjectId(),
                title: inputData.title,
                shortDescription: inputData.shortDescription,
                content: inputData.content,
                blogId: inputData.blogId,
                blogName: newPost.blogName,
                createdAt: new Date().toString(),
        }
            return await  postsRepository.createPost(addedPost)

        },

    async updatePost(id: string, data: PostInputModel): Promise<boolean> {
        if (!ObjectId.isValid(id)) {
            return false
        }
        return  await postsRepository.updatePost(id, data)
    },

    async deletePostById(id: string): Promise<boolean> {
        const postToDelete = await postsCollection.findOne({_id: new ObjectId(id)})

        if (!postToDelete) {
            return false
        }
        return await postsRepository.deletePostById(id)
    },

    async deleteAllPosts(): Promise<boolean> {
        return  await postsRepository.deleteAllPosts()
    }

}

