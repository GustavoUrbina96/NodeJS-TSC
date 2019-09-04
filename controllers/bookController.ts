import { Router } from 'express'
import { Book } from '../models/books'

export const bookRouter = Router()

bookRouter.post('/',async(req, res)=> {

    const b = req.body
    res.status(200).json(b)
})