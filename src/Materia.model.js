const mongoose = require("mongoose");

const materiaSchema = new mongoose.Schema({
  nombre: {
    type: String
  },
  cargaHoraria: {
  	type: Number
  }
});

const Materia = mongoose.model("Materia", materiaSchema);

module.exports = Materia;
