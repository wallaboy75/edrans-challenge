const Mongoose    = require("mongoose");
const Express     = require("express");
const BodyParser  = require("body-parser");

const app = Express();
app.use(BodyParser.json());

Mongoose.Promise = Promise;
const carreraRoutes = require("./src/routes/carreras")(app);
const materiaRoutes = require("./src/routes/materias")(app);
const alumnoRoutes  = require("./src/routes/alumnos")(app);

const PORT = 8080;

Mongoose.connect("mongodb://mongo:27017/mongo-test", { useNewUrlParser: true }, function(error, database) {
    if(error) {
        return console.log("Could not establish a connection to MongoDB");
    }
    const server = app.listen(PORT, function() {
        console.log(`Connected on port ${PORT}...`);
    });
});