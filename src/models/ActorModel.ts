import mongoose from 'mongoose';
let Model = mongoose.Schema;

let ActorModel = new Model({
    name: String,
    age: String,
    from: String
});

module.exports =  mongoose.model('Actor', ActorModel);