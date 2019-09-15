import mongoose from 'mongoose';
let Model = mongoose.Schema;

let DirectorModel = new Model({
    name: String,
    age: String,
    from: String
});

module.exports =  mongoose.model('Director', DirectorModel);