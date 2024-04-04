import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';

import router from '../src/router';
import mongoose from 'mongoose';

const swaggerjsdoc=require('swagger-jsdoc');

const swaggerui=require("swagger-ui-express");

const app = express();

app.use(cors({
  origin: 'https://mybrand-backend-production-861a.up.railway.app/',
  credentials: true,
}));

const options = {
  definition: {
    openapi: "3.0.0",
    info:{
      title:"MyBrand api doc",
      version:"0.1",
      description:"This is swagger documentation for myBrand project."
    },
    servers: [{
      url: "https://mybrand-backend-production-861a.up.railway.app/"
    }]
  },
  apis: ["./src/router/*.ts"]
};

const specs = swaggerjsdoc(options);

app.use(
  "/api-docs",
  swaggerui.serve,
  swaggerui.setup(specs)
);

app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

const server = http.createServer(app);

server.listen(8080, () => {
  console.log('Server running on http://localhost:8080/');
});

const MONGO_URL = 'mongodb+srv://irakozepirlo:u6jgO8F5zGlc0vRw@cluster0.u7uvxps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'; // DB URI

mongoose.Promise = Promise;
mongoose.connect(MONGO_URL);
mongoose.connection.on('error', (error: Error) => console.log(error));

app.use('/', router());