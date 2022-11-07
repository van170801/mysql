import express  from "express";
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRouters from './route/web';
import connectDB from './config/connectDB';
require('dotenv').config();

let app = express();

//config app

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}))

viewEngine(app);
// chuyen code sang route/web
initWebRouters(app);

connectDB();

// port == undefind => port = 6969
let port = process.env.PORT || 6969;

app.listen(port, () => {
    console.log("backend nodejs is running on the port : "+port)
})