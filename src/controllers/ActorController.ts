import { Router } from 'express';
const ActorModel = require('../models/ActorModel');
//Ruta de xpress
export const ActorRouter = Router();

//GET
ActorRouter.get('/getAllActors', (req, res) => {
    ActorModel.find((error, success) => {
        if (error)
            return res.status(500).send({ message: 'Connection Fail' })
        if (!success)
            return res.status(404).send({ message: 'No records' })

        return res.status(200).send({ success })
    })

})


//Get by ID
ActorRouter.get('/getActorByID/:id',(req,res) => {
    const idActor = req.params.id;
    ActorModel.findById(idActor,(error, success) => {
        if(error)
            return res.status(500).send({message:"Internal Server error, Actor didn't found"});
        if(!success)
            return res.status(404).send({message: "Actor didn't found"});
        return res.status(200).send({success});
    })
})

//POST
ActorRouter.post('/addNewActor', (req, res) => {
    const newValues = req.body;
    if (!newValues.name || !newValues.age || !newValues.from)
        return res.status(500).send({ message: "Favor de introducir todos los datos" });
    let newActor = new ActorModel();

    newActor.name = newValues.name;
    newActor.age = newValues.age;
    newActor.from = newValues.from;
    newActor.save((error, success) => {
        if (error)
            return res.status(500).send({ message: 'Internal Server error, Actor doesn´t saved' });
        if (success)
            return res.status(200).send({ client: success });

        return res.status(404).send({ message: 'Actor not saved!' });
    })

})
//DELETE
ActorRouter.delete('/deleteActor/:id', (req, res) => {
    const idActor = req.params.id;
    ActorModel.findByIdAndRemove(idActor, (error, success) => {

        if (error)
            return res.status(500).send({ message: "Internal Server error, Actor doesn´t Deleted" });
        if (success)
            return res.status(200).send({ message: "Actor Deleted!" });

        return res.status(400).send({ message: "Actor no deleted." });
    })
})

//PATCH
ActorRouter.patch('/updateActor/:id', (req, res) => {
    const idActor = req.params.id;
    const updateValues = req.body;
    if (!updateValues.name || !updateValues.age || !updateValues.from)
        return res.status(500).send({ message: "Favor de introducir todos los datos" });
    ActorModel.update({ _id: idActor }, { $set: updateValues }, (error, success) => {
        if (error)
            return res.status(500).send({ message: "Internal server error, Actor doesn't updated" });
        if (success)
            return res.status(200).send({message:"Actor updated"});
        
        return res.status(404).send({message: "Actor not updated"});
        
    })
})

