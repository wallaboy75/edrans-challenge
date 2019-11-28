const express = require("express");
const app = express();

const carreraRoutes = require("./src/routes/carreras")(app);
const materiaRoutes = require("./src/routes/materias")(app);
const alumnoRoutes  = require("./src/routes/alumnos")(app);
const cursadaRoutes = require("./src/routes/cursadas")(app);

const PORT = 8080;

const connectDb = require("./src/connection");

app.use(express.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log("MongoDb connected");
  });
});
