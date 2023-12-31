import express from 'express';
import bodyParser from 'body-parser';
import {blogsRouters} from './routers/blogs_routers';
import {postsRouters} from './routers/posts_routers';
import {testingRouter} from './routers/testing_routers';

export const app = express()
const parserMiddleware = bodyParser.json()
app.use(parserMiddleware)
app.use('/blogs', blogsRouters)
app.use('/posts', postsRouters)
app.use('/testing', testingRouter)