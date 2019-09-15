import { Router } from 'express';
const DirectorModel = require('../models/DirectorModel');
//Ruta de xpress
export const DirectorRouter = Router();

//GET
DirectorRouter.get('/getAllDirectors', (req, res) => {
    DirectorModel.find((error, success) => {
        if (error)
            return res.status(500).send({ message: 'Connection Fail' })
        if (!success)
            return res.status(404).send({ message: 'No records' })

        return res.status(200).send({ success })
    })

})


//Get by ID
DirectorRouter.get('/getDirectorByID/:id', (req, res) => {
    const idDirector = req.params.id;
    DirectorModel.findById(idDirector, (error, success) => {
        if (error)
            return res.status(500).send({ message: "Internal Server error, director didn't found" });
        if (!success)
            return res.status(404).send({ message: "director didn't found" });
        return res.status(200).send({ success });
    })
})

//POST
DirectorRouter.post('/addNewDirector', (req, res) => {
    const newValues = req.body;
    if (!newValues.name || !newValues.age || !newValues.from)
        return res.status(500).send({ message: "Favor de introducir todos los datos" });

    let newDirector = new DirectorModel();

    newDirector.name = newValues.name;
    newDirector.age = newValues.age;
    newDirector.from = newValues.from;
    newDirector.save((error, success) => {
        if (error)
            return res.status(500).send({ message: 'Internal Server error, director doesn´t saved' });
        if (success)
            return res.status(200).send({ success });

        return res.status(404).send({ message: 'director not saved!' });
    })

})
//DELETE
DirectorRouter.delete('/deleteDirector/:id', (req, res) => {
    const idDirector = req.params.id;
    DirectorModel.findByIdAndRemove(idDirector, (error, success) => {

        if (error)
            return res.status(500).send({ message: "Internal Server error, director doesn´t Deleted" });
        if (success)
            return res.status(200).send({ message: "director Deleted!" });

        return res.status(400).send({ message: "director no deleted." });
    })
})

//PATCH
DirectorRouter.patch('/updateDirector/:id', (req, res) => {
    const idDirector = req.params.id;
    const updateValues = req.body;
    if (!updateValues.name || !updateValues.age || !updateValues.from)
        return res.status(500).send({ message: "Favor de introducir todos los datos" });

    DirectorModel.update({ _id: idDirector }, { $set: updateValues }, (error, success) => {
        if (error)
            return res.status(500).send({ message: "Internal server error, director doesn't updated" });
        if (success)
            return res.status(200).send({ message: "director updated" });

        return res.status(404).send({ message: "director not updated" });

    })
})

