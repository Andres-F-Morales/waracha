const express = require("express");
const { initDb } = require("./db");
const routes = require("./routes");
const cors = require("cors");

const app = express();

const corsOptions = {
    origin: '*', 
    methods: 'OPTIONS,GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    exposedHeaders: ['Content-Range'] 
  };

console.log("CORS Options:", corsOptions);
  
app.use(cors(corsOptions));

app.use(express.json());

initDb().catch(err => {
    console.error("Error inicializando DB:", err);
    process.exit(1);
});

app.use("/api", routes);

module.exports = app;