const mongoose = require("mongoose");

const carreraSchema = new mongoose.Schema({
  nombre: {
    type: String
  },
  tituloOtorgado: {
  	type: String
  }
});

const Carrera = mongoose.model("Carrera", carreraSchema);

module.exports = Carrera;

