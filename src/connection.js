const mongoose = require("mongoose");

/*const Alumno = require("./Alumno.model");
const Materia = require("./Materia.model");
const Carrera = require("./Carrera.model");
*/
const connection = "mongodb://mongo:27017/mongo-test";

const connectDb = () => {
  return mongoose.connect(connection);
};

module.exports = connectDb;
