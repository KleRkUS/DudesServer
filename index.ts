require("dotenv").config();
//import Dudes from "./core/Dudes.d/dudes";

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();
const port = process.env.PORT || 8000;
const apiRoutes = require("./api/routes");

const mailer = require("./api/utils/Mail");

const corsOptions = {
  origin: 'https://localhost:5000',
  credentials: true
}

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors(corsOptions));

mongoose.connect('mongodb://localhost/shopping-list', {useNewUrlParser: true, useUnifiedTopology: true}).then((r:any):void => console.log(`Mongoose connection: ${r}`)) ;

app.get('/', (req:any, res:any) => res.send('Express + TypeScript Server'));

app.use('/api', apiRoutes);

app.listen(port, () => {
  console.log(`Server is running at https://localhost:${port}`);
});
