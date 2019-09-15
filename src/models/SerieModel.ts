import mongoose from 'mongoose';
let Model = mongoose.Schema;
const ActorModel = require('./ActorModel').schema;
const DirectorModel = require('./DirectorModel').schema;
let SerieModel = new Model({
    title: String,
    director: DirectorModel,
    actor: ActorModel,
    seasons: String
});

module.exports =  mongoose.model('Serie', SerieModel);