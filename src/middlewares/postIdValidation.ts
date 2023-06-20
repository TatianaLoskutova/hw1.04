import {param} from 'express-validator';
import {ObjectId} from 'mongodb';
import {postsQueryRepository} from '../repositories/posts_query_repository';




// export const postIdValidation = param('id').custom(async (value) => {
//         const result = await postsQueryRepository.findPostById(new ObjectId(value))
//     if (!result) {
//         throw new Error('Id not found')
//     }
//     return true
// }
// )

