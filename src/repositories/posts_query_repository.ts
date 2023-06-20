import {ObjectId} from 'mongodb';
import {PaginatorPostViewModel} from '../models/post/PaginatorPostViewModel';
import {makeBlogMapping, makeBlogPagination, makePostMapping, makePostPagination} from '../helpers/functions';
import {blogsCollection, postsCollection} from './db';
import {PostViewModel} from '../models/post/PostViewModel';
import {PostMongoDbType} from '../types';


export const postsQueryRepository = {
    async getAllPosts(
        pageNumber: number = 1,
        pageSize: number = 10,
        sortBy: string = 'createdAt',
        sortDirection: string = 'desc'
    ): Promise<PaginatorPostViewModel>{
        const sortObj: any = {}

        if (sortBy) {
            sortObj[sortBy] = -1
        }

        if (sortDirection === 'asc') {
            sortObj[sortBy] = 1
        }
        const outputPaging = await makePostPagination(sortObj, pageNumber, pageSize)
        const postsCount = await postsCollection.countDocuments()
        const pagesCount = Math.ceil(postsCount/+pageSize)

        return {
            pagesCount: pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: postsCount,
            items: makePostMapping(outputPaging)
        }
    },

    async findPostById(_id: ObjectId): Promise<PostViewModel | null> {
      const foundedPost = await postsCollection.findOne({_id})
        if (!foundedPost) {
            return null
        }
        return {
            id: foundedPost._id.toString(),
            title: foundedPost.title,
            shortDescription: foundedPost.shortDescription,
            content: foundedPost.content,
            blogId: foundedPost.blogId,
            blogName: foundedPost.blogName,
            createdAt: foundedPost.createdAt
        }
    },

    async findPostsByBlogId(
        blogId: ObjectId,
        pageNumber: number = 1,
        pageSize: number = 10,
        sortBy: string = 'createdAt',
        sortDirection: string = 'desc'
    ): Promise<PaginatorPostViewModel> {

        const filter = { blogId: blogId.toString() }
        const sortObj: any = {}

        if (sortBy) {
            sortObj[sortBy] = -1
        }

        if (sortDirection === 'asc') {
            sortObj[sortBy] = 1
        }

        const outputPaging = await makePostPagination(
            sortObj,
            pageNumber,
            pageSize,
            filter
        )
        const postsCount = await postsCollection.countDocuments(filter)
        const pagesCount = Math.ceil(postsCount/+pageSize)

        return {
            pagesCount: pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: postsCount,
            items: makePostMapping(outputPaging)
        }

    }

}

