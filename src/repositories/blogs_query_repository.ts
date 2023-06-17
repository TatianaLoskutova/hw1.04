import {PaginatorBlogViewModel} from '../models/blog/PaginatorBlogViewModel';
import {blogsCollection} from './db';
import {makeBlogMapping, makeBlogPagination} from '../helpers/functions';


export const blogsQueryRepository = {
    async getAllBlogs(
        searchNameTerm: string | null = null,
        sortBy: string = 'createdAt',
        sortDirection: string = 'desc',
        pageNumber: number = 1,
        pageSize: number = 10
    ): Promise<PaginatorBlogViewModel> {

        const filter: any = {}
        const sortObj: any = {}

        if (searchNameTerm) {
            filter.name = { $regex: searchNameTerm, $options: 'i' }
        }

        if (sortBy) {
            sortObj[sortBy] = -1
        }

        if (sortDirection === 'asc') {
            sortObj[sortBy] = 1
        }

        const outputPaging = await makeBlogPagination(
            filter,
            sortObj,
            pageNumber,
            pageSize
        )

        const blogsCount = await blogsCollection.countDocuments(filter)
        const pagesCount = Math.ceil(blogsCount/pageSize)

        return {
            pagesCount: pagesCount,
            page: +pageNumber,
            pageSize: +pageSize,
            totalCount: blogsCount,
            items: makeBlogMapping(outputPaging)
        }
    }
}
