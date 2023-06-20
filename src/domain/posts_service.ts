import {ObjectId} from 'mongodb';
import {PostViewModel} from '../models/post/PostViewModel';
import {PostInputModel} from '../models/post/PostInputModel';
import {postsCollection} from '../repositories/db';
import {postsRepository} from '../repositories/posts_repository';
import {PostMongoDbType} from '../types';
import {BlogViewModel} from '../models/blog/BlogViewModel';
import {blogsRepository} from '../repositories/blogs_repository';




export const postsService = {

    async createPostForBlogById(_id: ObjectId, inputData: PostInputModel): Promise<PostViewModel | undefined> {
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
            createdAt: new Date().toISOString(),
        }
        return await  postsRepository.createPost(addedPost)

    },
    // Когда через queryBlogRep не работал blogName: blog.name
    async createPost(inputData: PostInputModel): Promise<PostViewModel | null> {
        const blog: BlogViewModel | null = await blogsRepository.getBlogById(inputData.blogId)
        if (!blog) {
            return null
        }
            const addedPost: PostMongoDbType = {
                _id: new ObjectId(),
                title: inputData.title,
                shortDescription: inputData.shortDescription,
                content: inputData.content,
                blogId: inputData.blogId,
                blogName: blog.name,
                createdAt: new Date().toISOString(),
        }
            return await  postsRepository.createPost(addedPost)

        },

    async updatePost(id: string, data: PostInputModel): Promise<boolean> {
        if (!ObjectId.isValid(id)) {
            return false
        }
        return  await postsRepository.updatePost(id, data)
    },

    // или нужно было сначала еще в query искать ?
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

