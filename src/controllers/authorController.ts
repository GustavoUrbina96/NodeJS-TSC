import { Router } from 'express'
import { Author } from '../models/author'

export const authorRouter = Router()

authorRouter.delete('/:id', async(req, res)=> {
    const a = req.params.id

    res.status(200).json({'msg': "author" + a + " deleted."})
})

authorRouter.post('/', async(req, res)=> {
    
    const a = req.body
    if(!a.name){
        res.status(400).json({})
        return
    }

    let author: Author = {
        id: '1',
        name: req.body.name
    }

    //TODO insert author on DB

    res.status(200).json(author)
})

authorRouter.get('/:id', async (req, res)=>{

    console.log(req.params.name)
    //TODO search author by id on DB
    if(req.params.id === "1" ){
        let author: Author = {
            id: "1",
            name: "Stephen King"
        }
        res.status(200).json(author)
    }else{
        res.status(400).json({error: "Author not found"})
    }

})