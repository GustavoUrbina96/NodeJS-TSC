import { Router } from 'express';
const SerieModel = require('../models/SerieModel');
const DirectorModel = require('../models/DirectorModel');
const ActorModel = require('../models/ActorModel');
//Ruta de xpress
export const SerieRouter = Router();

//GET
SerieRouter.get('/getAllSeries', (req, res) => {
    SerieModel.find((error, success) => {
        if (error)
            return res.status(500).send({ message: 'Connection Fail' });
        if (!success)
            return res.status(404).send({ message: 'No records' });

        return res.status(200).send({ success });
    });
});


//Get by ID
SerieRouter.get('/getSerieByID/:id', (req, res) => {
    const idSerie = req.params.id;
    SerieModel.findById(idSerie, (error, success) => {
        if (error)
            return res.status(500).send({ message: "Internal Server error, serie didn't found" });
        if (!success)
            return res.status(404).send({ message: "Serie didn't found" });
        return res.status(200).send({ success });
    });
});

//POST
SerieRouter.post('/addNewSerie', (req, res) => {
    const newValues = req.body;

    if (!newValues.title || !newValues.seasons)
        return res.status(500).send({ message: "Favor de introducir el titulo y/o las temporadas" });
    if (!newValues.director.id)
        return res.status(500).send({ message: "Favor de introducir el ID del director" });
    if (!newValues.actor.id)
        return res.status(500).send({ message: "Favor de introducir el ID del actor" });

    let newSerie = new SerieModel();
    newSerie.Title = newValues.title;
    newSerie.Seasons = newValues.seasons;

    DirectorModel.findById(newValues.Director.id, (error, success) => {
        if (error)
            return res.status(500).send({ message: "Internal Server error, director didn't found" });
        if (success)
            newSerie.director = success;
        else
            newSerie.director = "Unknow director";
    });

    ActorModel.findById(newValues.Actor.id, (error, success) => {
        if (error)
            return res.status(500).send({ message: "Internal Server error, director didn't found" });
        if (success)
            newSerie.actor = success;
        else
            newSerie.actor = "Uknow actor";
    });


    newSerie.save((error, success) => {
        if (error)
            return res.status(500).send({ message: 'Internal Server error, serie doesn´t saved' });
        if (success)
            res.status(200).send({ Serie: success });
        else
            res.status(404).send({ message: 'Serie not saved!' });
    })

})
// //DELETE
SerieRouter.delete('/deleteSerie/:id', (req, res) => {
    const idSerie = req.params.id;
    SerieModel.findByIdAndRemove(idSerie, (error, success) => {
        if (error)
            return res.status(500).send({ message: "Internal Server error, director doesn´t Deleted" });
        if (success)
            return res.status(200).send({ message: "Serie Deleted!" });

        return res.status(400).send({ message: "Serie no deleted." });
    })
})

//PATCH
SerieRouter.patch('/updateSerie/:id', (req, res) => {
    const idSerie = req.params.id;
    const updateValues = req.body;
    if (!updateValues.title || !updateValues.seasons)
        return res.status(500).send({ message: "Favor de introducir el titulo y/o las temporadas" });
    if (!updateValues.director.id)
        return res.status(500).send({ message: "Favor de introducir el ID del director" });
    if (!updateValues.actor.id)
        return res.status(500).send({ message: "Favor de introducir el ID del actor" });


    DirectorModel.findById(updateValues.Director.id, (error, success) => {
        if (error)
            return res.status(500).send({ message: "Internal Server error, director didn't found" });
        if (success)
            updateValues.director = success;
        else
            updateValues.director = "Unknow director";
    });

    ActorModel.findById(updateValues.Actor.id, (error, success) => {
        if (error)
            return res.status(500).send({ message: "Internal Server error, director didn't found" });
        if (success)
            updateValues.actor = success;
        else
            updateValues.actor = "Uknow actor";
    });

    SerieModel.update({ _id: idSerie }, { $set: updateValues }, (error, success) => {
        if (error)
            return res.status(500).send({ message: "Internal server error, Serie doesn't updated" });
        if (success)
            return res.status(200).send({ updateValues });

        return res.status(404).send({ message: "Serie not updated" });

    })
})

