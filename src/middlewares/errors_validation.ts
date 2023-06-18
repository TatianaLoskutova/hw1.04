import {NextFunction, Request, Response} from 'express';
import {validationResult} from 'express-validator';


export const errorsValidation = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
        return next()
    }
    const idFinder = errors.array().find((el: any) => {
        el.path === 'id'
    })
    if (idFinder) {
        return res.sendStatus(404)
    }
    const errorsMessages = errors.array({onlyFirstError: true})
        .map((el: any) => {
            return {
                message: el.msg,
                field: el.path
            }
        })
    return res.status(400).send({errorsMessages})
}

