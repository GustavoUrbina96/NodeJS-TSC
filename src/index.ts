import  mongoose from 'mongoose'
import express from 'express'
import bodyParser from 'body-parser'
import {ActorRouter} from './controllers/ActorController';
import {DirectorRouter} from './controllers/DirectorController';
import { SerieRouter } from './controllers/SerieController';


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Series' ,{useNewUrlParser: true})
.then(()=>{
    console.log("Connection success");
}).catch(error=> console.log ("Connection Failed "+ error));

const connection = express();
connection.use(bodyParser.urlencoded({extended: false}));
connection.use(bodyParser.json());


connection.use('/Actor',ActorRouter);
connection.use('/Director',DirectorRouter);
connection.use('/Serie',SerieRouter);


