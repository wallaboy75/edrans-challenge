const Mongoose  = require("mongoose");
const Schema    = Mongoose.Schema;
const ObjectId  = Mongoose.SchemaTypes.ObjectId;

const CarreraSchema = new Mongoose.Schema({
    nombre: String,
    tituloOtorgado: String,
    materias: [
        {
            type:   ObjectId,
            ref:    MateriaSchema
        }
    ],
    alumnos: [
        {
            type:   ObjectId,
            ref:    AlumnoSchema
        }
    ]
});

const MateriaSchema = new Mongoose.Schema({
    nombre: String,
    cargaHoraria: Number,
    alumnos: [
        {
            type:   ObjectId,
            ref:    AlumnoSchema
        }
    ],
    carreras: [
        {
            type:   ObjectId,
            ref:    CarreraSchema
        }
    ]
});
 
const AlumnoSchema = new Mongoose.Schema({
    nombre: String,
    fechaNacimiento: String,
    domicilio: String,
    carrera: {
        type:   ObjectId,
        ref:    CarreraSchema
    },
    materias: [
        {
            type:   ObjectId,
            ref:    MateriaSchema
        }
    ]
});
 
module.exports.CarreraModel = Mongoose.model("Carrera", CarreraSchema);
module.exports.MateriaModel = Mongoose.model("Materia", MateriaSchema);
module.exports.AlumnoModel  = Mongoose.model("Alumno", AlumnoSchema);