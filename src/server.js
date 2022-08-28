import express from "express"
import dotenv from 'dotenv'
import mongoose from "mongoose"
import helmet from 'helmet'
import morgan from "morgan"
import initAPIRoute from './routes/web'
import cors from "cors";

var bodyParser = require('body-parser')

let app = express();
dotenv.config();
app.use(express.json());

// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });
initAPIRoute(app)
app.use(helmet());
app.use(morgan(("common")))
app.use(cors())
const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to mongoDB.");
    } catch (error) {
        throw error;
    }
};

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected!");
});

const port = process.env.NODE_URL || 6969
app.listen(port, () => {
    connect();
    console.log("backend server is runing on the port" + ' ' + port)
})




