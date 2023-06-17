import {blogsCollection} from '../repositories/db';
import {BlogMongoDbType} from '../types';

export const makeBlogPagination = async (
    filter: any,
    sortObj: any,
    pageNumber: number,
    pageSize: number
) => {
    return await blogsCollection
        .find(filter)
        .sort(sortObj)
        .skip(pageNumber > 0 ? (pageNumber - 1) * pageSize : 0)
        .limit(pageSize > 0 ? pageSize : 0)
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