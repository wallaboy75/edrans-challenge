const mongoose = require("mongoose");

const alumnoSchema = new mongoose.Schema({
  nombre: {
    type: String
  },
  fechaNacimiento: {
  	type: String
  },
  domicilio : {
  	type: String
  }
});

const Alumno = mongoose.model("Alumno", alumnoSchema);

module.exports = Alumno;
