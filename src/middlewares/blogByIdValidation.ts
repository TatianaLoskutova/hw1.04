import {NextFunction, Request, Response} from 'express';
import {ObjectId} from 'mongodb';

export const blogValidationById = async function idValidation(req: Request, res: Response, next: NextFunction) {
    const id =  req.params.id;
    if (!ObjectId.isValid(id)) {
        return res.sendStatus(404);
    }
    return next();
}