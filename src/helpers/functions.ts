import {blogsCollection, postsCollection} from '../repositories/db';
import {BlogMongoDbType, PostMongoDbType} from '../types';
import {ObjectId} from 'mongodb';

export const makeBlogPagination = async (
    filter: any,
    sortObj: any,
    pageNumber: number,
    pageSize: number
) => {
    return await blogsCollection
        .find(filter)
        .sort(sortObj)
        .skip(+pageNumber > 0 ? (+pageNumber - 1) * +pageSize : 0)
        .limit(+pageSize > 0 ? +pageSize : 0)
        .toArray()
}

export const makeBlogMapping = (arr: BlogMongoDbType[]) => {
    return arr.map((blog) => {
        return {
            id: blog._id.toString(),
            name: blog.name,
            description: blog.description,
            websiteUrl: blog.websiteUrl,
            createdAt: blog.createdAt,
            isMembership: blog.isMembership
        }
    })
}
export const makePostPagination = async (
    sortObj: any,
    pageNumber: number,
    pageSize: number,
    filter?: any
) => {
    return await postsCollection
        .find(filter)
        .sort(sortObj)
        .skip(+pageNumber > 0 ? (+pageNumber - 1) * +pageSize : 0)
        .limit(+pageSize > 0 ? +pageSize : 0)
        .toArray()
}

export const makePostMapping = (arr: PostMongoDbType[]) => {
    return arr.map((post) => {
        return {
            id: post._id.toString(),
            title: post.title,
            shortDescription: post.shortDescription,
            content: post.content,
            blogId: post.blogId,
            blogName: post.blogName,
            createdAt: post.createdAt
        }
    })
}
