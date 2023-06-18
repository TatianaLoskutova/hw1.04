import {PostMongoDbType} from '../types';
import {postsCollection} from './db';
import {PostViewModel} from '../models/post/PostViewModel';
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
    }

}
